import { generateText } from 'ai'
import { createGroq } from '@ai-sdk/groq'

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })
import type { Problem, Submission, Evaluation, EvaluationScore } from '@/types'

const KNOWN_CONCEPT_IDS = [
  'icm', 'gto', 'pot_odds', 'push_fold', 'bubble_factor',
  'range', 'equity', 'fold_equity', 'spr', 'three_bet',
  'continuation_bet', 'implied_odds',
] as const

interface ChecklistResult {
  criteriaId: string
  checkedItems: boolean[]
}

function buildEvaluationPrompt(problem: Problem, submission: Submission): string {
  const actionMatch = submission.action === problem.correctAction

  const checklistText = problem.rubric.criteria
    .map(
      (c) =>
        `## [criteriaId: "${c.id}"] ${c.nameKo} (최대 ${c.maxScore}점)\n` +
        c.checklistItems.map((item, i) => `${i + 1}. ${item}`).join('\n')
    )
    .join('\n\n')

  const criteriaIds = problem.rubric.criteria.map((c) => c.id)

  return `당신은 20년 경력의 포커 토너먼트 코치입니다. 제자의 답변을 평가하고 코치답게 피드백을 주세요.

말투 규칙 (반드시 준수):
- 항상 따뜻하지만 단호한 스승 어조 유지: "~하게나", "~이 중요하네", "~을 기억하게나" 등
- 잘한 점은 구체적으로 칭찬, 부족한 점은 핵심만 짚어 개선 방향 제시
- 절대 사무적이거나 기계적인 말투 사용 금지
- 문장 끝은 반드시 "~하네", "~하게나", "~이야", "~하길 바라네" 중 하나로 통일

평가 원칙:
- 포커에서 하나의 정답만 존재하지 않는다. 학생이 선택한 액션이 모범 답안과 달라도 논리적으로 타당하다면 높은 점수를 줄 수 있다.
- 액션 체크리스트 항목은 "이 액션이 이 상황에서 합리적인가"를 기준으로 판단하라. 단순히 모범 답안과 일치하지 않는다는 이유만으로 false를 주지 마라.
- 근거가 없는 경우(빠른 채점)에는 액션의 합리성만 평가하고 근거 관련 항목은 false로 처리하라.

## 문제
${problem.title}

## 상황
${problem.description}

## 모범 답안 액션 (참고용)
${problem.correctAction} ${actionMatch ? '(학생과 동일)' : '(학생과 다름 — 단, 학생 액션이 타당할 수 있음)'}

## 학생 답변
- 선택한 액션: ${submission.action}
- 근거: ${submission.reasoning || '(근거 없음 — 액션 선택만 평가)'}

## 채점 체크리스트
각 기준별로 아래 항목들이 충족되는지 true/false로 판단하세요.

${checklistText}

## 응답 형식 (JSON만 출력하세요)
criteriaId는 반드시 위에 표시된 값(${criteriaIds.join(', ')})을 그대로 사용하세요.
conceptIds는 아래 목록에서만 선택하세요 (0-3개): ${KNOWN_CONCEPT_IDS.join(', ')}
{
  "checklist": [
${criteriaIds.map((id) => `    {"criteriaId": "${id}", "checkedItems": [true/false, ...]}`).join(',\n')}
  ],
  "overallFeedback": "포커 코치 말투로 2-3문장 총평 (말투 규칙 준수)",
  "conceptIds": ["icm", "push_fold"]
}

중요: JSON 외에 다른 텍스트를 출력하지 마세요.`
}

function calculateScores(
  problem: Problem,
  checklist: ChecklistResult[]
): EvaluationScore[] {
  return problem.rubric.criteria.map((criteria) => {
    const result = checklist.find((c) => c.criteriaId === criteria.id)
    if (!result) {
      return { criteriaId: criteria.id, score: 0, maxScore: criteria.maxScore, feedback: '' }
    }

    const checkedCount = result.checkedItems.filter(Boolean).length
    const totalItems = criteria.checklistItems.length
    const score = Math.round((checkedCount / totalItems) * criteria.maxScore)

    const checkedLabels = criteria.checklistItems
      .filter((_, i) => result.checkedItems[i])
      .map((item) => `✓ ${item}`)
    const uncheckedLabels = criteria.checklistItems
      .filter((_, i) => !result.checkedItems[i])
      .map((item) => `✗ ${item}`)

    const feedback = [
      checkedLabels.length > 0 ? `잘 짚었네: ${checkedLabels.join(', ')}` : '',
      uncheckedLabels.length > 0 ? `더 생각해보게: ${uncheckedLabels.join(', ')}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    return { criteriaId: criteria.id, score, maxScore: criteria.maxScore, feedback }
  })
}

export type EvalResult = Omit<Evaluation, 'id' | 'submissionId' | 'createdAt' | 'conceptsToLearn' | 'conceptExplanations'> & {
  conceptIds: string[]
}

export async function evaluateSubmission(
  problem: Problem,
  submission: Submission
): Promise<EvalResult> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY not configured')
  }

  const prompt = buildEvaluationPrompt(problem, submission)

  const { text } = await generateText({
    model: groq('llama-3.1-8b-instant'),
    prompt,
    maxOutputTokens: 1024,
  })

  let parsed: {
    checklist: ChecklistResult[]
    overallFeedback: string
    conceptIds: string[]
  }

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error(`no JSON found in: ${text.slice(0, 200)}`)
    parsed = JSON.parse(jsonMatch[0])
  } catch (e) {
    throw new Error(`AI returned invalid JSON: ${e instanceof Error ? e.message : String(e)}`)
  }

  const scores = calculateScores(problem, parsed.checklist)
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0)
  const maxScore = scores.reduce((sum, s) => sum + s.maxScore, 0)

  const rawConceptIds: string[] = Array.isArray(parsed.conceptIds) ? parsed.conceptIds : []
  const validConceptIds = rawConceptIds.filter((id) =>
    (KNOWN_CONCEPT_IDS as readonly string[]).includes(id)
  )

  return {
    scores,
    totalScore,
    maxScore,
    overallFeedback: parsed.overallFeedback,
    conceptIds: validConceptIds,
  }
}

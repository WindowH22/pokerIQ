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

  return `당신은 포커 교육 플랫폼의 채점 AI입니다. 아래 규칙에 따라 학생의 답변을 평가하세요.

## 문제
${problem.title}

## 상황
${problem.description}

## 정답 액션
${problem.correctAction}

## 학생 답변
- 선택한 액션: ${submission.action} ${actionMatch ? '(정답)' : '(오답)'}
- 근거: ${submission.reasoning}

## 채점 체크리스트
각 기준별로 아래 항목들이 충족되는지 true/false로만 판단하세요.

${checklistText}

## 응답 형식 (JSON만 출력하세요)
criteriaId는 반드시 위에 표시된 값(${criteriaIds.join(', ')})을 그대로 사용하세요.
conceptIds는 아래 목록에서만 선택하세요 (0-3개): ${KNOWN_CONCEPT_IDS.join(', ')}
{
  "checklist": [
${criteriaIds.map((id) => `    {"criteriaId": "${id}", "checkedItems": [true/false, ...]}`).join(',\n')}
  ],
  "overallFeedback": "overall feedback in Korean (2-3 sentences)",
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
      checkedLabels.length > 0 ? `잘 했어요: ${checkedLabels.join(', ')}` : '',
      uncheckedLabels.length > 0 ? `보완 필요: ${uncheckedLabels.join(', ')}` : '',
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

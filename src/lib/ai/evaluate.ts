import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import type { Problem, Submission, Evaluation, EvaluationScore } from '@/types'

interface ChecklistResult {
  criteriaId: string
  checkedItems: boolean[]
}

function buildEvaluationPrompt(problem: Problem, submission: Submission): string {
  const actionMatch = submission.action === problem.correctAction

  const checklistText = problem.rubric.criteria
    .map(
      (c) =>
        `## ${c.nameKo} (최대 ${c.maxScore}점)\n` +
        c.checklistItems.map((item, i) => `${i + 1}. ${item}`).join('\n')
    )
    .join('\n\n')

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
{
  "checklist": [
    {
      "criteriaId": "string",
      "checkedItems": [true/false, ...]
    }
  ],
  "overallFeedback": "전반적인 피드백 (한국어, 2-3문장)",
  "conceptsToLearn": ["개념1", "개념2"],
  "conceptExplanations": {
    "개념1": "간단한 설명 (1-2문장)"
  }
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

export async function evaluateSubmission(
  problem: Problem,
  submission: Submission
): Promise<Omit<Evaluation, 'id' | 'submissionId' | 'createdAt'>> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not configured')
  }

  const prompt = buildEvaluationPrompt(problem, submission)

  const { text } = await generateText({
    model: anthropic('claude-haiku-4-5'),
    prompt,
    maxOutputTokens: 1024,
  })

  let parsed: {
    checklist: ChecklistResult[]
    overallFeedback: string
    conceptsToLearn: string[]
    conceptExplanations: Record<string, string>
  }

  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error('AI returned invalid JSON')
  }

  const scores = calculateScores(problem, parsed.checklist)
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0)
  const maxScore = scores.reduce((sum, s) => sum + s.maxScore, 0)

  return {
    scores,
    totalScore,
    maxScore,
    overallFeedback: parsed.overallFeedback,
    conceptsToLearn: parsed.conceptsToLearn ?? [],
    conceptExplanations: parsed.conceptExplanations ?? {},
  }
}

export const maxDuration = 30

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PROBLEMS } from '@/lib/data/problems'
import { CONCEPTS } from '@/lib/data/concepts'
import { evaluateSubmission } from '@/lib/ai/evaluate'
import type { ApiResponse, Problem, Submission } from '@/types'

const submitSchema = z.object({
  problemId: z.string().min(1),
  action: z.enum(['FOLD', 'CALL', 'RAISE', 'CHECK', 'ALL_IN', 'LIMP']),
  reasoning: z.string().min(10, '근거는 최소 10자 이상 입력해주세요.').max(2000),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: '잘못된 요청 형식입니다.' },
      { status: 400 }
    )
  }

  const parsed = submitSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: parsed.error.issues[0].message },
      { status: 400 }
    )
  }

  const { problemId, action, reasoning } = parsed.data

  const problem = PROBLEMS.find((p) => p.id === problemId && p.publishedAt !== null) as Problem | undefined

  if (!problem) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: '문제를 찾을 수 없습니다.' },
      { status: 404 }
    )
  }

  try {
    const submissionId = crypto.randomUUID()
    const evaluationId = crypto.randomUUID()

    const partialSubmission: Submission = {
      id: submissionId,
      problemId,
      userId: '',
      action: action as Submission['action'],
      reasoning,
      submittedAt: new Date().toISOString(),
    }

    const evalResult = await evaluateSubmission(problem, partialSubmission)

    const relatedConcepts = evalResult.conceptIds.length > 0
      ? CONCEPTS.filter((c) => evalResult.conceptIds.includes(c.id))
      : []

    const conceptsToLearn = relatedConcepts.map((c) => c.termKo)
    const conceptExplanations: Record<string, string> = {}
    for (const c of relatedConcepts) {
      conceptExplanations[c.termKo] = c.shortDescription
    }

    const data: Submission = {
      ...partialSubmission,
      evaluation: {
        id: evaluationId,
        submissionId,
        scores: evalResult.scores,
        totalScore: evalResult.totalScore,
        maxScore: evalResult.maxScore,
        overallFeedback: evalResult.overallFeedback,
        conceptsToLearn,
        conceptExplanations,
        createdAt: new Date().toISOString(),
      },
    }

    return NextResponse.json<ApiResponse<Submission>>({ success: true, data }, { status: 201 })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Submission error:', error)
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: process.env.NODE_ENV === 'development' ? msg : '제출 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

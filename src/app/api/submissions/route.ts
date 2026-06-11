import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db, problems, submissions, evaluations } from '@/lib/db'
import { eq, and } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { evaluateSubmission } from '@/lib/ai/evaluate'
import type { ApiResponse, Problem, Submission } from '@/types'

const submitSchema = z.object({
  problemId: z.string().min(1),
  action: z.enum(['FOLD', 'CALL', 'RAISE', 'CHECK', 'ALL_IN', 'LIMP']),
  reasoning: z.string().min(10, '근거는 최소 10자 이상 입력해주세요.').max(2000),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: '로그인이 필요합니다.' },
      { status: 401 }
    )
  }

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

  try {
    const [problemRow] = await db
      .select()
      .from(problems)
      .where(and(eq(problems.id, problemId), eq(problems.isPublished, true)))
      .limit(1)

    if (!problemRow) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: '문제를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const problem: Problem = {
      ...problemRow,
      gameContext: problemRow.gameContext as Problem['gameContext'],
      rubric: problemRow.rubric as Problem['rubric'],
      publishedAt: problemRow.publishedAt?.toISOString() ?? null,
      createdAt: problemRow.createdAt.toISOString(),
    } as unknown as Problem

    const submissionId = crypto.randomUUID()
    await db.insert(submissions).values({
      id: submissionId,
      problemId,
      userId: session.user.id,
      action,
      reasoning,
    })

    const partialSubmission: Submission = {
      id: submissionId,
      problemId,
      userId: session.user.id,
      action: action as Submission['action'],
      reasoning,
      submittedAt: new Date().toISOString(),
    }

    const evalResult = await evaluateSubmission(problem, partialSubmission)

    const evaluationId = crypto.randomUUID()
    await db.insert(evaluations).values({
      id: evaluationId,
      submissionId,
      scores: evalResult.scores,
      totalScore: evalResult.totalScore,
      maxScore: evalResult.maxScore,
      overallFeedback: evalResult.overallFeedback,
      conceptsToLearn: evalResult.conceptsToLearn,
      conceptExplanations: evalResult.conceptExplanations,
    })

    const data: Submission = {
      ...partialSubmission,
      evaluation: {
        id: evaluationId,
        submissionId,
        ...evalResult,
        createdAt: new Date().toISOString(),
      },
    }

    return NextResponse.json<ApiResponse<Submission>>({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: '제출 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { db, problems } from '@/lib/db'
import { eq, and } from 'drizzle-orm'
import type { ApiResponse, Problem } from '@/types'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const [row] = await db
      .select()
      .from(problems)
      .where(and(eq(problems.slug, slug), eq(problems.isPublished, true)))
      .limit(1)

    if (!row) {
      return NextResponse.json<ApiResponse<never>>(
        { success: false, error: '문제를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const data: Problem = {
      ...row,
      gameContext: row.gameContext as Problem['gameContext'],
      rubric: row.rubric as Problem['rubric'],
      publishedAt: row.publishedAt?.toISOString() ?? null,
      createdAt: row.createdAt.toISOString(),
    } as unknown as Problem

    return NextResponse.json<ApiResponse<Problem>>({ success: true, data })
  } catch (error) {
    console.error('Failed to fetch problem:', error)
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: '문제를 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

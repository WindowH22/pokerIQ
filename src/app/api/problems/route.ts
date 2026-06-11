import { NextResponse } from 'next/server'
import { db, problems } from '@/lib/db'
import { eq } from 'drizzle-orm'
import type { ApiResponse, Problem } from '@/types'

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(problems)
      .where(eq(problems.isPublished, true))
      .orderBy(problems.createdAt)

    const data = rows.map((row) => ({
      ...row,
      gameContext: row.gameContext as Problem['gameContext'],
      rubric: row.rubric as Problem['rubric'],
      publishedAt: row.publishedAt?.toISOString() ?? null,
      createdAt: row.createdAt.toISOString(),
    } as unknown as Problem))

    return NextResponse.json<ApiResponse<Problem[]>>({ success: true, data })
  } catch (error) {
    console.error('Failed to fetch problems:', error)
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: '문제 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

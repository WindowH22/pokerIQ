import { NextResponse } from 'next/server'
import { PROBLEMS } from '@/lib/data/problems'
import type { ApiResponse, Problem } from '@/types'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const data = PROBLEMS.find((p) => p.slug === slug && p.publishedAt !== null)

  if (!data) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: '문제를 찾을 수 없습니다.' },
      { status: 404 }
    )
  }

  return NextResponse.json<ApiResponse<Problem>>({ success: true, data })
}

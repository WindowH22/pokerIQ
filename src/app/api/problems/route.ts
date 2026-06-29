import { NextResponse } from 'next/server'
import { PROBLEMS } from '@/lib/data/problems'
import type { ApiResponse, Problem } from '@/types'

export async function GET() {
  const data = PROBLEMS.filter((p) => p.publishedAt !== null) as Problem[]
  return NextResponse.json<ApiResponse<Problem[]>>({ success: true, data })
}

import { ImageResponse } from 'next/og'
import { PROBLEMS } from '@/lib/data/problems'
import type { Difficulty } from '@/types'

export const alt = 'Poker IQ 문제 미리보기'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  BEGINNER: '입문',
  INTERMEDIATE: '중급',
  ADVANCED: '고급',
  EXPERT: '전문가',
}

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  BEGINNER: '#6fbf8b',
  INTERMEDIATE: '#6f9cd9',
  ADVANCED: '#d9b56a',
  EXPERT: '#d9756f',
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const problem = PROBLEMS.find((p) => p.slug === slug && p.publishedAt !== null)
  const title = problem?.title ?? 'Poker IQ'
  const difficulty = problem?.difficulty ?? 'BEGINNER'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#12131a',
          backgroundImage:
            'radial-gradient(ellipse at 50% 0%, rgba(217,181,106,0.16) 0%, rgba(18,19,26,0) 60%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#d9b56a', display: 'flex' }} />
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4, color: '#d9b56a', textTransform: 'uppercase' }}>
            Poker IQ
          </span>
        </div>

        <span
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#f2efe6',
            lineHeight: 1.25,
            maxWidth: 980,
          }}
        >
          {title}
        </span>

        <div style={{ display: 'flex', gap: 12 }}>
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: 999,
              border: `1px solid ${DIFFICULTY_COLORS[difficulty]}`,
              color: DIFFICULTY_COLORS[difficulty],
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            {DIFFICULTY_LABELS[difficulty]}
          </div>
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: 999,
              border: '1px solid #3a3d47',
              color: '#9a9dab',
              fontSize: 26,
            }}
          >
            AI가 채점하는 홀덤 문제
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

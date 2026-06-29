import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { PlayingCard, MysteryCard } from '@/components/features/problem/CardDisplay'
import type { Card } from '@/types'

const DEAD_MANS_HAND: Card[] = [
  { rank: 'A', suit: 'spade' },
  { rank: 'A', suit: 'club' },
  { rank: '8', suit: 'heart' },
  { rank: '8', suit: 'diamond' },
]

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* Dead man's hand */}
      <div className="flex gap-2 mb-8 select-none" aria-hidden="true">
        {DEAD_MANS_HAND.map((card, i) => (
          <div key={i} style={{ transform: `rotate(${(i - 2) * 4}deg)` }}>
            <PlayingCard card={card} size="md" />
          </div>
        ))}
        <div style={{ transform: 'rotate(8deg)' }}>
          <MysteryCard size="md" />
        </div>
      </div>

      <h1 className="text-8xl font-bold text-[var(--color-gold)] tabular-nums mb-4">404</h1>
      <p className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
        이 페이지는 폴드됐습니다
      </p>
      <p className="text-[var(--color-text-muted)] mb-10 max-w-sm">
        찾으시는 페이지가 존재하지 않거나 이동됐습니다.
        데드맨스 핸드처럼 — 전설이지만 여기엔 없습니다.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/">
          <Button size="lg">홈으로 돌아가기</Button>
        </Link>
        <Link href="/problems">
          <Button size="lg" variant="secondary">문제 풀기</Button>
        </Link>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '리더보드 | Poker IQ',
}

const PLACEHOLDER_RANKS = [1, 2, 3, 4, 5]

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">
          리더 <span className="text-gold">보드</span>
        </h1>
        <p className="text-[var(--color-text-muted)]">
          최고의 포커 전략가들이 여기에 이름을 올립니다.
        </p>
      </div>

      {/* Coming soon overlay card */}
      <div className="relative rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-raised)] card-shadow overflow-hidden">
        {/* Ghost rows */}
        <div className="divide-y divide-[var(--color-surface-border)] opacity-30 blur-[2px] pointer-events-none select-none" aria-hidden="true">
          {PLACEHOLDER_RANKS.map((rank) => (
            <div key={rank} className="flex items-center gap-4 px-6 py-4">
              <span className="w-8 text-center text-lg font-bold text-[var(--color-text-muted)]">
                {rank}
              </span>
              <div className="flex-1 flex items-center gap-3">
                <div
                  className="h-8 w-8 rounded-full bg-[var(--color-surface-border)]"
                  style={{ width: 32, height: 32 }}
                />
                <div
                  className="h-3 rounded bg-[var(--color-surface-border)]"
                  style={{ width: `${120 - rank * 8}px` }}
                />
              </div>
              <div className="text-right">
                <div
                  className="h-3 rounded bg-[var(--color-surface-border)] mb-1"
                  style={{ width: 48 }}
                />
                <div
                  className="h-2 rounded bg-[var(--color-surface-border)]"
                  style={{ width: 32 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Centered coming-soon callout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--color-surface-raised)]/60 backdrop-blur-[1px]">
          <span className="text-5xl" aria-hidden="true">🏆</span>
          <p className="text-xl font-bold text-[var(--color-text-primary)]">준비 중입니다</p>
          <p className="text-sm text-[var(--color-text-muted)] text-center max-w-xs">
            문제를 풀고 점수를 쌓으면<br />여기서 순위를 확인할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  )
}

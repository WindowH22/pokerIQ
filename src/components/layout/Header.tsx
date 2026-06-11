import Link from 'next/link'
import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/Button'

export async function Header() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-surface-border)] bg-[var(--color-surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl" aria-hidden="true">♠</span>
          <span className="font-bold text-lg tracking-tight text-gold group-hover:brightness-125 transition-all">
            Poker IQ
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          <Link
            href="/problems"
            className="px-3 py-1.5 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-raised)] transition-all"
          >
            문제 풀기
          </Link>
          <Link
            href="/concepts"
            className="px-3 py-1.5 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-raised)] transition-all"
          >
            개념 사전
          </Link>
          <Link
            href="/leaderboard"
            className="px-3 py-1.5 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-raised)] transition-all"
          >
            리더보드
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link href="/profile">
                <span className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                  {session.user.name ?? session.user.email}
                </span>
              </Link>
              <form action="/api/auth/signout" method="POST">
                <Button variant="ghost" size="sm" type="submit">로그아웃</Button>
              </form>
            </div>
          ) : (
            <form action="/api/auth/signin" method="GET">
              <Button size="sm">로그인</Button>
            </form>
          )}
        </div>
      </div>
    </header>
  )
}

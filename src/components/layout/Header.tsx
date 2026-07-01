import Link from 'next/link'
import { MobileNav } from './MobileNav'

const NAV_LINKS = [
  { href: '/learn/rules', label: '홀덤 규칙' },
  { href: '/problems', label: '문제 풀기' },
  { href: '/concepts', label: '개념 사전' },
]

export function Header() {
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
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-raised)] transition-all"
            >
              {label}
            </Link>
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  )
}

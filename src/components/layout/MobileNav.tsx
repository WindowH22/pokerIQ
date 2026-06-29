'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/problems', label: '문제 풀기' },
  { href: '/concepts', label: '개념 사전' },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // close on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={isOpen}
        className="flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-[var(--color-surface-raised)] transition-colors"
      >
        <span
          className={[
            'block h-0.5 w-5 bg-[var(--color-text-muted)] rounded-full transition-all duration-200',
            isOpen ? 'translate-y-2 rotate-45' : '',
          ].join(' ')}
        />
        <span
          className={[
            'block h-0.5 w-5 bg-[var(--color-text-muted)] rounded-full transition-all duration-200',
            isOpen ? 'opacity-0' : '',
          ].join(' ')}
        />
        <span
          className={[
            'block h-0.5 w-5 bg-[var(--color-text-muted)] rounded-full transition-all duration-200',
            isOpen ? '-translate-y-2 -rotate-45' : '',
          ].join(' ')}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-14 z-40 border-b border-[var(--color-surface-border)] bg-[var(--color-surface)]/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                'px-3 py-2.5 rounded-lg text-sm transition-colors',
                pathname.startsWith(href)
                  ? 'bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] font-medium'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-raised)]',
              ].join(' ')}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

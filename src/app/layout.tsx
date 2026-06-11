import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Poker IQ — 홀덤 실력을 테스트하세요',
  description:
    'ICM, GTO, Push/Fold 등 토너먼트 포커의 핵심 개념을 실제 상황 문제로 학습하고 AI 피드백을 받으세요.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--color-surface-border)] py-6 mt-auto">
          <div className="mx-auto max-w-6xl px-4 text-center text-sm text-[var(--color-text-muted)]">
            <p>포커 공부는 책임감 있게 — Poker IQ © 2025</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

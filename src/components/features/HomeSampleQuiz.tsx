'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

const QUIZ = {
  slug: 'sb-12bb-k8s-vs-bb',
  scenario: 'UTG~BTN 전원 폴드. 나는 SB에서 K♠8♠를 들고 있다.',
  detail: '스택 12BB, 상대 BB는 30BB. 어떻게 할까?',
  actions: [
    { key: 'FOLD', label: '폴드' },
    { key: 'LIMP', label: '림프 (2BB 콜)' },
    { key: 'ALL_IN', label: '올인' },
  ],
  correct: 'ALL_IN',
  feedback: {
    FOLD: '오답 — K8s는 SB 12BB에서 Nash 균형 기준 푸시 레인지에 포함됩니다. 폴드하면 EV를 버리는 겁니다.',
    LIMP: '아쉬움 — 림프는 폴드 에퀴티를 포기합니다. 숏스택에서는 레이즈 또는 폴드가 원칙입니다.',
    ALL_IN: '정답 — K8s(수이티드)는 SB 12BB 올인 레인지에 포함됩니다. BB 콜링 레인지 대비 ~52% 에퀴티 + 폴드 에퀴티 = +EV.',
  },
}

export function HomeSampleQuiz() {
  const [selected, setSelected] = useState<string | null>(null)

  const isCorrect = selected === QUIZ.correct

  return (
    <Card className="overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-[var(--color-surface-border)]">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="green" size="sm">입문</Badge>
          <Badge variant="muted" size="sm">Push/Fold</Badge>
          <span className="ml-auto text-xs text-[var(--color-text-muted)]">체험 문제</span>
        </div>
        <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">{QUIZ.scenario}</p>
        <p className="text-xs text-[var(--color-text-muted)]">{QUIZ.detail}</p>
      </div>

      <Card.Body className="space-y-4">
        {!selected ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              액션을 선택하세요
            </p>
            <div className="flex flex-wrap gap-2">
              {QUIZ.actions.map((a) => (
                <button
                  key={a.key}
                  onClick={() => setSelected(a.key)}
                  className="px-4 py-2 rounded-lg border border-[var(--color-surface-border)] bg-[var(--color-surface-raised)] text-sm font-medium text-[var(--color-text-primary)] hover:border-[var(--color-gold-dim)] hover:text-[var(--color-gold)] transition-all"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className={[
              'rounded-xl px-4 py-3 text-sm leading-relaxed border',
              isCorrect
                ? 'bg-[oklch(65%_0.18_145/0.08)] border-[oklch(65%_0.18_145/0.3)] text-[oklch(70%_0.18_145)]'
                : 'bg-[oklch(55%_0.22_25/0.08)] border-[oklch(55%_0.22_25/0.3)] text-[var(--color-text-primary)]',
            ].join(' ')}>
              <span className="font-bold mr-2">{isCorrect ? '✓' : '✗'}</span>
              {QUIZ.feedback[selected as keyof typeof QUIZ.feedback]}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelected(null)}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                다시 선택
              </button>
              <Link href={`/problems/${QUIZ.slug}`} className="ml-auto">
                <Button size="sm">근거 쓰고 AI 채점 받기 →</Button>
              </Link>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  )
}

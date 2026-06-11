import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

const FEATURES = [
  {
    icon: '🎯',
    title: '실전 상황 문제',
    description: '토너먼트 실제 상황을 기반으로 설계된 문제들. ICM 버블, 파이널 테이블, Push/Fold 등 핵심 장면을 다룹니다.',
  },
  {
    icon: '🤖',
    title: 'AI 채점 및 피드백',
    description: 'Claude AI가 액션과 논거를 함께 평가합니다. 단순히 맞고 틀리는 게 아닌 사고 과정을 분석합니다.',
  },
  {
    icon: '📚',
    title: '개념 사전',
    description: 'ICM, GTO, 버블 팩터, Push/Fold 내쉬 균형 등 학문적으로 검증된 포커 개념을 쉽게 학습하세요.',
  },
  {
    icon: '🏆',
    title: '리더보드',
    description: '다른 플레이어들과 점수를 비교하고 어떤 개념이 부족한지 파악하세요.',
  },
]

const DIFFICULTY_COLORS = {
  '입문': 'green' as const,
  '중급': 'blue' as const,
  '고급': 'gold' as const,
}

const SAMPLE_PROBLEMS = [
  {
    title: '파이널 테이블 5인, 2등 vs 칩리더',
    difficulty: '고급',
    category: 'ICM',
    desc: '2등 스택으로 숏스택 올인 + 칩리더 콜 상황에서 KQo 스퀴즈를 해야 할까?',
  },
  {
    title: 'BTN 숏스택 10BB Push/Fold',
    difficulty: '입문',
    category: 'Push/Fold',
    desc: '10BB BTN에서 A7o. 버블도 아닌 상황에서 올인 또는 폴드?',
  },
  {
    title: 'BB 방어: BTN 오픈에 T9s 3-벳?',
    difficulty: '중급',
    category: 'Range',
    desc: 'BTN 2.5BB 오픈에 BB에서 T9s를 들고 있다. 3-벳, 콜, 폴드 중 최적은?',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="felt-bg absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center">
          <Badge variant="gold" className="mb-6 text-xs uppercase tracking-widest">
            토너먼트 홀덤 교육 플랫폼
          </Badge>
          <h1
            id="hero-heading"
            className="text-hero font-bold tracking-tight text-[var(--color-text-primary)] mb-6"
          >
            포커 실력을{' '}
            <span className="text-gold">숫자로</span>{' '}
            증명하세요
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[var(--color-text-muted)] mb-10">
            실전 토너먼트 상황을 분석하고 AI 피드백을 받으세요.
            ICM, GTO, Push/Fold 등 핵심 개념을 문제 풀이로 완성합니다.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/problems">
              <Button size="lg">문제 풀기 시작</Button>
            </Link>
            <Link href="/concepts">
              <Button size="lg" variant="secondary">개념 배우기</Button>
            </Link>
          </div>

          {/* Suit decoration */}
          <div className="mt-16 flex justify-center gap-8 text-5xl opacity-10 select-none" aria-hidden="true">
            <span className="text-[var(--color-suit-spade)]">♠</span>
            <span className="text-[var(--color-suit-heart)]">♥</span>
            <span className="text-[var(--color-suit-diamond)]">♦</span>
            <span className="text-[var(--color-suit-club)]">♣</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[var(--color-surface-raised)]" aria-labelledby="features-heading">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="features-heading" className="text-center text-3xl font-bold mb-12">
            왜 <span className="text-gold">Poker IQ</span>인가
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <Card key={feature.title} hover className="p-6">
                <span className="text-3xl mb-4 block" aria-hidden="true">{feature.icon}</span>
                <h3 className="font-semibold text-lg mb-2 text-[var(--color-text-primary)]">{feature.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample problems */}
      <section className="py-20" aria-labelledby="problems-heading">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 id="problems-heading" className="text-3xl font-bold">
              이런 <span className="text-gold">문제</span>를 풀어요
            </h2>
            <Link href="/problems">
              <Button variant="ghost" size="sm">전체 보기 →</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {SAMPLE_PROBLEMS.map((problem) => (
              <Card key={problem.title} hover className="group cursor-pointer">
                <Card.Header className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-gold)] transition-colors line-clamp-2">
                    {problem.title}
                  </h3>
                  <div className="flex flex-col gap-1 shrink-0">
                    <Badge variant={DIFFICULTY_COLORS[problem.difficulty as keyof typeof DIFFICULTY_COLORS]} size="sm">
                      {problem.difficulty}
                    </Badge>
                    <Badge variant="muted" size="sm">{problem.category}</Badge>
                  </div>
                </Card.Header>
                <Card.Body>
                  <p className="text-sm text-[var(--color-text-muted)]">{problem.desc}</p>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--color-surface-raised)]">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 <span className="text-gold">시작</span>하세요
          </h2>
          <p className="text-[var(--color-text-muted)] mb-8">
            무료로 문제를 풀고 AI 피드백으로 실력을 키워보세요.
          </p>
          <Link href="/problems">
            <Button size="lg">무료로 시작하기</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

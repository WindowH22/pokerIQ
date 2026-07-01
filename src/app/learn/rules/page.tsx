import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PlayingCard } from '@/components/features/problem/CardDisplay'
import type { Card as PokerCard } from '@/types'

export const metadata: Metadata = {
  title: '텍사스 홀덤 룰 완벽 정리 | Poker IQ',
  description:
    '텍사스 홀덤 기본 규칙부터 베팅 액션, 포커 족보까지 한눈에 정리. 블라인드 구조, 프리플롭/플롭/턴/리버 진행 순서를 쉽게 설명합니다.',
  keywords: ['텍사스 홀덤 규칙', '홀덤 룰', '포커 족보', '홀덤 베팅', '홀덤 하는법'],
  openGraph: {
    title: '텍사스 홀덤 룰 완벽 정리',
    description: '홀덤 초보자를 위한 규칙 가이드. 블라인드부터 쇼다운까지.',
    type: 'article',
  },
}

interface HandRanking {
  rank: number
  name: string
  desc: string
  cards: PokerCard[]
  gold?: boolean
}

const HAND_RANKINGS: HandRanking[] = [
  {
    rank: 1, name: '로열 플러시', desc: '최강의 패 — 같은 무늬 A K Q J 10', gold: true,
    cards: [
      { rank: 'A', suit: 'spade' }, { rank: 'K', suit: 'spade' },
      { rank: 'Q', suit: 'spade' }, { rank: 'J', suit: 'spade' }, { rank: 'T', suit: 'spade' },
    ],
  },
  {
    rank: 2, name: '스트레이트 플러시', desc: '같은 무늬 연속 5장',
    cards: [
      { rank: '9', suit: 'heart' }, { rank: '8', suit: 'heart' },
      { rank: '7', suit: 'heart' }, { rank: '6', suit: 'heart' }, { rank: '5', suit: 'heart' },
    ],
  },
  {
    rank: 3, name: '포카드', desc: '같은 숫자 4장',
    cards: [
      { rank: 'A', suit: 'spade' }, { rank: 'A', suit: 'heart' },
      { rank: 'A', suit: 'diamond' }, { rank: 'A', suit: 'club' }, { rank: 'K', suit: 'spade' },
    ],
  },
  {
    rank: 4, name: '풀하우스', desc: '트리플 + 페어',
    cards: [
      { rank: 'K', suit: 'spade' }, { rank: 'K', suit: 'heart' }, { rank: 'K', suit: 'diamond' },
      { rank: 'A', suit: 'spade' }, { rank: 'A', suit: 'heart' },
    ],
  },
  {
    rank: 5, name: '플러시', desc: '같은 무늬 5장 (연속 불필요)',
    cards: [
      { rank: 'A', suit: 'diamond' }, { rank: 'J', suit: 'diamond' },
      { rank: '9', suit: 'diamond' }, { rank: '5', suit: 'diamond' }, { rank: '2', suit: 'diamond' },
    ],
  },
  {
    rank: 6, name: '스트레이트', desc: '연속된 숫자 5장 (무늬 무관)',
    cards: [
      { rank: '8', suit: 'spade' }, { rank: '7', suit: 'heart' },
      { rank: '6', suit: 'diamond' }, { rank: '5', suit: 'club' }, { rank: '4', suit: 'spade' },
    ],
  },
  {
    rank: 7, name: '트리플', desc: '같은 숫자 3장',
    cards: [
      { rank: 'Q', suit: 'spade' }, { rank: 'Q', suit: 'heart' }, { rank: 'Q', suit: 'diamond' },
      { rank: '9', suit: 'spade' }, { rank: '3', suit: 'heart' },
    ],
  },
  {
    rank: 8, name: '투페어', desc: '서로 다른 페어 두 쌍',
    cards: [
      { rank: 'J', suit: 'spade' }, { rank: 'J', suit: 'heart' },
      { rank: '7', suit: 'diamond' }, { rank: '7', suit: 'club' }, { rank: 'K', suit: 'spade' },
    ],
  },
  {
    rank: 9, name: '원페어', desc: '같은 숫자 2장',
    cards: [
      { rank: 'T', suit: 'spade' }, { rank: 'T', suit: 'heart' },
      { rank: 'A', suit: 'diamond' }, { rank: 'K', suit: 'club' }, { rank: '3', suit: 'spade' },
    ],
  },
  {
    rank: 10, name: '하이카드', desc: '아무 조합도 없는 경우 — 가장 높은 카드로 승부',
    cards: [
      { rank: 'A', suit: 'spade' }, { rank: 'K', suit: 'heart' },
      { rank: 'J', suit: 'diamond' }, { rank: '8', suit: 'club' }, { rank: '3', suit: 'spade' },
    ],
  },
]

const BETTING_ACTIONS = [
  { action: 'Fold', ko: '폴드', desc: '패를 포기하고 해당 핸드에서 빠짐. 베팅한 금액은 회수 불가.' },
  { action: 'Check', ko: '체크', desc: '베팅 없이 차례를 넘김. 앞 플레이어가 베팅하지 않았을 때만 가능.' },
  { action: 'Call', ko: '콜', desc: '앞 플레이어의 베팅 금액만큼 동일하게 베팅하여 계속 참가.' },
  { action: 'Raise', ko: '레이즈', desc: '앞 베팅보다 더 높은 금액으로 베팅. 다른 플레이어는 콜·레이즈·폴드 중 선택.' },
  { action: 'All-in', ko: '올인', desc: '보유한 모든 칩을 베팅. 올인 후엔 추가 베팅 없이 쇼다운까지 진행.' },
]

const STREETS = [
  {
    name: '프리플롭 (Pre-Flop)',
    desc: '딜러가 홀 카드(개인 카드) 2장씩 배분. SB → BB 순으로 블라인드 베팅 후, UTG부터 시계 방향으로 액션 진행.',
    cards: '🃏🃏',
  },
  {
    name: '플롭 (Flop)',
    desc: '공용 카드 3장 공개. SB(남은 플레이어 중 가장 왼쪽)부터 베팅 라운드 시작.',
    cards: '🃏🃏🃏',
  },
  {
    name: '턴 (Turn)',
    desc: '공용 카드 1장 추가 공개 (총 4장). 동일하게 베팅 라운드 진행.',
    cards: '🃏🃏🃏🃏',
  },
  {
    name: '리버 (River)',
    desc: '마지막 공용 카드 1장 공개 (총 5장). 최후 베팅 라운드 후 쇼다운.',
    cards: '🃏🃏🃏🃏🃏',
  },
]

export default function HoldemRulesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-6 text-sm text-[var(--color-text-muted)]">
        <Link href="/" className="hover:text-[var(--color-gold)] transition-colors">홈</Link>
        <span className="mx-2">/</span>
        <span>텍사스 홀덤 규칙</span>
      </nav>

      {/* Hero */}
      <header className="mb-12">
        <Badge variant="gold" size="sm" className="mb-3">입문 가이드</Badge>
        <h1 className="text-4xl font-bold mb-4">
          텍사스 홀덤 <span className="text-[var(--color-gold)]">룰 완벽 정리</span>
        </h1>
        <p className="text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
          포커를 처음 접한다면 이 페이지 하나로 충분합니다. 블라인드 구조부터 베팅 액션,
          족보까지 핵심만 정리했습니다.
        </p>
      </header>

      {/* 목표 */}
      <section aria-labelledby="goal-heading" className="mb-12">
        <h2 id="goal-heading" className="text-2xl font-bold mb-4">
          🎯 게임의 목표
        </h2>
        <Card>
          <Card.Body>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              텍사스 홀덤은 2장의 개인 카드(홀 카드)와 5장의 공용 카드(커뮤니티 카드) 중
              최대 5장을 조합해 <strong className="text-[var(--color-text-primary)]">가장 높은 족보</strong>를
              만드는 게임입니다. 모든 플레이어가 폴드하거나, 쇼다운에서 가장 좋은 패를
              가진 플레이어가 팟(pot)을 가져갑니다.
            </p>
          </Card.Body>
        </Card>
      </section>

      {/* 블라인드 */}
      <section aria-labelledby="blind-heading" className="mb-12">
        <h2 id="blind-heading" className="text-2xl font-bold mb-4">
          💰 블라인드 구조
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: '딜러 버튼 (BTN)',
              desc: '핸드가 끝날 때마다 시계 방향으로 이동. 해당 핸드의 마지막 베팅 순서로 포지션 이점 최대.',
              color: 'text-[var(--color-gold)]',
            },
            {
              title: '스몰 블라인드 (SB)',
              desc: '딜러 버튼 왼쪽. 강제로 최소 베팅의 절반을 미리 베팅.',
              color: 'text-[var(--color-chip-blue)]',
            },
            {
              title: '빅 블라인드 (BB)',
              desc: 'SB 왼쪽. 강제로 최소 베팅 전액을 미리 베팅. 프리플롭 마지막 액션.',
              color: 'text-[var(--color-chip-red)]',
            },
          ].map(({ title, desc, color }) => (
            <Card key={title}>
              <Card.Body>
                <p className={`font-bold mb-2 ${color}`}>{title}</p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>

      {/* 게임 진행 */}
      <section aria-labelledby="streets-heading" className="mb-12">
        <h2 id="streets-heading" className="text-2xl font-bold mb-4">
          🃏 게임 진행 순서
        </h2>
        <ol className="space-y-4" role="list">
          {STREETS.map((street, i) => (
            <li key={street.name} className="flex gap-4">
              <div className="flex-none w-8 h-8 rounded-full bg-[var(--color-surface-raised)] border border-[var(--color-surface-border)] flex items-center justify-center text-sm font-bold text-[var(--color-gold)]">
                {i + 1}
              </div>
              <Card className="flex-1">
                <Card.Body className="py-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-[var(--color-text-primary)]">{street.name}</span>
                    <span className="text-lg" aria-hidden="true">{street.cards}</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{street.desc}</p>
                </Card.Body>
              </Card>
            </li>
          ))}
          <li className="flex gap-4">
            <div className="flex-none w-8 h-8 rounded-full bg-[var(--color-gold)] flex items-center justify-center text-sm font-bold text-[var(--color-surface)]">
              5
            </div>
            <Card className="flex-1" glow>
              <Card.Body className="py-4">
                <p className="font-bold text-[var(--color-gold)] mb-2">쇼다운 (Showdown)</p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  남은 플레이어들이 카드를 공개. 가장 높은 족보를 가진 플레이어가 팟 전체를 획득.
                  동점이면 팟을 균등 분배(스플릿).
                </p>
              </Card.Body>
            </Card>
          </li>
        </ol>
      </section>

      {/* 베팅 액션 */}
      <section aria-labelledby="actions-heading" className="mb-12">
        <h2 id="actions-heading" className="text-2xl font-bold mb-4">
          ⚡ 베팅 액션
        </h2>
        <div className="space-y-3">
          {BETTING_ACTIONS.map(({ action, ko, desc }) => (
            <div key={action} className="flex gap-4 items-start p-4 rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface-raised)]">
              <div className="flex-none">
                <span className="font-mono text-sm font-bold text-[var(--color-gold)] bg-[var(--color-surface)] px-2 py-0.5 rounded">
                  {action}
                </span>
                <span className="ml-2 text-sm text-[var(--color-text-muted)]">({ko})</span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 족보 */}
      <section aria-labelledby="hands-heading" className="mb-12">
        <h2 id="hands-heading" className="text-2xl font-bold mb-2">
          👑 포커 족보
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          1위에 가까울수록 강한 패입니다.
        </p>
        <ol className="space-y-3" role="list">
          {HAND_RANKINGS.map(({ rank, name, desc, cards, gold }) => (
            <li key={rank}>
              <div
                className={[
                  'rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors',
                  gold
                    ? 'border-[var(--color-gold-dim)] bg-[var(--color-surface-raised)] glow-gold'
                    : 'border-[var(--color-surface-border)] bg-[var(--color-surface-raised)]',
                ].join(' ')}
              >
                {/* Rank + name */}
                <div className="flex items-center gap-3 sm:w-44 shrink-0">
                  <span
                    className={[
                      'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
                      gold
                        ? 'bg-[var(--color-gold)] text-[var(--color-surface)]'
                        : 'bg-[var(--color-surface)] border border-[var(--color-surface-border)] text-[var(--color-text-muted)]',
                    ].join(' ')}
                  >
                    {rank}
                  </span>
                  <div>
                    <p className={['font-semibold text-sm', gold ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-primary)]'].join(' ')}>
                      {name}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
                  </div>
                </div>

                {/* Cards */}
                <div className="flex gap-1.5 items-center overflow-x-auto pb-0.5" aria-label={`${name} 예시`}>
                  {cards.map((card, i) => (
                    <PlayingCard key={i} card={card} size="sm" />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-heading" className="rounded-2xl border border-[var(--color-gold-dim)] bg-[var(--color-surface-raised)] p-8 text-center">
        <p className="text-3xl mb-4" aria-hidden="true">🃏</p>
        <h2 id="cta-heading" className="text-2xl font-bold mb-3">
          규칙을 익혔다면 <span className="text-[var(--color-gold)]">실전 퀴즈</span>로
        </h2>
        <p className="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
          실제 토너먼트 상황을 풀어보고 AI 피드백으로 판단력을 키워보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/problems"
            className="inline-block px-6 py-3 rounded-lg bg-[var(--color-gold)] text-[var(--color-surface)] font-semibold hover:opacity-90 transition-opacity"
          >
            퀴즈 풀기 →
          </Link>
          <Link
            href="/concepts"
            className="inline-block px-6 py-3 rounded-lg border border-[var(--color-surface-border)] text-[var(--color-text-muted)] hover:border-[var(--color-gold-dim)] hover:text-[var(--color-text-primary)] transition-all"
          >
            개념 사전 보기
          </Link>
        </div>
      </section>
    </main>
  )
}

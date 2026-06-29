import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PROBLEMS } from '@/lib/data/problems'
import { PokerTable } from '@/components/features/problem/PokerTable'
import { HoleCards, BoardCards } from '@/components/features/problem/CardDisplay'
import { SubmitForm } from '@/components/features/problem/SubmitForm'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { RichText } from '@/components/ui/RichText'
import type { Difficulty, ProblemCategory } from '@/types'

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  BEGINNER: '입문',
  INTERMEDIATE: '중급',
  ADVANCED: '고급',
  EXPERT: '전문가',
}

const DIFFICULTY_COLORS: Record<Difficulty, 'green' | 'blue' | 'gold' | 'red'> = {
  BEGINNER: 'green',
  INTERMEDIATE: 'blue',
  ADVANCED: 'gold',
  EXPERT: 'red',
}

const CATEGORY_LABELS: Record<ProblemCategory, string> = {
  ICM_DECISION: 'ICM',
  RANGE_ANALYSIS: 'Range',
  PUSH_FOLD: 'Push/Fold',
  POT_ODDS: 'Pot Odds',
  POSITION_PLAY: 'Position',
  METAGAME: 'Meta',
  BLUFF_CATCH: 'Bluff Catch',
  HAND_READING: 'Hand Reading',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const problem = PROBLEMS.find((p) => p.slug === slug && p.publishedAt !== null)
  return {
    title: problem ? `${problem.title} — Poker IQ` : 'Poker IQ',
  }
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const problem = PROBLEMS.find((p) => p.slug === slug && p.publishedAt !== null)

  if (!problem) notFound()

  const { gameContext } = problem

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
        {/* Left: problem info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-2 flex-wrap">
              <Badge variant={DIFFICULTY_COLORS[problem.difficulty]}>
                {DIFFICULTY_LABELS[problem.difficulty]}
              </Badge>
              <Badge variant="muted">{CATEGORY_LABELS[problem.category]}</Badge>
              {gameContext.tournamentStage && (
                <Badge variant="muted">
                  {gameContext.tournamentStage === 'FINAL_TABLE' ? '파이널 테이블' :
                   gameContext.tournamentStage === 'BUBBLE' ? '버블' :
                   gameContext.tournamentStage === 'MIDDLE' ? '미들 스테이지' : '얼리 스테이지'}
                </Badge>
              )}
              </div>
              <Link
                href="/problems"
                className="shrink-0 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors border border-[var(--color-surface-border)] hover:border-[var(--color-gold-dim)] rounded-lg px-3 py-1.5"
              >
                다른 문제 풀기
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
              {problem.title}
            </h1>
          </div>

          {/* Poker table visualization */}
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  테이블 상황
                </h2>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {gameContext.stage} · Pot {gameContext.potSize}BB
                </span>
              </div>
            </Card.Header>
            <Card.Body>
              <PokerTable
                players={gameContext.players}
                heroPosition={gameContext.heroPosition}
                potSize={gameContext.potSize}
                actionSequence={gameContext.actionSequence}
                className="mb-4"
              />

              {/* Hero cards */}
              {gameContext.heroCards && gameContext.heroCards.length > 0 && (
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] shrink-0">
                    내 패
                  </span>
                  <HoleCards cards={gameContext.heroCards} size="md" />
                </div>
              )}

              {/* Board cards */}
              {gameContext.boardCards && gameContext.boardCards.length > 0 && (
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] shrink-0">
                    보드
                  </span>
                  <BoardCards
                    cards={gameContext.boardCards}
                    stage={gameContext.stage as 'FLOP' | 'TURN' | 'RIVER'}
                  />
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Blinds / stack info */}
          <Card>
            <Card.Body className="py-4">
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <dt className="text-xs text-[var(--color-text-muted)] mb-1">블라인드</dt>
                  <dd className="font-semibold text-sm">{gameContext.smallBlind}/{gameContext.bigBlind}</dd>
                </div>
                {gameContext.ante && (
                  <div>
                    <dt className="text-xs text-[var(--color-text-muted)] mb-1">앤티</dt>
                    <dd className="font-semibold text-sm">{gameContext.ante}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs text-[var(--color-text-muted)] mb-1">히어로 스택</dt>
                  <dd className="font-semibold text-sm text-[var(--color-gold)]">
                    {gameContext.players.find((p) => p.isHero)?.stackBB ?? '?'}BB
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-text-muted)] mb-1">스테이지</dt>
                  <dd className="font-semibold text-sm">{gameContext.stage}</dd>
                </div>
              </dl>
            </Card.Body>
          </Card>

          {/* Problem description */}
          <Card>
            <Card.Header>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                문제 설명
              </h2>
            </Card.Header>
            <Card.Body>
              <RichText text={problem.description} />
            </Card.Body>
          </Card>

          {/* Payout structure */}
          {gameContext.payoutStructure && gameContext.payoutStructure.length > 0 && (
            <Card>
              <Card.Header>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  상금 구조
                </h2>
              </Card.Header>
              <Card.Body>
                <div className="flex gap-3 flex-wrap">
                  {gameContext.payoutStructure.map((p) => (
                    <div
                      key={p.place}
                      className="flex flex-col items-center rounded-lg border border-[var(--color-surface-border)] px-4 py-3 min-w-[60px]"
                    >
                      <span className="text-xs text-[var(--color-text-muted)] mb-1">
                        {p.place}위
                      </span>
                      <span className={`font-bold text-sm ${p.place === 1 ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-primary)]'}`}>
                        {p.amount}%
                      </span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}
        </div>

        {/* Right: submit form */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <Card>
            <Card.Header>
              <h2 className="font-semibold text-[var(--color-text-primary)]">
                답변 제출
              </h2>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                액션을 선택하고 판단 근거를 설명하면 AI가 채점합니다.
              </p>
            </Card.Header>
            <Card.Body>
              <SubmitForm problem={problem} />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

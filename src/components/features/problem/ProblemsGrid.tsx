'use client'

import React, { useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Problem, Difficulty, ProblemCategory } from '@/types'

const ITEMS_PER_PAGE = 12

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
  METAGAME: 'Metagame',
  BLUFF_CATCH: 'Bluff Catch',
  HAND_READING: 'Hand Reading',
}

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as ProblemCategory[]

type FilterCategory = 'ALL' | ProblemCategory

function stageLabel(stage?: string): string {
  if (stage === 'FINAL_TABLE') return '파이널 테이블'
  if (stage === 'BUBBLE') return '버블'
  if (stage === 'ITM') return 'ITM'
  if (stage === 'MIDDLE') return '미들 스테이지'
  return '얼리 스테이지'
}

interface ProblemsGridProps {
  problems: Problem[]
}

export function ProblemsGrid({ problems }: ProblemsGridProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('ALL')
  const [page, setPage] = useState(1)
  const touchStartX = useRef(0)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = activeCategory === 'ALL'
    ? problems
    : problems.filter((p) => p.category === activeCategory)

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const startIdx = (page - 1) * ITEMS_PER_PAGE
  const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  const counts = useMemo(() => {
    const c = { ALL: problems.length } as Record<FilterCategory, number>
    for (const cat of ALL_CATEGORIES) {
      c[cat] = problems.filter((p) => p.category === cat).length
    }
    return c
  }, [problems])

  function selectCategory(cat: FilterCategory) {
    setActiveCategory(cat)
    setPage(1)
  }

  function goToPage(p: number) {
    const target = Math.max(1, Math.min(totalPages, p))
    if (target === page) return
    setPage(target)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const dx = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(dx) > 60) {
      goToPage(dx > 0 ? page + 1 : page - 1)
    }
  }

  const pageNums: (number | '...')[] = (() => {
    if (totalPages <= 9) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (page <= 5) return [1, 2, 3, 4, 5, 6, '...', totalPages]
    if (page >= totalPages - 4)
      return [1, '...', totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, '...', page - 1, page, page + 1, '...', totalPages]
  })()

  return (
    <div>
      {/* Category filter bar */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0 mb-8 overflow-x-auto">
        <div
          className="flex gap-2 pb-2 min-w-max"
          role="tablist"
          aria-label="카테고리 필터"
        >
          <FilterPill
            label="전체"
            count={counts.ALL}
            active={activeCategory === 'ALL'}
            onClick={() => selectCategory('ALL')}
          />
          {ALL_CATEGORIES.map((cat) => (
            <FilterPill
              key={cat}
              label={CATEGORY_LABELS[cat]}
              count={counts[cat]}
              active={activeCategory === cat}
              onClick={() => selectCategory(cat)}
            />
          ))}
        </div>
      </div>

      {/* Result summary */}
      <p className="mb-6 text-sm text-[var(--color-text-muted)]" ref={gridRef}>
        {activeCategory === 'ALL' ? '전체' : CATEGORY_LABELS[activeCategory as ProblemCategory]}{' '}
        <span className="text-[var(--color-text-primary)] font-semibold">{filtered.length}</span>
        {'문제'}
        {totalPages > 1 && (
          <span className="ml-2">
            · {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, filtered.length)} 표시중
          </span>
        )}
      </p>

      {/* Problem grid */}
      <div
        key={`${activeCategory}-${page}`}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 problems-grid-fade"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {paginated.map((problem) => (
          <Link key={problem.id} href={`/problems/${problem.slug}`} className="block group">
            <Card hover className="h-full">
              <Card.Header>
                <div className="flex gap-2 flex-wrap mb-2">
                  <Badge variant={DIFFICULTY_COLORS[problem.difficulty]} size="sm">
                    {DIFFICULTY_LABELS[problem.difficulty]}
                  </Badge>
                  <Badge variant="muted" size="sm">
                    {CATEGORY_LABELS[problem.category]}
                  </Badge>
                </div>
                <h2 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-gold)] transition-colors line-clamp-2">
                  {problem.title}
                </h2>
              </Card.Header>
              <Card.Body>
                <p className="text-sm text-[var(--color-text-muted)] line-clamp-3">
                  {problem.description.split('\n')[0]}
                </p>
              </Card.Body>
              <Card.Footer>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {stageLabel(problem.gameContext.tournamentStage)}
                  </span>
                  <span className="text-xs text-[var(--color-gold)] font-medium group-hover:underline">
                    풀기 →
                  </span>
                </div>
              </Card.Footer>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="mt-12 flex items-center justify-center gap-1.5"
          aria-label="페이지 탐색"
        >
          <PageBtn
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            aria-label="이전 페이지"
          >
            ←
          </PageBtn>

          {pageNums.map((p, i) =>
            typeof p === 'number' ? (
              <PageBtn
                key={p}
                onClick={() => goToPage(p)}
                active={p === page}
                aria-label={`페이지 ${p}`}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </PageBtn>
            ) : (
              <span
                key={`ellipsis-${i}`}
                className="w-9 flex items-center justify-center text-[var(--color-text-muted)] text-sm select-none"
              >
                ···
              </span>
            )
          )}

          <PageBtn
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            aria-label="다음 페이지"
          >
            →
          </PageBtn>
        </nav>
      )}

      {/* Mobile swipe hint */}
      {totalPages > 1 && (
        <p className="mt-4 text-center text-xs text-[var(--color-text-muted)] sm:hidden">
          좌우로 스와이프해서 페이지를 넘기세요
        </p>
      )}
    </div>
  )
}

interface FilterPillProps {
  label: string
  count: number
  active: boolean
  onClick: () => void
}

function FilterPill({ label, count, active, onClick }: FilterPillProps) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={[
        'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium',
        'border transition-all duration-150 whitespace-nowrap cursor-pointer',
        active
          ? 'bg-[var(--color-gold)]/10 border-[var(--color-gold)]/60 text-[var(--color-gold)]'
          : 'bg-[var(--color-surface-raised)] border-[var(--color-surface-border)] text-[var(--color-text-muted)]'
          + ' hover:text-[var(--color-text-primary)] hover:border-[var(--color-gold)]/30',
      ].join(' ')}
    >
      {label}
      <span
        className={[
          'text-xs px-1.5 py-px rounded-full leading-tight',
          active
            ? 'bg-[var(--color-gold)]/20 text-[var(--color-gold)]'
            : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]',
        ].join(' ')}
      >
        {count}
      </span>
    </button>
  )
}

interface PageBtnProps {
  onClick: () => void
  disabled?: boolean
  active?: boolean
  children: React.ReactNode
  'aria-label'?: string
  'aria-current'?: 'page' | undefined
}

function PageBtn({ onClick, disabled, active, children, ...ariaProps }: PageBtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...ariaProps}
      className={[
        'w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium',
        'transition-all duration-150 cursor-pointer',
        'disabled:opacity-30 disabled:cursor-not-allowed',
        active
          ? 'bg-[var(--color-gold)] text-[var(--color-felt)] font-bold'
          : [
              'bg-[var(--color-surface-raised)] text-[var(--color-text-muted)]',
              'hover:text-[var(--color-text-primary)] hover:border hover:border-[var(--color-gold)]/30',
            ].join(' '),
      ].join(' ')}
    >
      {children}
    </button>
  )
}

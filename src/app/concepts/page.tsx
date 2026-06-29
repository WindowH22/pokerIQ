import Link from 'next/link'
import { CONCEPTS } from '@/lib/data/concepts'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Difficulty } from '@/types'

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

const FILTER_OPTIONS: Array<{ label: string; value: string }> = [
  { label: '전체', value: '' },
  { label: '입문', value: 'BEGINNER' },
  { label: '중급', value: 'INTERMEDIATE' },
  { label: '고급', value: 'ADVANCED' },
]

export default async function ConceptsPage({
  searchParams,
}: {
  searchParams: Promise<{ difficulty?: string }>
}) {
  const { difficulty } = await searchParams

  const filtered =
    difficulty && difficulty in DIFFICULTY_LABELS
      ? CONCEPTS.filter((c) => c.difficulty === difficulty)
      : CONCEPTS

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">
          개념 <span className="text-gold">사전</span>
        </h1>
        <p className="text-[var(--color-text-muted)]">
          ICM, GTO, Push/Fold 등 토너먼트 홀덤의 핵심 개념을 학습하세요.
        </p>
      </div>

      {/* Difficulty filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="난이도 필터">
        {FILTER_OPTIONS.map(({ label, value }) => {
          const isActive = (difficulty ?? '') === value
          return (
            <Link
              key={value}
              href={value ? `/concepts?difficulty=${value}` : '/concepts'}
              role="tab"
              aria-selected={isActive}
              className={[
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all border',
                isActive
                  ? 'bg-[var(--color-gold)] text-[var(--color-surface)] border-[var(--color-gold)]'
                  : 'border-[var(--color-surface-border)] text-[var(--color-text-muted)] hover:border-[var(--color-gold-dim)] hover:text-[var(--color-text-primary)]',
              ].join(' ')}
            >
              {label}
            </Link>
          )
        })}
        <span className="flex items-center text-xs text-[var(--color-text-muted)] ml-1">
          {filtered.length}개
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[var(--color-text-muted)]">
          <p className="text-6xl mb-4" aria-hidden="true">📚</p>
          <p className="text-lg">해당 난이도의 개념이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((concept) => {
            const diff = concept.difficulty as Difficulty
            return (
              <Link key={concept.id} href={`/concepts/${concept.id}`} className="group block">
                <Card hover className="flex flex-col h-full group-focus-visible:ring-2 group-focus-visible:ring-[var(--color-gold)]">
                  <Card.Header>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <Badge variant={DIFFICULTY_COLORS[diff]} size="sm">
                        {DIFFICULTY_LABELS[diff]}
                      </Badge>
                      <span className="text-[var(--color-text-muted)] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </div>
                    <h2 className="font-semibold text-[var(--color-text-primary)] text-lg">
                      {concept.termKo}
                    </h2>
                    <p className="text-sm text-[var(--color-gold)] font-mono mt-0.5">
                      {concept.term}
                    </p>
                  </Card.Header>
                  <Card.Body className="flex-1">
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {concept.shortDescription}
                    </p>
                  </Card.Body>
                  {concept.relatedTerms.length > 0 && (
                    <Card.Footer>
                      <p className="text-xs text-[var(--color-text-muted)] mb-2">관련 개념</p>
                      <div className="flex flex-wrap gap-1.5">
                        {concept.relatedTerms.slice(0, 3).map((term) => (
                          <Badge key={term} variant="muted" size="sm">{term}</Badge>
                        ))}
                      </div>
                    </Card.Footer>
                  )}
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

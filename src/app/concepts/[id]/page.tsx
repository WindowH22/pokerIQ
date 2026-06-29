import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CONCEPTS } from '@/lib/data/concepts'
import { Badge } from '@/components/ui/Badge'
import type { Difficulty } from '@/types'
import type { Metadata } from 'next'

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const concept = CONCEPTS.find((c) => c.id === id)
  if (!concept) return { title: '개념 | Poker IQ' }
  return { title: `${concept.termKo} | Poker IQ` }
}

function renderInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-[var(--color-text-primary)] font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

function renderExplanation(text: string) {
  return text
    .split('\n\n')
    .map((block, blockIdx) => {
      const trimmed = block.trim()
      if (!trimmed) return null

      const lines = trimmed.split('\n')
      const bulletLines = lines.filter((l) => l.trim().startsWith('-'))

      if (bulletLines.length > 0 && bulletLines.length === lines.filter((l) => l.trim()).length) {
        return (
          <ul key={blockIdx} className="space-y-1.5 my-4 pl-0">
            {bulletLines.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-[var(--color-text-muted)]">
                <span className="text-[var(--color-gold)] shrink-0 mt-0.5">▸</span>
                <span>{renderInline(item.replace(/^-\s*/, ''))}</span>
              </li>
            ))}
          </ul>
        )
      }

      return (
        <p key={blockIdx} className="text-[var(--color-text-muted)] leading-relaxed my-3">
          {lines.map((line, lineIdx) => (
            <span key={lineIdx}>
              {renderInline(line)}
              {lineIdx < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
      )
    })
    .filter(Boolean)
}

export default async function ConceptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const concept = CONCEPTS.find((c) => c.id === id)

  if (!concept) notFound()

  const difficulty = concept.difficulty as Difficulty

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Back link */}
      <Link
        href="/concepts"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-8 group"
      >
        <span className="transition-transform group-hover:-translate-x-0.5">←</span>
        개념 사전으로
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant={DIFFICULTY_COLORS[difficulty]}>
            {DIFFICULTY_LABELS[difficulty]}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-1">
          {concept.termKo}
        </h1>
        <p className="font-mono text-[var(--color-gold)] text-sm tracking-wide">
          {concept.term}
        </p>
        <p className="mt-3 text-[var(--color-text-muted)] text-base leading-relaxed">
          {concept.shortDescription}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--color-surface-border)] mb-8" />

      {/* Full explanation */}
      {concept.fullExplanation && (
        <article className="prose-poker">
          {renderExplanation(concept.fullExplanation)}
        </article>
      )}

      {/* Related terms */}
      {concept.relatedTerms.length > 0 && (
        <div className="mt-10 pt-8 border-t border-[var(--color-surface-border)]">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
            관련 개념
          </p>
          <div className="flex flex-wrap gap-2">
            {concept.relatedTerms.map((term) => (
              <Badge key={term} variant="muted">{term}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

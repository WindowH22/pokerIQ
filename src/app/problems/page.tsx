import Link from 'next/link'
import { db, problems } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Problem, Difficulty, ProblemCategory } from '@/types'

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

export const revalidate = 60

export default async function ProblemsPage() {
  const rows = await db
    .select()
    .from(problems)
    .where(eq(problems.isPublished, true))
    .orderBy(problems.createdAt)

  const problemList = rows.map((row) => ({
    ...row,
    gameContext: row.gameContext as Problem['gameContext'],
    rubric: row.rubric as Problem['rubric'],
    publishedAt: row.publishedAt?.toISOString() ?? null,
    createdAt: row.createdAt.toISOString(),
  } as unknown as Problem))

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">
          문제 <span className="text-gold">풀기</span>
        </h1>
        <p className="text-[var(--color-text-muted)]">
          실전 토너먼트 상황을 분석하고 AI 피드백을 받으세요.
        </p>
      </div>

      {problemList.length === 0 ? (
        <div className="text-center py-20 text-[var(--color-text-muted)]">
          <p className="text-6xl mb-4" aria-hidden="true">♠</p>
          <p className="text-lg">문제가 아직 등록되지 않았습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {problemList.map((problem) => (
            <Link key={problem.id} href={`/problems/${problem.slug}`} className="block group">
              <Card hover className="h-full">
                <Card.Header>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex gap-2 flex-wrap">
                      <Badge
                        variant={DIFFICULTY_COLORS[problem.difficulty]}
                        size="sm"
                      >
                        {DIFFICULTY_LABELS[problem.difficulty]}
                      </Badge>
                      <Badge variant="muted" size="sm">
                        {CATEGORY_LABELS[problem.category]}
                      </Badge>
                    </div>
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
                      {problem.gameContext.tournamentStage === 'FINAL_TABLE' ? '파이널 테이블' :
                       problem.gameContext.tournamentStage === 'BUBBLE' ? '버블' :
                       problem.gameContext.tournamentStage === 'MIDDLE' ? '미들 스테이지' : '얼리 스테이지'}
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
      )}
    </div>
  )
}

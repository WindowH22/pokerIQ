import { PROBLEMS } from '@/lib/data/problems'
import { ProblemsGrid } from '@/components/features/problem/ProblemsGrid'

const problemList = PROBLEMS.filter((p) => p.publishedAt !== null)

export default function ProblemsPage() {
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
        <ProblemsGrid problems={problemList} />
      )}
    </div>
  )
}

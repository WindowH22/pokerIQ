'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Action, Problem, Submission } from '@/types'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PROBLEMS } from '@/lib/data/problems'
import { annotateGlossary } from '@/lib/glossary'

function renderInlineMarkdown(text: string, keyPrefix: string | number = 0): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  const out: React.ReactNode[] = []
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (part.startsWith('**') && part.endsWith('**')) {
      out.push(<strong key={i} className="font-semibold text-[var(--color-text-primary)]">{part.slice(2, -2)}</strong>)
    } else {
      out.push(...annotateGlossary(part, `${keyPrefix}-${i}`))
    }
  }
  return out
}

function ModelAnswer({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/)

  return (
    <div className="space-y-3 text-sm leading-relaxed text-[var(--color-text-primary)]">
      {blocks.map((block, i) => {
        const lines = block.split('\n')

        if (lines.every(l => l.trimStart().startsWith('- '))) {
          return (
            <ul key={i} className="space-y-1 pl-1">
              {lines.map((line, j) => (
                <li key={j} className="flex gap-2">
                  <span className="mt-[0.35em] size-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                  <span className="text-[var(--color-text-muted)]">{renderInlineMarkdown(line.replace(/^-\s*/, ''))}</span>
                </li>
              ))}
            </ul>
          )
        }

        const hasListLines = lines.some(l => l.trimStart().startsWith('- '))
        if (hasListLines) {
          return (
            <div key={i} className="space-y-1.5">
              {lines.map((line, j) => {
                if (line.trimStart().startsWith('- ')) {
                  return (
                    <div key={j} className="flex gap-2">
                      <span className="mt-[0.35em] size-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                      <span className="text-[var(--color-text-muted)]">{renderInlineMarkdown(line.replace(/^-\s*/, ''))}</span>
                    </div>
                  )
                }
                return (
                  <p key={j} className={line.startsWith('**') ? 'font-semibold text-[var(--color-gold)]' : 'text-[var(--color-text-muted)]'}>
                    {renderInlineMarkdown(line)}
                  </p>
                )
              })}
            </div>
          )
        }

        const isBoldBlock = block.startsWith('**') && block.trimEnd().endsWith('**')
        if (isBoldBlock) {
          return (
            <p key={i} className="font-semibold text-[var(--color-gold)]">
              {renderInlineMarkdown(block)}
            </p>
          )
        }

        const hasSectionHeader = lines[0].startsWith('**') && lines.length > 1
        if (hasSectionHeader) {
          return (
            <div key={i} className="space-y-1">
              <p className="font-semibold text-[var(--color-gold)]">{renderInlineMarkdown(lines[0])}</p>
              {lines.slice(1).map((line, j) => (
                <p key={j} className="text-[var(--color-text-muted)]">{renderInlineMarkdown(line)}</p>
              ))}
            </div>
          )
        }

        return (
          <p key={i} className="text-[var(--color-text-muted)]">
            {renderInlineMarkdown(block)}
          </p>
        )
      })}
    </div>
  )
}

const ACTION_LABELS: Record<string, string> = {
  FOLD: '폴드 (Fold)',
  CALL: '콜 (Call)',
  RAISE: '레이즈 (Raise)',
  CHECK: '체크 (Check)',
  ALL_IN: '올인 (All-in)',
  LIMP: '림프 (Limp)',
}

const ACTION_COLORS: Record<string, string> = {
  FOLD: 'bg-[oklch(55%_0.22_25/0.1)] border-[oklch(55%_0.22_25/0.4)] text-[var(--color-chip-red)] hover:bg-[oklch(55%_0.22_25/0.2)]',
  CALL: 'bg-[oklch(65%_0.18_145/0.1)] border-[oklch(65%_0.18_145/0.4)] text-[oklch(70%_0.18_145)] hover:bg-[oklch(65%_0.18_145/0.2)]',
  RAISE: 'bg-[oklch(78%_0.16_78/0.1)] border-[oklch(78%_0.16_78/0.4)] text-[var(--color-gold)] hover:bg-[oklch(78%_0.16_78/0.2)]',
  CHECK: 'bg-[oklch(52%_0.18_240/0.1)] border-[oklch(52%_0.18_240/0.4)] text-[var(--color-chip-blue)] hover:bg-[oklch(52%_0.18_240/0.2)]',
  ALL_IN: 'bg-[oklch(55%_0.22_25/0.15)] border-[oklch(55%_0.22_25/0.6)] text-[var(--color-chip-red)] hover:bg-[oklch(55%_0.22_25/0.25)] font-bold',
  LIMP: 'bg-[var(--color-surface-raised)] border-[var(--color-surface-border)] text-[var(--color-text-muted)] hover:border-[var(--color-gold-dim)]',
}

interface SubmitFormProps {
  problem: Problem
}

interface EvaluationResult {
  submission: Submission
}

export function SubmitForm({ problem }: SubmitFormProps) {
  const [selectedAction, setSelectedAction] = useState<Action | null>(null)
  const [reasoning, setReasoning] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<EvaluationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const availableActions: Action[] = problem.gameContext.stage === 'PREFLOP'
    ? ['FOLD', 'CALL', 'RAISE', 'ALL_IN', 'LIMP']
    : ['FOLD', 'CALL', 'RAISE', 'CHECK', 'ALL_IN']

  async function handleSubmit() {
    if (!selectedAction) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problem.id,
          action: selectedAction,
          reasoning: reasoning.trim(),
        }),
      })

      const json = await res.json()

      if (!json.success) {
        setError(json.error ?? '오류가 발생했습니다.')
        return
      }

      setResult({ submission: json.data })
    } catch {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (result?.submission.evaluation) {
    return <EvaluationDisplay submission={result.submission} problem={problem} onReset={() => setResult(null)} />
  }

  const submitHint = !selectedAction ? '액션을 먼저 선택해주세요' : null

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          당신의 액션을 선택하세요
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableActions.map((action) => (
            <button
              key={action}
              onClick={() => setSelectedAction(action)}
              className={[
                'px-4 py-2 rounded-lg border transition-all text-sm font-medium',
                ACTION_COLORS[action],
                selectedAction === action ? 'ring-2 ring-[var(--color-gold)] ring-offset-2 ring-offset-[var(--color-surface)]' : '',
              ].join(' ')}
              aria-pressed={selectedAction === action}
            >
              {ACTION_LABELS[action]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="reasoning" className="block text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
          근거 설명{' '}
          <span className="text-[var(--color-text-muted)] font-normal normal-case tracking-normal text-xs">(선택 — 쓰면 항목별 상세 분석)</span>
        </label>
        <textarea
          id="reasoning"
          value={reasoning}
          onChange={(e) => setReasoning(e.target.value)}
          placeholder="왜 이 액션을 선택했나요? ICM, 포지션, 상대 레인지, 스택 크기 등을 고려해 써보세요."
          rows={4}
          className="w-full rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-gold-dim)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] resize-none transition-colors"
        />
      </div>

      {error && (
        <p className="text-sm text-[var(--color-chip-red)] bg-[oklch(55%_0.22_25/0.1)] border border-[oklch(55%_0.22_25/0.3)] rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={!selectedAction}
        className="w-full"
        size="lg"
      >
        {loading ? 'AI가 채점 중...' : reasoning.trim().length > 0 ? 'AI 상세 채점 받기' : '빠른 채점 받기'}
      </Button>
      {submitHint && (
        <p className="text-xs text-center text-[var(--color-text-muted)]">{submitHint}</p>
      )}
    </div>
  )
}

interface EvaluationDisplayProps {
  submission: Submission
  problem: Problem
  onReset: () => void
}

const DIFFICULTY_ORDER = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'] as const

function useStreak() {
  const [streak, setStreak] = useState(0)
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    let data: { lastDate: string; count: number } = { lastDate: '', count: 0 }
    try { data = JSON.parse(localStorage.getItem('poker_iq_streak') ?? '{}') } catch { /* noop */ }
    const count = data.lastDate === today ? data.count
      : data.lastDate === yesterday ? data.count + 1
      : 1
    localStorage.setItem('poker_iq_streak', JSON.stringify({ lastDate: today, count }))
    setStreak(count)
  }, [])
  return streak
}

function EvaluationDisplay({ submission, problem, onReset }: EvaluationDisplayProps) {
  const eval_ = submission.evaluation!
  const pct = Math.round((eval_.totalScore / eval_.maxScore) * 100)
  const streak = useStreak()
  const hasReasoning = submission.reasoning.trim().length > 0

  const published = PROBLEMS.filter((p) => p.publishedAt !== null && p.id !== problem.id)
  const passed = pct >= 80
  const targetDifficulty = passed
    ? DIFFICULTY_ORDER[Math.min(DIFFICULTY_ORDER.indexOf(problem.difficulty) + 1, DIFFICULTY_ORDER.length - 1)]
    : problem.difficulty
  const nextProblem = published.find((p) => p.difficulty === targetDifficulty) ?? null
  const nextLabel = passed ? '난이도 업 ↑' : '같은 레벨로 다시'
  const isCorrectAction = submission.action === problem.correctAction

  const gradeColor =
    pct >= 80 ? 'text-[oklch(70%_0.18_145)]' :
    pct >= 60 ? 'text-[var(--color-gold)]' :
    'text-[var(--color-chip-red)]'

  return (
    <div className="space-y-6">
      {/* Score summary */}
      <Card glow={pct >= 80}>
        <Card.Body className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--color-text-muted)] mb-1">총점</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-bold tabular-nums ${gradeColor}`}>
                {eval_.totalScore}
              </span>
              <span className="text-[var(--color-text-muted)] text-lg">/ {eval_.maxScore}</span>
            </div>
          </div>
          <div className="text-right space-y-2">
            <div>
              <p className="text-sm text-[var(--color-text-muted)] mb-1">선택한 액션</p>
              <div className="flex items-center justify-end gap-2">
                <span className="font-semibold">{submission.action}</span>
                <Badge variant={isCorrectAction ? 'green' : 'red'} size="sm">
                  {isCorrectAction ? '정답' : '오답'}
                </Badge>
              </div>
            </div>
            {streak > 0 && (
              <p className="text-xs text-[var(--color-gold)]">
                🔥 {streak}일 연속 풀이 중
              </p>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Overall feedback */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
            AI 피드백
          </h3>
        </Card.Header>
        <Card.Body>
          <p className="text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-line">
            {annotateGlossary(eval_.overallFeedback, 'ofb')}
          </p>
        </Card.Body>
      </Card>

      {/* Model answer */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
            모범 답안
          </h3>
        </Card.Header>
        <Card.Body>
          <ModelAnswer text={problem.rubric.modelAnswer} />
        </Card.Body>
      </Card>

      {/* Detailed analysis — only when reasoning was provided */}
      {hasReasoning && (
        <>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              항목별 점수
            </h3>
            {eval_.scores.map((score) => {
              const criteria = problem.rubric.criteria.find((c) => c.id === score.criteriaId)
              const scorePct = Math.round((score.score / score.maxScore) * 100)
              return (
                <Card key={score.criteriaId}>
                  <Card.Body className="py-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">
                        {criteria?.nameKo ?? score.criteriaId}
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-[var(--color-text-muted)]">
                        {score.score} / {score.maxScore}점
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--color-surface-border)] overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full bg-[var(--color-gold)] transition-all"
                        style={{ width: `${scorePct}%` }}
                        role="progressbar"
                        aria-valuenow={scorePct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    {score.feedback && (
                      <p className="text-xs text-[var(--color-text-muted)] whitespace-pre-line">
                        {annotateGlossary(score.feedback, score.criteriaId)}
                      </p>
                    )}
                  </Card.Body>
                </Card>
              )
            })}
          </div>

          {eval_.conceptsToLearn.length > 0 && (
            <Card>
              <Card.Header>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  보강이 필요한 개념
                </h3>
              </Card.Header>
              <Card.Body className="space-y-3">
                {eval_.conceptsToLearn.map((concept) => (
                  <div key={concept}>
                    <Badge variant="gold" className="mb-1">{concept}</Badge>
                    {eval_.conceptExplanations[concept] && (
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                        {eval_.conceptExplanations[concept]}
                      </p>
                    )}
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}
        </>
      )}

      {/* Nudge to write reasoning */}
      {!hasReasoning && (
        <div className="rounded-xl border border-[var(--color-gold-dim)] bg-[oklch(78%_0.16_78/0.06)] px-4 py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            근거를 쓰면 <span className="text-[var(--color-gold)]">항목별 상세 분석</span>을 받을 수 있어요.
          </p>
          <button
            onClick={onReset}
            className="text-xs font-semibold text-[var(--color-gold)] shrink-0 hover:opacity-80 transition-opacity"
          >
            다시 풀기 →
          </button>
        </div>
      )}

      {/* Next actions */}
      <div className="flex gap-3 pt-2">
        <Button variant="secondary" onClick={onReset} className="flex-1">
          다시 풀기
        </Button>
        {nextProblem ? (
          <Link href={`/problems/${nextProblem.slug}`} className="flex-1">
            <Button className="w-full">{nextLabel}</Button>
          </Link>
        ) : (
          <Link href="/problems" className="flex-1">
            <Button className="w-full">문제 목록</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

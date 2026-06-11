'use client'

import { useState } from 'react'
import type { Action, Problem, Submission } from '@/types'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

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
    if (!selectedAction || reasoning.trim().length < 10) return

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
    return <EvaluationDisplay submission={result.submission} problem={problem} />
  }

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
          근거를 설명해주세요
        </label>
        <textarea
          id="reasoning"
          value={reasoning}
          onChange={(e) => setReasoning(e.target.value)}
          placeholder="왜 이 액션을 선택했나요? ICM, 포지션, 상대 레인지, 스택 크기 등을 고려해 설명해주세요. (최소 10자)"
          rows={5}
          className="w-full rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-gold-dim)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] resize-none transition-colors"
        />
        <p className="mt-1 text-xs text-[var(--color-text-muted)] text-right">
          {reasoning.length}/2000자
        </p>
      </div>

      {error && (
        <p className="text-sm text-[var(--color-chip-red)] bg-[oklch(55%_0.22_25/0.1)] border border-[oklch(55%_0.22_25/0.3)] rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={!selectedAction || reasoning.trim().length < 10}
        className="w-full"
        size="lg"
      >
        {loading ? 'AI가 채점 중...' : 'AI 채점 받기'}
      </Button>
    </div>
  )
}

interface EvaluationDisplayProps {
  submission: Submission
  problem: Problem
}

function EvaluationDisplay({ submission, problem }: EvaluationDisplayProps) {
  const eval_ = submission.evaluation!
  const pct = Math.round((eval_.totalScore / eval_.maxScore) * 100)
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
          <div className="text-right">
            <p className="text-sm text-[var(--color-text-muted)] mb-1">선택한 액션</p>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{submission.action}</span>
              <Badge variant={isCorrectAction ? 'green' : 'red'} size="sm">
                {isCorrectAction ? '정답' : '오답'}
              </Badge>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Criteria breakdown */}
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
                  <p className="text-xs text-[var(--color-text-muted)] whitespace-pre-line">{score.feedback}</p>
                )}
              </Card.Body>
            </Card>
          )
        })}
      </div>

      {/* Overall feedback */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
            AI 종합 피드백
          </h3>
        </Card.Header>
        <Card.Body>
          <p className="text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-line">
            {eval_.overallFeedback}
          </p>
        </Card.Body>
      </Card>

      {/* Concepts to learn */}
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

      {/* Model answer */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
            모범 답안
          </h3>
        </Card.Header>
        <Card.Body>
          <div className="text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-line">
            {problem.rubric.modelAnswer}
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

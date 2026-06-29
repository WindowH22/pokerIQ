'use client'

import { useEffect, useState } from 'react'
import type { ActionEvent, PlayerState, Position } from '@/types'

interface PokerTableProps {
  players: PlayerState[]
  heroPosition: Position
  potSize: number
  actionSequence?: ActionEvent[]
  className?: string
}

const POSITION_LABELS: Record<Position, string> = {
  'UTG': 'UTG', 'UTG+1': 'UTG+1', 'UTG+2': 'UTG+2',
  'LJ': 'LJ', 'HJ': 'HJ', 'CO': 'CO',
  'BTN': 'BTN', 'SB': 'SB', 'BB': 'BB',
}

const SEAT_POSITIONS: Record<Position, { top: string; left: string }> = {
  'BTN':   { top: '5%',  left: '64%' },
  'CO':    { top: '5%',  left: '36%' },
  'HJ':    { top: '20%', left: '12%' },
  'LJ':    { top: '50%', left: '3%'  },
  'UTG+2': { top: '72%', left: '15%' },
  'UTG+1': { top: '82%', left: '40%' },
  'UTG':   { top: '82%', left: '60%' },
  'BB':    { top: '72%', left: '82%' },
  'SB':    { top: '50%', left: '93%' },
}

// Landing positions ~35% of the way from each seat toward the pot center
const BET_POSITIONS: Record<Position, { top: string; left: string }> = {
  'BTN':   { top: '21%', left: '59%' },
  'CO':    { top: '21%', left: '41%' },
  'HJ':    { top: '31%', left: '25%' },
  'LJ':    { top: '50%', left: '19%' },
  'UTG+2': { top: '64%', left: '27%' },
  'UTG+1': { top: '71%', left: '44%' },
  'UTG':   { top: '71%', left: '57%' },
  'BB':    { top: '64%', left: '71%' },
  'SB':    { top: '50%', left: '78%' },
}

type ChipColor = 'white' | 'red' | 'green' | 'gold'

const CHIP_STYLE: Record<ChipColor, { bg: string; edge: string }> = {
  white: { bg: '#d8d0c2', edge: 'rgba(0,0,0,0.30)' },
  red:   { bg: '#b03030', edge: 'rgba(255,255,255,0.22)' },
  green: { bg: '#276640', edge: 'rgba(255,255,255,0.22)' },
  gold:  { bg: '#c49a18', edge: 'rgba(0,0,0,0.20)' },
}

function chipColor(action: string, amount?: number): ChipColor {
  if (action === 'ALL_IN') return 'gold'
  if (!amount || amount < 5) return 'white'
  if (amount < 20) return 'red'
  if (amount < 50) return 'green'
  return 'gold'
}

function chipCount(action: string, amount?: number): number {
  if (action === 'ALL_IN') return 5
  if (!amount) return 2
  if (amount >= 20) return 4
  if (amount >= 10) return 3
  return 2
}

function SingleChip({ color, index }: { color: ChipColor; index: number }) {
  const { bg, edge } = CHIP_STYLE[color]
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: bg,
        border: `1.5px solid ${edge}`,
        // Classic poker chip look: concentric rings
        boxShadow: `
          inset 0 0 0 2px rgba(255,255,255,0.16),
          inset 0 0 0 4px ${bg},
          inset 0 0 0 5.5px rgba(255,255,255,0.12),
          0 3px 8px rgba(0,0,0,0.75),
          0 1px 2px rgba(0,0,0,0.5)
        `,
        marginTop: index === 0 ? 0 : -12,
        position: 'relative',
        zIndex: index,
        animationName: 'chipPop',
        animationDuration: '300ms',
        animationTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        animationDelay: `${index * 70}ms`,
        animationFillMode: 'both',
      }}
    />
  )
}

function ChipStack({ event }: { event: ActionEvent }) {
  const isAllIn = event.action === 'ALL_IN'
  const color = chipColor(event.action, event.amount)
  const count = chipCount(event.action, event.amount)
  const pos = BET_POSITIONS[event.position]

  return (
    <div
      style={{
        position: 'absolute',
        top: pos.top,
        left: pos.left,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 15,
        pointerEvents: 'none',
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <SingleChip key={i} color={color} index={i} />
      ))}
      <span
        style={{
          marginTop: 5,
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          lineHeight: 1,
          color: isAllIn ? 'oklch(78% 0.16 78)' : 'rgba(255,255,255,0.55)',
          textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          animationName: 'chipPop',
          animationDuration: '300ms',
          animationTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          animationDelay: `${count * 70}ms`,
          animationFillMode: 'both',
        }}
      >
        {isAllIn ? 'ALL IN' : event.amount != null ? `${event.amount}BB` : event.action}
      </span>
    </div>
  )
}

interface SeatProps {
  player: PlayerState
  isHero: boolean
  label: string
  isFolded: boolean
  isAnimating: boolean
  isCurrent: boolean
}

function Seat({ player, isHero, label, isFolded, isAnimating, isCurrent }: SeatProps) {
  const opacity = isAnimating
    ? (isFolded ? 'opacity-25' : 'opacity-100')
    : (player.isActive ? 'opacity-100' : 'opacity-25')

  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${opacity}`}
      style={{ top: SEAT_POSITIONS[player.position].top, left: SEAT_POSITIONS[player.position].left }}
    >
      <div
        className={[
          'flex flex-col items-center gap-0.5 rounded-xl px-2.5 py-1.5',
          'border text-center transition-all duration-[var(--duration-fast)]',
          isHero
            ? 'bg-[oklch(78%_0.16_78/0.2)] border-[var(--color-gold)] glow-gold'
            : isCurrent
              ? 'bg-[var(--color-surface-raised)] border-[oklch(68%_0.18_250)] ring-1 ring-[oklch(68%_0.18_250/0.4)]'
              : 'bg-[var(--color-surface-raised)] border-[var(--color-surface-border)]',
        ].join(' ')}
        aria-label={`${label}${isHero ? ' (you)' : ''}: ${player.stackBB}BB`}
      >
        <span
          className={`text-[10px] font-bold tracking-wider uppercase ${
            isHero ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-muted)]'
          }`}
        >
          {label}
        </span>
        <span
          className={`text-xs font-semibold tabular-nums ${
            isHero ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'
          }`}
        >
          {player.stackBB}BB
        </span>
        {isFolded && (
          <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] opacity-50">
            FOLD
          </span>
        )}
      </div>
    </div>
  )
}

export function PokerTable({ players, heroPosition, potSize, actionSequence = [], className = '' }: PokerTableProps) {
  const total = actionSequence.length
  const [revealedCount, setRevealedCount] = useState(0)
  const isComplete = total === 0 || revealedCount >= total
  const isAnimating = total > 0 && !isComplete

  useEffect(() => {
    if (isComplete) return
    const delay = revealedCount === 0 ? 400 : 600
    const timer = setTimeout(() => setRevealedCount(c => c + 1), delay)
    return () => clearTimeout(timer)
  }, [revealedCount, isComplete])

  const revealedSteps = actionSequence.slice(0, revealedCount)
  const actionMap = new Map(revealedSteps.map(s => [s.position, s]))
  const currentPosition = (revealedCount > 0 && !isComplete)
    ? actionSequence[revealedCount - 1]?.position
    : null

  const betChips = revealedSteps.filter(s => s.action !== 'FOLD' && s.action !== 'CHECK')

  return (
    <div
      className={`relative isolate w-full aspect-[2/1] max-w-2xl mx-auto ${className}`}
      role="img"
      aria-label="Poker table"
    >
      {/* Felt surface */}
      <div className="absolute inset-4 rounded-[40%] felt-bg border-4 border-[oklch(22%_0.03_145)] shadow-inner" />

      {/* Pot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10">
        <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest">Pot</span>
        <span className="text-[var(--color-gold)] font-bold text-xl tabular-nums">{potSize}BB</span>
      </div>

      {/* Chip stacks for bet actions */}
      {betChips.map(event => (
        <ChipStack key={event.position} event={event} />
      ))}

      {/* Seats */}
      {players.map(player => (
        <Seat
          key={player.position}
          player={player}
          isHero={player.position === heroPosition}
          label={POSITION_LABELS[player.position]}
          isFolded={actionMap.get(player.position)?.action === 'FOLD'}
          isAnimating={isAnimating}
          isCurrent={player.position === currentPosition}
        />
      ))}

      {/* Skip button */}
      {!isComplete && total > 0 && (
        <button
          onClick={() => setRevealedCount(total)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] border border-[var(--color-surface-border)] bg-[var(--color-surface-raised)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors duration-[var(--duration-fast)]"
        >
          Skip
        </button>
      )}
    </div>
  )
}

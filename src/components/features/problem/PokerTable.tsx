'use client'

import type { PlayerState, Position } from '@/types'

interface PokerTableProps {
  players: PlayerState[]
  heroPosition: Position
  potSize: number
  className?: string
}

const POSITION_LABELS: Record<Position, string> = {
  'UTG': 'UTG',
  'UTG+1': 'UTG+1',
  'UTG+2': 'UTG+2',
  'LJ': 'LJ',
  'HJ': 'HJ',
  'CO': 'CO',
  'BTN': 'BTN',
  'SB': 'SB',
  'BB': 'BB',
}

// Clockwise seat positions as percent [top, left] of table
const SEAT_POSITIONS: Record<Position, { top: string; left: string }> = {
  'BTN': { top: '5%',  left: '64%' },
  'CO':  { top: '5%',  left: '36%' },
  'HJ':  { top: '20%', left: '12%' },
  'LJ':  { top: '50%', left: '3%'  },
  'UTG+2': { top: '72%', left: '15%' },
  'UTG+1': { top: '82%', left: '40%' },
  'UTG': { top: '82%', left: '60%' },
  'BB':  { top: '72%', left: '82%' },
  'SB':  { top: '50%', left: '93%' },
}

interface SeatProps {
  player: PlayerState
  isHero: boolean
  label: string
}

function Seat({ player, isHero, label }: SeatProps) {
  const opacity = player.isActive ? 'opacity-100' : 'opacity-35'

  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${opacity}`}
      style={{ top: SEAT_POSITIONS[player.position].top, left: SEAT_POSITIONS[player.position].left }}
    >
      <div
        className={[
          'flex flex-col items-center gap-0.5 rounded-xl px-2.5 py-1.5',
          'border text-center transition-all duration-[var(--duration-fast)]',
          isHero
            ? 'bg-[oklch(78%_0.16_78/0.2)] border-[var(--color-gold)] glow-gold'
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
      </div>
    </div>
  )
}

export function PokerTable({ players, heroPosition, potSize, className = '' }: PokerTableProps) {
  return (
    <div className={`relative w-full aspect-[2/1] max-w-2xl mx-auto ${className}`} role="img" aria-label="Poker table">
      {/* Felt surface */}
      <div className="absolute inset-4 rounded-[40%] felt-bg border-4 border-[oklch(22%_0.03_145)] shadow-inner" />

      {/* Pot display */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10">
        <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest">Pot</span>
        <span className="text-[var(--color-gold)] font-bold text-xl tabular-nums">{potSize}BB</span>
      </div>

      {/* Seats */}
      {players.map((player) => (
        <Seat
          key={player.position}
          player={player}
          isHero={player.position === heroPosition}
          label={POSITION_LABELS[player.position]}
        />
      ))}
    </div>
  )
}

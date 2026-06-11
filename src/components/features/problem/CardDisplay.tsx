import type { Card, Suit } from '@/types'

const SUIT_SYMBOLS: Record<Suit, string> = {
  spade: '♠',
  heart: '♥',
  diamond: '♦',
  club: '♣',
}

const SUIT_COLORS: Record<Suit, string> = {
  spade: 'text-[var(--color-suit-spade)]',
  heart: 'text-[var(--color-suit-heart)]',
  diamond: 'text-[var(--color-suit-diamond)]',
  club: 'text-[var(--color-suit-club)]',
}

interface PlayingCardProps {
  card: Card
  size?: 'sm' | 'md' | 'lg'
  faceDown?: boolean
}

const sizeClasses = {
  sm: 'w-10 h-14 text-base',
  md: 'w-14 h-20 text-xl',
  lg: 'w-20 h-28 text-3xl',
}

export function PlayingCard({ card, size = 'md', faceDown = false }: PlayingCardProps) {
  if (faceDown) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-md flex items-center justify-center bg-[var(--color-chip-blue)] border border-[oklch(52%_0.18_240/0.5)] card-shadow`}
        aria-label="Face-down card"
      >
        <span className="text-[oklch(52%_0.18_240/0.5)] text-2xl">?</span>
      </div>
    )
  }

  const suitColor = SUIT_COLORS[card.suit]
  const symbol = SUIT_SYMBOLS[card.suit]

  return (
    <div
      className={`${sizeClasses[size]} rounded-md relative bg-[oklch(96%_0.01_80)] border border-[oklch(70%_0_0/0.2)] card-shadow flex flex-col justify-between p-1`}
      aria-label={`${card.rank} of ${card.suit}s`}
    >
      <span className={`font-bold leading-none ${suitColor} ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-xl'}`}>
        {card.rank}
        <br />
        <span className="text-xs">{symbol}</span>
      </span>
      <span className={`self-end font-bold leading-none rotate-180 ${suitColor} ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-xl'}`}>
        {card.rank}
        <br />
        <span className="text-xs">{symbol}</span>
      </span>
      <span className={`absolute inset-0 flex items-center justify-center ${suitColor} opacity-20 ${size === 'sm' ? 'text-2xl' : size === 'md' ? 'text-3xl' : 'text-5xl'}`}>
        {symbol}
      </span>
    </div>
  )
}

interface HoleCardsProps {
  cards: Card[]
  size?: 'sm' | 'md' | 'lg'
}

export function HoleCards({ cards, size = 'md' }: HoleCardsProps) {
  return (
    <div className="flex gap-1.5" aria-label="Hero hole cards">
      {cards.map((card, i) => (
        <PlayingCard key={i} card={card} size={size} />
      ))}
    </div>
  )
}

interface BoardCardsProps {
  cards: Card[]
  stage: 'FLOP' | 'TURN' | 'RIVER'
}

export function BoardCards({ cards, stage }: BoardCardsProps) {
  const totalSlots = stage === 'FLOP' ? 3 : stage === 'TURN' ? 4 : 5
  return (
    <div className="flex gap-2 items-center" aria-label="Community cards">
      {Array.from({ length: totalSlots }).map((_, i) => {
        const card = cards[i]
        return card ? (
          <PlayingCard key={i} card={card} size="md" />
        ) : (
          <PlayingCard key={i} card={{ rank: '2', suit: 'spade' }} size="md" faceDown />
        )
      })}
    </div>
  )
}

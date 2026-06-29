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

const SIZE = {
  sm: { container: 'w-10 h-14', corner: 'text-sm', center: 'text-2xl' },
  md: { container: 'w-14 h-20', corner: 'text-base', center: 'text-3xl' },
  lg: { container: 'w-20 h-28', corner: 'text-xl', center: 'text-5xl' },
} as const

type CardSize = keyof typeof SIZE

interface PlayingCardProps {
  card: Card
  size?: CardSize
  faceDown?: boolean
  className?: string
}

export function PlayingCard({ card, size = 'md', faceDown = false, className = '' }: PlayingCardProps) {
  const { container, corner, center } = SIZE[size]

  if (faceDown) {
    return (
      <div
        className={`${container} card-back rounded-md card-shadow flex items-center justify-center ${className}`}
        aria-label="Face-down card"
      >
        <span className="text-[oklch(52%_0.18_240/0.5)] text-2xl">?</span>
      </div>
    )
  }

  const suitColor = SUIT_COLORS[card.suit]
  const symbol = SUIT_SYMBOLS[card.suit]
  const rank = card.rank === 'T' ? '10' : card.rank

  return (
    <div
      className={`${container} card-face rounded-md card-shadow relative flex flex-col justify-between p-1 ${className}`}
      aria-label={`${rank} of ${card.suit}s`}
    >
      <span className={`font-bold leading-none ${suitColor} ${corner}`}>
        {rank}
      </span>
      <span className={`self-end font-bold leading-none rotate-180 ${suitColor} ${corner}`}>
        {rank}
        <br />
      </span>
      <span className={`absolute inset-0 flex items-center justify-center ${suitColor}  ${center}`}>
        {symbol}
      </span>
    </div>
  )
}

export function MysteryCard({ size = 'md', className = '' }: { size?: CardSize; className?: string }) {
  const { container } = SIZE[size]
  return (
    <div
      className={`${container} card-mystery rounded-md card-shadow flex items-center justify-center text-[var(--color-text-muted)] font-bold ${className}`}
      aria-label="Unknown card"
    >
      <span className="text-xl">?</span>
    </div>
  )
}

interface HoleCardsProps {
  cards: Card[]
  size?: CardSize
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

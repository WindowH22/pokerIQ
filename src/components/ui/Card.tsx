interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function Card({ children, className = '', hover = false, glow = false }: CardProps) {
  return (
    <div
      className={[
        'rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface-raised)]',
        'card-shadow',
        hover && 'transition-all duration-[var(--duration-normal)] hover:border-[var(--color-gold-dim)] hover:-translate-y-0.5',
        glow && 'glow-gold',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}

interface CardSectionProps {
  children: React.ReactNode
  className?: string
}

Card.Header = function CardHeader({ children, className = '' }: CardSectionProps) {
  return (
    <div className={`border-b border-[var(--color-surface-border)] p-5 ${className}`}>
      {children}
    </div>
  )
}

Card.Body = function CardBody({ children, className = '' }: CardSectionProps) {
  return <div className={`p-5 ${className}`}>{children}</div>
}

Card.Footer = function CardFooter({ children, className = '' }: CardSectionProps) {
  return (
    <div className={`border-t border-[var(--color-surface-border)] p-5 ${className}`}>
      {children}
    </div>
  )
}

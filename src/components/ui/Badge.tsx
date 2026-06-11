interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'red' | 'blue' | 'muted' | 'green'
  size?: 'sm' | 'md'
  className?: string
}

const variantClasses = {
  gold: 'bg-[oklch(78%_0.16_78/0.15)] text-[var(--color-gold)] border border-[oklch(78%_0.16_78/0.3)]',
  red: 'bg-[oklch(55%_0.22_25/0.15)] text-[var(--color-chip-red)] border border-[oklch(55%_0.22_25/0.3)]',
  blue: 'bg-[oklch(52%_0.18_240/0.15)] text-[var(--color-chip-blue)] border border-[oklch(52%_0.18_240/0.3)]',
  muted: 'bg-[var(--color-surface-raised)] text-[var(--color-text-muted)] border border-[var(--color-surface-border)]',
  green: 'bg-[oklch(65%_0.18_145/0.15)] text-[oklch(70%_0.18_145)] border border-[oklch(65%_0.18_145/0.3)]',
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs rounded',
  md: 'px-3 py-1 text-sm rounded-md',
}

export function Badge({ children, variant = 'muted', size = 'md', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  )
}

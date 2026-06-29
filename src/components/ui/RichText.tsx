import type { ReactNode } from 'react'

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-[var(--color-text-primary)] font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

export function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/)

  return (
    <div className="space-y-3">
      {blocks.map((block, blockIdx) => {
        const trimmed = block.trim()
        if (!trimmed) return null

        const lines = trimmed.split('\n')
        const bulletLines = lines.filter((l) => l.trim().startsWith('-'))

        if (bulletLines.length > 0 && bulletLines.length === lines.filter((l) => l.trim()).length) {
          return (
            <ul key={blockIdx} className="space-y-1.5 pl-0">
              {bulletLines.map((item, i) => (
                <li key={i} className="flex gap-2.5 text-[var(--color-text-muted)] text-sm">
                  <span className="text-[var(--color-gold)] shrink-0 mt-0.5">▸</span>
                  <span>{renderInline(item.replace(/^-\s*/, ''))}</span>
                </li>
              ))}
            </ul>
          )
        }

        const hasBoldHeader = lines[0].startsWith('**') && lines.length > 1
        if (hasBoldHeader) {
          return (
            <div key={blockIdx} className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
                {renderInline(lines[0])}
              </p>
              {lines.slice(1).map((line, j) => {
                if (line.trim().startsWith('-')) {
                  return (
                    <div key={j} className="flex gap-2.5 text-sm text-[var(--color-text-muted)]">
                      <span className="text-[var(--color-gold)] shrink-0 mt-0.5">▸</span>
                      <span>{renderInline(line.replace(/^-\s*/, ''))}</span>
                    </div>
                  )
                }
                return (
                  <p key={j} className="text-sm text-[var(--color-text-muted)]">
                    {renderInline(line)}
                  </p>
                )
              })}
            </div>
          )
        }

        return (
          <p key={blockIdx} className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {lines.map((line, lineIdx) => (
              <span key={lineIdx}>
                {renderInline(line)}
                {lineIdx < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        )
      })}
    </div>
  )
}

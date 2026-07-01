import type { ReactNode } from 'react'

const ENTRIES: [string[], string][] = [
  [['폴드 에퀴티', 'Fold Equity', 'fold equity'], '베팅/레이즈로 상대를 폴드하게 만들어 얻는 추가적인 기대 가치'],
  [['임플라이드 오즈', 'Implied Odds', 'implied odds'], '현재 팟 오즈는 맞지 않더라도 히트 시 추가로 얻을 칩을 고려한 수익성 지표'],
  [['버블 팩터', 'Bubble Factor', 'bubble factor'], '버블 상황에서 칩을 잃는 것이 얼마나 더 고통스러운지를 나타내는 계수'],
  [['컨티뉴에이션 벳', 'Continuation Bet', 'continuation bet', 'C-Bet', 'c-bet', 'C-벳'], '프리플랍 어그레서가 플랍에서도 계속 베팅하는 전략'],
  [['푸시/폴드', 'Push/Fold', 'push/fold'], '숏스택(15BB 미만)에서 올인 또는 폴드만 선택하는 전략'],
  [['팟 오즈', 'Pot Odds', 'pot odds'], '콜에 필요한 금액 대비 현재 팟 크기의 비율'],
  [['에퀴티', 'Equity', 'equity'], '현재 핸드가 쇼다운까지 갔을 때 팟을 이길 확률 (0~100%)'],
  [['레인지', 'Range', 'range'], '특정 상황에서 플레이어가 가질 수 있는 모든 가능한 핸드의 집합'],
  [['3-벳', '3-Bet', '3-bet'], '오픈레이즈(2-벳)에 대한 리레이즈 — 밸류 또는 블러프 목적으로 사용'],
  [['ICM'], '토너먼트 칩을 실제 상금 가치로 환산하는 수학 모델'],
  [['GTO'], '어떤 상대도 착취할 수 없는 수학적으로 균형잡힌 전략'],
  [['SPR'], '이펙티브 스택을 플랍 시점 팟으로 나눈 값 — 포스트플랍 전략의 기준점'],
]

const GLOSSARY_MAP: Record<string, string> = {}
for (const [aliases, description] of ENTRIES) {
  for (const alias of aliases) {
    GLOSSARY_MAP[alias.toLowerCase()] = description
  }
}

function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const sortedPatterns = Object.keys(GLOSSARY_MAP).sort((a, b) => b.length - a.length)
const GLOSSARY_REGEX = new RegExp(`(${sortedPatterns.map(escape).join('|')})`, 'gi')

export function annotateGlossary(text: string, keyPrefix: string | number): ReactNode[] {
  const parts = text.split(GLOSSARY_REGEX)
  return parts.map((part, i) => {
    if (i % 2 === 0) return part || null
    const desc = GLOSSARY_MAP[part.toLowerCase()]
    if (!desc) return part
    return (
      <span key={`${keyPrefix}-g${i}`} className="group/gloss relative inline">
        <span className="border-b border-dotted border-[var(--color-gold)] cursor-help">{part}</span>
        <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-max max-w-[11rem] rounded-lg border border-[oklch(60%_0.12_78/0.25)] bg-[var(--color-surface-raised)] px-2.5 py-1.5 text-xs opacity-0 shadow-lg transition-opacity duration-150 group-hover/gloss:opacity-100 z-50">
          <span className="mb-0.5 block font-semibold text-[var(--color-gold)]">{part}</span>
          <span className="text-[var(--color-text-muted)]">{desc}</span>
        </span>
      </span>
    )
  })
}

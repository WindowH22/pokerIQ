import type { Problem } from '@/types'

const D = '2024-01-01T00:00:00.000Z'

export const ICM_PROBLEMS: Problem[] = [
  {
    id: 'prob-019', slug: 'bubble-medium-stack-fold-vs-chipleader',
    title: '버블: 칩 리더 스틸에 A8o 3벳 대응',
    description: `MTT, 10명 남음, 9명 입상. 버블 상황입니다.

**상황:** HJ 20BB(히어로), CO 칩 리더 60BB가 오픈(2.5BB). BTN/SB/BB 각각 8~15BB 숏스택

A8o로 3벳 올인하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'HJ',
      players: [
        { position: 'UTG', stackBB: 30, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 25, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 12, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 22, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 20, isHero: true, isActive: true },
        { position: 'CO', stackBB: 60, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 8, isHero: false, isActive: true },
        { position: 'SB', stackBB: 10, isHero: false, isActive: true },
        { position: 'BB', stackBB: 15, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'heart' }, { rank: '8', suit: 'diamond' }],
      potSize: 5.5, stage: 'PREFLOP', tournamentStage: 'BUBBLE', totalChips: 202,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'CO', action: 'RAISE', amount: 5 },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'icm', name: 'ICM', nameKo: 'ICM 이해', maxScore: 50,
          checklistItems: ['버블에서 ICM 압박을 이해했다', '칩 리더 vs 미디엄 스택의 리스크를 언급했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['A8o 에퀴티만으로 판단이 불가함을 언급했다', '숏스택 3명 탈락을 기다리는 전략을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — 버블에서 미디엄 스택은 ICM 위험이 최대입니다. A8o가 칩 리더 콜링 레인지(AQ+, KK+) 대비 약 35% 에퀴티뿐이고, 탈락하면 입상에 실패합니다. 3명의 숏스택이 먼저 탈락할 가능성이 높으므로 기다리는 것이 +ICM EV입니다.`,
      keyConceptTags: ['ICM', 'Bubble', 'StackPreservation'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-020', slug: 'sng-bubble-4players-aa-vs-chipleader',
    title: 'SNG 버블, AA로 칩 리더 올인에 콜',
    description: `4인 SNG, 3명 입상. 버블 상황입니다.

**상황:** CO 15BB(히어로), BTN 칩 리더(40BB)가 올인. SB 8BB / BB 12BB 아직 남음

AA로 어떤 액션을 취하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 0, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 0, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 0, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'CO', stackBB: 15, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 40, isHero: false, isActive: true },
        { position: 'SB', stackBB: 8, isHero: false, isActive: true },
        { position: 'BB', stackBB: 12, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'spade' }, { rank: 'A', suit: 'club' }],
      potSize: 42, stage: 'PREFLOP', tournamentStage: 'BUBBLE', totalChips: 75,
      payoutStructure: [{ place: 1, amount: 40 }, { place: 2, amount: 25 }, { place: 3, amount: 15 }],
      actionSequence: [{ position: 'BTN', action: 'ALL_IN', amount: 40 }],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['콜을 선택했다', 'AA는 ICM에서도 콜임을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['AA의 압도적 에퀴티를 언급했다', 'SB/BB 숏스택 존재로 리스크가 줄어듦을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — AA는 버블에서도 예외입니다. 칩 리더 올인 레인지 대비 80%+ 에퀴티이며, SB(8BB)/BB(12BB) 숏스택이 먼저 버스트될 가능성이 있어 ICM 손실이 제한됩니다. 폴드하면 10BB 손실로 오히려 취약해집니다.`,
      keyConceptTags: ['ICM', 'Bubble', 'PremiumHand'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-021', slug: 'mtt-bubble-medium-fold-shortstack-allin',
    title: 'MTT 버블: 숏스택 올인에 99 콜?',
    description: `MTT, 11명 남음, 10명 입상. 버블 상황입니다.

**상황:** CO 22BB(히어로), UTG 6BB 숏스택이 올인. BTN/SB/BB는 각각 25~40BB

99로 어떤 액션을 취하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 6, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 30, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 25, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 18, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 22, isHero: false, isActive: false },
        { position: 'CO', stackBB: 22, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 40, isHero: false, isActive: true },
        { position: 'SB', stackBB: 28, isHero: false, isActive: true },
        { position: 'BB', stackBB: 25, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '9', suit: 'diamond' }, { rank: '9', suit: 'club' }],
      potSize: 8.5, stage: 'PREFLOP', tournamentStage: 'BUBBLE', totalChips: 216,
      actionSequence: [
        { position: 'UTG', action: 'ALL_IN', amount: 6 },
        { position: 'UTG+1', action: 'FOLD' }, { position: 'UTG+2', action: 'FOLD' },
        { position: 'LJ', action: 'FOLD' }, { position: 'HJ', action: 'FOLD' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'icm', name: 'ICM', nameKo: 'ICM 이해', maxScore: 50,
          checklistItems: ['버블에서 숏스택 콜의 ICM 코스트를 이해했다', '입상 기대값(EV) 계산을 언급했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['UTG 숏스택 올인 레인지 대비 99 에퀴티를 언급했다', 'BTN/SB/BB 3명이 뒤에 있음을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — 버블에서 22BB 미디엄 스택은 최대 ICM 위험을 감수하면 안 됩니다. 99가 UTG 숏스택 레인지(TT+, AJ+) 대비 약 42% 에퀴티이며, 뒤의 3명이 스퀴즈할 가능성도 있습니다. 입상 확보가 칩 획득보다 우선입니다.`,
      keyConceptTags: ['ICM', 'Bubble', 'MediumStack'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-022', slug: 'sng-bubble-calloff-shortstack-kjo',
    title: 'SNG 버블: 숏스택 5BB 올인에 KJo 콜',
    description: `4인 SNG, 3명 입상. CO 15BB(히어로), UTG 5BB 올인.

**상황:** BB 12BB, BTN은 이미 폴드. KJo로 콜하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 5, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 0, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 0, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'CO', stackBB: 15, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 43, isHero: false, isActive: false },
        { position: 'SB', stackBB: 0, isHero: false, isActive: false },
        { position: 'BB', stackBB: 12, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'spade' }, { rank: 'J', suit: 'heart' }],
      potSize: 7.5, stage: 'PREFLOP', tournamentStage: 'BUBBLE', totalChips: 75,
      payoutStructure: [{ place: 1, amount: 40 }, { place: 2, amount: 25 }, { place: 3, amount: 15 }],
      actionSequence: [
        { position: 'UTG', action: 'ALL_IN', amount: 5 },
        { position: 'BTN', action: 'FOLD' },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['콜을 선택했다', '5BB 숏스택 콜의 리스크가 낮음을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['KJo가 숏스택 올인 레인지 대비 충분한 에퀴티를 언급했다', 'ICM 리스크 대비 이익을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — 5BB 숏스택 올인은 ICM 리스크가 낮습니다. KJo가 UTG 숏스택 레인지(AX, 중급 페어) 대비 약 45-50% 에퀴티를 보유합니다. 콜 금액(4BB)이 작고, 버스트 시에도 BB(12BB) 대비 충분한 스택을 유지합니다.`,
      keyConceptTags: ['ICM', 'Bubble', 'ShortStackCall'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-023', slug: 'final-table-5-chipleader-qq-fold',
    title: '파이널 테이블 5인: QQ로 칩 리더 압박에 대응',
    description: `파이널 테이블 5인, 5명 모두 입상. BTN 칩 리더(80BB)가 2.5BB 오픈, 히어로 SB 25BB.

**상황:** SB 25BB, QQ(♠Q ♦Q), BB 15BB / 나머지 2명 12~18BB

3벳 올인하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 18, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 12, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 0, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'CO', stackBB: 0, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 80, isHero: false, isActive: true },
        { position: 'SB', stackBB: 25, isHero: true, isActive: true },
        { position: 'BB', stackBB: 15, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'Q', suit: 'spade' }, { rank: 'Q', suit: 'diamond' }],
      potSize: 8, stage: 'PREFLOP', tournamentStage: 'FINAL_TABLE', totalChips: 150,
      payoutStructure: [
        { place: 1, amount: 5000 }, { place: 2, amount: 3000 },
        { place: 3, amount: 2000 }, { place: 4, amount: 1500 }, { place: 5, amount: 1000 },
      ],
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'BTN', action: 'RAISE', amount: 5 },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['3벳을 선택했다(올인 또는 표준 3벳)', 'QQ를 올인 레인지에 포함시켰다'] },
        { id: 'icm', name: 'ICM', nameKo: 'ICM 고려', maxScore: 60,
          checklistItems: ['5명 모두 입상 구조에서 ICM 압박이 낮음을 언급했다', '칩 리더 스틸 레인지 대비 QQ 에퀴티를 언급했다'] },
      ],
      modelAnswer: `**정답: 3벳(올인 또는 13BB 3벳)** — 5명 전원 입상 구조에서 ICM 압박이 상대적으로 낮습니다. QQ는 BTN 칩 리더 오픈 레인지 대비 약 75% 에퀴티를 보유하며, 폴드는 지나치게 소극적입니다. 3벳 올인이 최선입니다.`,
      keyConceptTags: ['ICM', 'FinalTable', 'ChipLeaderPressure'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-024', slug: 'itm-steal-btneager-steal',
    title: 'ITM 미들 스테이지: BTN 스틸 적극 공격',
    description: `MTT 입상 후, 15명 남음, 다음 상금 점프까지 5명. BTN 차례.

**상황:** BTN 30BB(히어로), UTG~CO 모두 폴드. K7o 보유. SB 18BB / BB 22BB

공격적으로 레이즈하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 25, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 20, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 35, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 18, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 28, isHero: false, isActive: false },
        { position: 'CO', stackBB: 22, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 30, isHero: true, isActive: true },
        { position: 'SB', stackBB: 18, isHero: false, isActive: true },
        { position: 'BB', stackBB: 22, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'spade' }, { rank: '7', suit: 'diamond' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'ITM', totalChips: 218,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['레이즈를 선택했다', 'ITM에서도 적극적인 플레이가 필요함을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['BTN에서 K7o 오픈이 표준임을 언급했다', 'ITM 이후 공격성 유지의 중요성을 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈** — ITM 이후에도 스택을 키워야 합니다. BTN에서 K7o는 표준 오픈 레인지에 포함됩니다. SB/BB가 숏스택이라 폴드 에퀴티가 크며, 30BB 스택은 공격적 플레이를 허용합니다.`,
      keyConceptTags: ['ICM', 'ITM', 'StealPosition'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-025', slug: 'bubble-two-shortstacks-medium-tight',
    title: '버블: 두 숏스택 앞에서 JTo 폴드',
    description: `MTT, 12명 남음, 10명 입상. HJ 22BB(히어로). UTG 7BB 및 BB 5BB 숏스택.

**상황:** HJ, JTo 보유. UTG 7BB 올인, UTG+1~LJ 폴드. 뒤에 CO~BB 남음

콜하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'HJ',
      players: [
        { position: 'UTG', stackBB: 7, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 25, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 30, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 20, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 22, isHero: true, isActive: true },
        { position: 'CO', stackBB: 28, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 35, isHero: false, isActive: true },
        { position: 'SB', stackBB: 18, isHero: false, isActive: true },
        { position: 'BB', stackBB: 5, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'J', suit: 'heart' }, { rank: 'T', suit: 'spade' }],
      potSize: 9.5, stage: 'PREFLOP', tournamentStage: 'BUBBLE', totalChips: 190,
      actionSequence: [
        { position: 'UTG', action: 'ALL_IN', amount: 7 },
        { position: 'UTG+1', action: 'FOLD' }, { position: 'UTG+2', action: 'FOLD' },
        { position: 'LJ', action: 'FOLD' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'icm', name: 'ICM', nameKo: 'ICM 이해', maxScore: 50,
          checklistItems: ['두 숏스택(UTG, BB)의 버스트 가능성을 언급했다', 'ICM 이익 극대화 전략을 언급했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['JTo가 UTG 올인 레인지 대비 취약함을 언급했다', '뒤의 콜드콜 가능성을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — UTG 7BB 올인 레인지(77+, ATo+)에 JTo는 불리하고(약 35% 에퀴티), BB(5BB)도 버스트 직전입니다. 두 숏스택 중 하나가 먼저 탈락하면 입상 확률이 크게 오르므로 기다리는 것이 +ICM EV입니다.`,
      keyConceptTags: ['ICM', 'Bubble', 'TwoShortStacks'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-026', slug: 'final-table-3players-semibluff',
    title: '파이널 테이블 3인: 플러시 드로우로 반블러프',
    description: `파이널 테이블 3인, 3명 모두 입상. BB 히어로 30BB.

**상황:** 플롭 K♠8♦3♠, 히어로 A♠5♠(넛 플러시 드로우). SB(칩 리더 50BB)가 하프팟 배팅(12BB)

레이즈하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 0, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 0, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 0, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'CO', stackBB: 0, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 0, isHero: false, isActive: false },
        { position: 'SB', stackBB: 50, isHero: false, isActive: true },
        { position: 'BB', stackBB: 30, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'spade' }, { rank: '5', suit: 'spade' }],
      boardCards: [{ rank: 'K', suit: 'spade' }, { rank: '8', suit: 'diamond' }, { rank: '3', suit: 'spade' }],
      potSize: 28, stage: 'FLOP', tournamentStage: 'FINAL_TABLE', totalChips: 80,
      payoutStructure: [{ place: 1, amount: 5000 }, { place: 2, amount: 3000 }, { place: 3, amount: 1500 }],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['레이즈를 선택했다', '3인 파이널 테이블에서 더 공격적인 전략이 필요함을 이해했다'] },
        { id: 'equity', name: 'Equity', nameKo: '에퀴티 계산', maxScore: 60,
          checklistItems: ['넛 플러시 드로우(9 아웃)의 에퀴티를 언급했다', '반블러프 레이즈의 가치를 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈** — 3인 파이널 테이블은 모두 입상하므로 ICM 압박이 적습니다. 넛 플러시 드로우(9 아웃)로 약 36% 에퀴티를 보유하며, 반블러프 레이즈로 즉시 폴드를 유도하거나 드로우 완성 기회를 얻습니다.`,
      keyConceptTags: ['ICM', 'FinalTable', 'SemiBluff', 'FlushDraw'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-027', slug: 'satellite-bubble-chip-fold-aks',
    title: '위성 토너먼트 버블: AKs 전략적 폴드',
    description: `WSOP 위성 토너먼트, 상위 2명 본선 진출. 3명 남음.

**상황:** BB 25BB(히어로), BTN 30BB가 올인. SB 20BB. AKs 보유

콜하시겠습니까?`,
    difficulty: 'EXPERT', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 0, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 0, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 0, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'CO', stackBB: 0, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 30, isHero: false, isActive: true },
        { position: 'SB', stackBB: 20, isHero: false, isActive: true },
        { position: 'BB', stackBB: 25, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'club' }, { rank: 'K', suit: 'club' }],
      potSize: 32, stage: 'PREFLOP', tournamentStage: 'BUBBLE', totalChips: 75,
      payoutStructure: [{ place: 1, amount: 10000 }, { place: 2, amount: 10000 }, { place: 3, amount: 0 }],
      actionSequence: [
        { position: 'BTN', action: 'ALL_IN', amount: 30 }, { position: 'SB', action: 'FOLD' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'satellite', name: 'Satellite ICM', nameKo: '위성 토너먼트 ICM', maxScore: 60,
          checklistItems: ['위성에서는 입상이 전부(칩 가치=일정)임을 이해했다', '3명 중 2명 진출 구조에서 폴드가 최선임을 언급했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 40,
          checklistItems: ['AKs 에퀴티(65%)가 있어도 ICM 손실이 크다고 언급했다', 'SB가 먼저 버스트할 수 있음을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — 위성 토너먼트에서 1위와 2위의 상금이 동일하므로 칩 리더십 가치가 없습니다. SB(20BB)를 상대로 기다리면 자연스럽게 입상 가능합니다. AKs 에퀴티(65%)가 있어도 탈락 리스크를 감수할 이유가 없습니다.`,
      keyConceptTags: ['ICM', 'Satellite', 'Bubble', 'ChipValueZero'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-028', slug: 'bubble-chipleader-steal-wide',
    title: '버블: 칩 리더의 공격적 스틸',
    description: `MTT, 11명 남음, 10명 입상. BTN 칩 리더(히어로) 65BB.

**상황:** BTN 65BB, K4o(♣K ♦4). UTG~CO 폴드. SB 8BB / BB 6BB 숏스택

공격적으로 레이즈하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 22, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 18, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 25, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 30, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 20, isHero: false, isActive: false },
        { position: 'CO', stackBB: 16, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 65, isHero: true, isActive: true },
        { position: 'SB', stackBB: 8, isHero: false, isActive: true },
        { position: 'BB', stackBB: 6, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'club' }, { rank: '4', suit: 'diamond' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'BUBBLE', totalChips: 210,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['레이즈를 선택했다', '칩 리더의 버블 공격성을 이해했다'] },
        { id: 'icm', name: 'ICM', nameKo: 'ICM 이해', maxScore: 60,
          checklistItems: ['SB/BB 숏스택의 ICM 압박을 언급했다', '칩 리더에게 ICM 손실 리스크가 적음을 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈** — 칩 리더는 버블에서 ICM 무적에 가깝습니다. SB(8BB)/BB(6BB) 숏스택은 올인할 이유가 없으므로 폴드 에퀴티가 큽니다. K4o라도 BTN에서 레이즈는 +EV입니다.`,
      keyConceptTags: ['ICM', 'Bubble', 'ChipLeader', 'BubbleBully'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-029', slug: 'icm-suicide-medium-vs-chipleader',
    title: 'ICM 자살: 칩 리더 올인에 KQo 판단',
    description: `MTT 버블, 10명 남음, 9명 입상. HJ 미디엄 스택 22BB(히어로).

**상황:** HJ 22BB, KQo. BTN 칩 리더(55BB)가 올인. SB 8BB / BB 12BB 숏스택

콜하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'HJ',
      players: [
        { position: 'UTG', stackBB: 18, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 25, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 20, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 15, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 22, isHero: true, isActive: true },
        { position: 'CO', stackBB: 30, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 55, isHero: false, isActive: true },
        { position: 'SB', stackBB: 8, isHero: false, isActive: true },
        { position: 'BB', stackBB: 12, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'diamond' }, { rank: 'Q', suit: 'heart' }],
      potSize: 58, stage: 'PREFLOP', tournamentStage: 'BUBBLE', totalChips: 205,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'CO', action: 'FOLD' }, { position: 'BTN', action: 'ALL_IN', amount: 55 },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'icm', name: 'ICM', nameKo: 'ICM 이해', maxScore: 60,
          checklistItems: ['ICM 자살(Chip Leader vs Medium Stack) 개념을 이해했다', '탈락 시 입상 실패 손실을 언급했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 40,
          checklistItems: ['KQo가 칩 리더 올인 레인지 대비 불리함을 언급했다', '숏스택 버스트 대기 전략을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — 이것이 'ICM 자살'입니다. KQo는 칩 리더 올인 레인지(TT+, AK) 대비 약 40% 에퀴티이며, 탈락하면 입상 실패입니다. SB(8BB)/BB(12BB) 두 숏스택이 있으므로 기다리면 입상 확률이 높아집니다.`,
      keyConceptTags: ['ICM', 'Bubble', 'ICMSuicide', 'MediumStack'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-030', slug: 'itm-pay-jump-fold-kq',
    title: 'ITM 상금 점프 직전: KQs 3벳에 폴드',
    description: `MTT ITM, 20명 남음, 다음 상금 점프까지 5명 탈락 필요. CO 히어로 30BB.

**상황:** CO 30BB, KQs. UTG+1(25BB)이 오픈(2.5BB), HJ(22BB)가 3벳(7BB). BTN~BB 폴드

콜 또는 3벳 올인하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 28, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 25, isHero: false, isActive: true },
        { position: 'UTG+2', stackBB: 15, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 20, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 22, isHero: false, isActive: true },
        { position: 'CO', stackBB: 30, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 18, isHero: false, isActive: false },
        { position: 'SB', stackBB: 35, isHero: false, isActive: false },
        { position: 'BB', stackBB: 25, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: 'K', suit: 'club' }, { rank: 'Q', suit: 'club' }],
      potSize: 16.5, stage: 'PREFLOP', tournamentStage: 'ITM', totalChips: 218,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'RAISE', amount: 5 },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'RAISE', amount: 14 },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'icm', name: 'ICM', nameKo: 'ICM 이해', maxScore: 50,
          checklistItems: ['상금 점프 직전 ICM 압박을 이해했다', '3벳 팟에서 KQs 에퀴티의 한계를 언급했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['오픈+3벳 범위에 KQs가 불리함을 언급했다', '상금 점프 전략적 의미를 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — UTG+1 오픈 + HJ 3벳 구도에서 KQs는 약 35% 에퀴티를 보유합니다. 상금 점프 직전 ICM 가치가 높으므로 스택 보호가 우선입니다. 콜/4벳은 모두 -ICM EV입니다.`,
      keyConceptTags: ['ICM', 'PayJump', 'StackPreservation', 'ITM'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-031', slug: 'shortstack-bubble-auto-push',
    title: '버블 숏스택: 자동 올인 상황',
    description: `MTT, 11명 남음, 10명 입상. SB 히어로 4BB. UTG~BTN 폴드.

**상황:** SB 4BB, J5o(♥J ♦5). BB 35BB. 다음 핸드면 블라인드가 됩니다

폴드하시겠습니까, 올인하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 22, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 28, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 15, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 20, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 25, isHero: false, isActive: false },
        { position: 'CO', stackBB: 30, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 18, isHero: false, isActive: false },
        { position: 'SB', stackBB: 4, isHero: true, isActive: true },
        { position: 'BB', stackBB: 35, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'J', suit: 'heart' }, { rank: '5', suit: 'diamond' }],
      potSize: 6, stage: 'PREFLOP', tournamentStage: 'BUBBLE', totalChips: 197,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
        { position: 'BTN', action: 'FOLD' },
      ],
    },
    correctAction: 'ALL_IN',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['올인을 선택했다', '4BB에서 기다리는 것이 무의미함을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['4BB 숏스택은 어떤 핸드로도 올인이 최선임을 언급했다', 'J5o도 BB 레인지 대비 40%+ 에퀴티를 언급했다'] },
      ],
      modelAnswer: `**정답: 올인** — 4BB SB에서는 어떤 핸드도 올인이 최선입니다. 폴드하면 3BB가 되어 BB에서 다시 포스트해야 합니다. J5o도 BB의 넓은 콜링 레인지 대비 40% 에퀴티를 보유합니다.`,
      keyConceptTags: ['ICM', 'Bubble', 'Desperate', 'ShortStack'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-032', slug: 'final-table-3players-aggressive-steal',
    title: '파이널 테이블 3인: 공격적 스틸 유지',
    description: `파이널 테이블 3인, 3명 모두 입상. BTN 히어로 40BB.

**상황:** BTN 40BB, Q6s(♣Q ♣6). SB 30BB / BB 30BB. 칩 스택이 거의 균등합니다

레이즈하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 0, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 0, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 0, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'CO', stackBB: 0, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 40, isHero: true, isActive: true },
        { position: 'SB', stackBB: 30, isHero: false, isActive: true },
        { position: 'BB', stackBB: 30, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'Q', suit: 'club' }, { rank: '6', suit: 'club' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'FINAL_TABLE', totalChips: 100,
      payoutStructure: [{ place: 1, amount: 5000 }, { place: 2, amount: 3000 }, { place: 3, amount: 1500 }],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['레이즈를 선택했다', '3인 파이널 테이블에서 공격성의 중요성을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['모두 입상한 상황에서 칩 획득이 목표임을 언급했다', 'Q6s가 3인 레이즈 레인지에 포함됨을 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈** — 3인 모두 입상이므로 ICM 압박이 사라집니다. 이제 최대한 칩을 획득해 1위를 노려야 합니다. Q6s(수이티드)는 3인 BTN 오픈 레인지에 포함되며, 공격적인 플레이가 장기적으로 +EV입니다.`,
      keyConceptTags: ['ICM', 'FinalTable', 'HeadsUpPlay', 'Aggression'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-033', slug: 'final-table-first-vs-others-huge-jump',
    title: '파이널 테이블: 1위 상금 점프로 공격 전략',
    description: `파이널 테이블 3인. 히어로 칩 리더 60BB. SB 25BB가 올인, BB 15BB 폴드.

**상황:** BB 히어로 60BB, TT 보유. SB 25BB 올인(1위 2배, 2위 1.2배, 3위 1배 구조)

콜하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 0, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 0, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 0, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 0, isHero: false, isActive: false },
        { position: 'CO', stackBB: 0, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 0, isHero: false, isActive: false },
        { position: 'SB', stackBB: 25, isHero: false, isActive: true },
        { position: 'BB', stackBB: 60, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'T', suit: 'heart' }, { rank: 'T', suit: 'diamond' }],
      potSize: 52, stage: 'PREFLOP', tournamentStage: 'FINAL_TABLE', totalChips: 100,
      payoutStructure: [{ place: 1, amount: 10000 }, { place: 2, amount: 6000 }, { place: 3, amount: 4000 }],
      actionSequence: [{ position: 'SB', action: 'ALL_IN', amount: 25 }],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'icm', name: 'ICM', nameKo: 'ICM 이해', maxScore: 50,
          checklistItems: ['1위와 2위 상금 차이를 고려했다', '3인 파이널 테이블 ICM을 올바르게 계산했다'] },
        { id: 'equity', name: 'Equity', nameKo: '에퀴티', maxScore: 50,
          checklistItems: ['TT가 SB 올인 레인지 대비 60%+ 에퀴티를 언급했다', '칩 리더로서 ICM 손실이 제한적임을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — 3인에서 1위 상금이 2위보다 67% 더 많습니다. TT는 SB 올인 레인지 대비 약 65% 에퀴티를 보유합니다. 60BB 칩 리더로서 25BB 콜은 ICM 손실이 제한적이고, 이길 경우 3인→2인으로 상금 점프까지 가능합니다.`,
      keyConceptTags: ['ICM', 'FinalTable', 'ChipLeader', 'PayJump'],
    },
    publishedAt: D, createdAt: D,
  },
]

import type { Problem } from '@/types'

const D = '2024-01-01T00:00:00.000Z'

export const PUSH_FOLD_PROBLEMS: Problem[] = [
  {
    id: 'prob-004', slug: 'sb-12bb-k8s-vs-bb',
    title: 'SB 12BB K8s 헤즈업 푸시 결정',
    description: `미들 스테이지. UTG~BTN 모두 폴드, SB 차례입니다.

**상황:** SB 12BB, K8s(♠K ♠8), BB 30BB

BB와 단둘이 남은 상황입니다. 어떤 액션을 취하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 25, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 22, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 30, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 18, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 35, isHero: false, isActive: false },
        { position: 'CO', stackBB: 20, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 28, isHero: false, isActive: false },
        { position: 'SB', stackBB: 12, isHero: true, isActive: true },
        { position: 'BB', stackBB: 30, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'spade' }, { rank: '8', suit: 'spade' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 220,
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
          checklistItems: ['올인을 선택했다', '12BB SB에서 푸시가 적절함을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['K8s가 SB 12BB 푸시 레인지에 포함됨을 언급했다', '폴드 에퀴티를 언급했다'] },
      ],
      modelAnswer: `**정답: 올인** — 12BB SB에서 K8s(수이티드)는 Nash 균형 기준 ~50% SB 푸시 레인지에 포함됩니다. BB 콜링 레인지 대비 약 52% 에퀴티를 보유하며, 폴드 에퀴티까지 더하면 +EV 올인입니다.`,
      keyConceptTags: ['PushFold', 'FoldEquity', 'Position'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-005', slug: 'co-8bb-ajo-pushfold',
    title: 'CO 8BB AJo 올인 결정',
    description: `미들 스테이지. UTG~HJ 모두 폴드, CO 차례입니다.

**상황:** CO 8BB, AJo(♥A ♦J), BTN 25BB / SB 18BB / BB 32BB

스택이 짧습니다. 어떤 액션을 취하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 30, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 20, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 24, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 28, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 22, isHero: false, isActive: false },
        { position: 'CO', stackBB: 8, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 25, isHero: false, isActive: true },
        { position: 'SB', stackBB: 18, isHero: false, isActive: true },
        { position: 'BB', stackBB: 32, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'heart' }, { rank: 'J', suit: 'diamond' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 207,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' },
      ],
    },
    correctAction: 'ALL_IN',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['올인을 선택했다', '8BB에서 미니레이즈가 비효율적임을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['AJo가 8BB CO 푸시 레인지에 명확히 포함됨을 언급했다', 'AJo의 에퀴티 강점을 언급했다'] },
      ],
      modelAnswer: `**정답: 올인** — AJo는 8BB CO에서 최상위 레인지 핸드입니다. Nash 기준 8BB CO 푸시 레인지(~50%)에 명확히 포함되며, 상대 콜링 레인지 대비 강한 에퀴티를 보유합니다.`,
      keyConceptTags: ['PushFold', 'FoldEquity'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-006', slug: 'hj-13bb-99-pushfold',
    title: 'HJ 13BB 99 올인 결정',
    description: `미들 스테이지. UTG~LJ 모두 폴드, HJ 차례입니다.

**상황:** HJ 13BB, 포켓 나인(9♠9♦), CO~BB 각각 20-35BB 보유

미들 스택에서 미디엄 포켓 페어, 어떤 액션을 취하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'HJ',
      players: [
        { position: 'UTG', stackBB: 28, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 22, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 35, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 20, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 13, isHero: true, isActive: true },
        { position: 'CO', stackBB: 24, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 30, isHero: false, isActive: true },
        { position: 'SB', stackBB: 20, isHero: false, isActive: true },
        { position: 'BB', stackBB: 35, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '9', suit: 'spade' }, { rank: '9', suit: 'diamond' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 227,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
      ],
    },
    correctAction: 'ALL_IN',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['올인을 선택했다', '13BB에서 푸시폴드 전략이 최적임을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['99가 13BB HJ 푸시 레인지에 포함됨을 언급했다', '미니레이즈 대비 올인의 이점을 언급했다'] },
      ],
      modelAnswer: `**정답: 올인** — 99는 13BB HJ에서 명확한 올인 핸드입니다. Nash 기준 13BB HJ 푸시 레인지(~18%)에 포함되며, 뒤의 4명이 폴드할 폴드 에퀴티까지 고려하면 +EV입니다.`,
      keyConceptTags: ['PushFold', 'PocketPair', 'FoldEquity'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-007', slug: 'utg1-7bb-a5s-pushfold',
    title: 'UTG+1 7BB A5s 얼리포지션 올인',
    description: `미들 스테이지. UTG 폴드, UTG+1 차례입니다.

**상황:** UTG+1 7BB, A5s(♣A ♣5), 나머지 7명 액션 대기

얼리포지션에서 숏스택, 어떤 액션을 취하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'UTG+1',
      players: [
        { position: 'UTG', stackBB: 22, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 7, isHero: true, isActive: true },
        { position: 'UTG+2', stackBB: 28, isHero: false, isActive: true },
        { position: 'LJ', stackBB: 30, isHero: false, isActive: true },
        { position: 'HJ', stackBB: 25, isHero: false, isActive: true },
        { position: 'CO', stackBB: 18, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 35, isHero: false, isActive: true },
        { position: 'SB', stackBB: 20, isHero: false, isActive: true },
        { position: 'BB', stackBB: 22, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'club' }, { rank: '5', suit: 'club' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 207,
      actionSequence: [{ position: 'UTG', action: 'FOLD' }],
    },
    correctAction: 'ALL_IN',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['올인을 선택했다', '7BB에서 EP도 푸시 대상임을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['A5s가 7BB 얼리 포지션 푸시 레인지에 포함됨을 언급했다', '수이티드 에이스의 강점을 언급했다'] },
      ],
      modelAnswer: `**정답: 올인** — 7BB에서는 EP라도 올인이 최적입니다. A5s(수이티드 에이스)는 7BB UTG+1 Nash 푸시 레인지(~40%)에 포함됩니다. 기다리면 앤티/블라인드로 스택이 더 줄어 불리해집니다.`,
      keyConceptTags: ['PushFold', 'ShortStack', 'SuitedAce'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-008', slug: 'bb-call-vs-sb-push-10bb-66',
    title: 'BB 25BB, SB 10BB 올인에 66 콜 결정',
    description: `미들 스테이지. UTG~BTN 폴드, SB가 10BB 올인했습니다.

**상황:** BB 25BB, 포켓 식스(6♥6♣), SB 10BB 올인 (팟 12.5BB)

SB의 올인에 콜하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 22, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 28, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 20, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 35, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 18, isHero: false, isActive: false },
        { position: 'CO', stackBB: 24, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 30, isHero: false, isActive: false },
        { position: 'SB', stackBB: 10, isHero: false, isActive: true },
        { position: 'BB', stackBB: 25, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: '6', suit: 'heart' }, { rank: '6', suit: 'club' }],
      potSize: 12.5, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 212,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
        { position: 'BTN', action: 'FOLD' }, { position: 'SB', action: 'ALL_IN', amount: 10 },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['콜을 선택했다', '팟 오즈와 에퀴티를 비교했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['66이 BB 콜링 레인지에 포함됨을 언급했다', 'SB 푸시 레인지 대비 에퀴티를 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — 10BB SB 푸시 레인지(~40%) 대비 66의 에퀴티는 약 52%입니다. 팟 오즈(9BB 콜로 21.5BB 팟)도 유리하며, Nash 균형 기준 BB는 55+를 콜합니다. 66은 명확한 콜입니다.`,
      keyConceptTags: ['PushFold', 'CallRange', 'PotOdds'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-009', slug: 'btn-15bb-kto-pushfold-threshold',
    title: 'BTN 15BB KTo — 푸시폴드 경계선',
    description: `미들 스테이지. UTG~CO 모두 폴드, BTN 차례입니다.

**상황:** BTN 15BB, KTo(♣K ♦T), SB 20BB / BB 28BB

15BB는 푸시폴드 임계값입니다. 어떤 액션을 취하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 25, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 30, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 22, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 18, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 28, isHero: false, isActive: false },
        { position: 'CO', stackBB: 24, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 15, isHero: true, isActive: true },
        { position: 'SB', stackBB: 20, isHero: false, isActive: true },
        { position: 'BB', stackBB: 28, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'club' }, { rank: 'T', suit: 'diamond' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 210,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
      ],
    },
    correctAction: 'ALL_IN',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['올인을 선택했다', '15BB에서 올인이 미니레이즈보다 유리함을 이해했다'] },
        { id: 'theory', name: 'Theory', nameKo: '푸시폴드 이론', maxScore: 60,
          checklistItems: ['15BB가 푸시폴드 임계값임을 언급했다', 'KTo가 BTN 15BB 올인 레인지에 포함됨을 언급했다'] },
      ],
      modelAnswer: `**정답: 올인** — 15BB는 푸시폴드와 표준 레이즈 사이 경계입니다. BTN에서는 올인이 더 많은 압력을 가하며, KTo는 Nash 기준 15BB BTN 올인 레인지에 포함됩니다. SB/BB 수비 레인지 대비 충분한 에퀴티를 보유합니다.`,
      keyConceptTags: ['PushFold', 'BTNPosition', 'Threshold'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-010', slug: 'sb-6bb-q9s-vs-bb',
    title: 'SB 6BB Q9s — 매우 숏스택 올인',
    description: `레이트 스테이지. UTG~BTN 모두 폴드, SB 차례입니다.

**상황:** SB 6BB, Q9s(♠Q ♠9), BB 40BB

위험한 숏스택 상황입니다. 어떤 액션을 취하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 22, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 30, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 25, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 20, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 28, isHero: false, isActive: false },
        { position: 'CO', stackBB: 35, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 18, isHero: false, isActive: false },
        { position: 'SB', stackBB: 6, isHero: true, isActive: true },
        { position: 'BB', stackBB: 40, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'Q', suit: 'spade' }, { rank: '9', suit: 'spade' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'ITM',
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
          checklistItems: ['올인을 선택했다', '6BB에서 폴드가 큰 실수임을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['Q9s가 6BB SB 초광범위 푸시 레인지에 포함됨을 언급했다', '기다릴 여유가 없음을 언급했다'] },
      ],
      modelAnswer: `**정답: 올인** — 6BB SB에서 Nash 푸시 레인지는 ~65%로 매우 넓습니다. Q9s(수이티드)는 이 레인지에 명확히 포함됩니다. 폴드하면 앤티/블라인드에 스택이 잠식되어 더 나쁜 상황이 됩니다.`,
      keyConceptTags: ['PushFold', 'ShortStack', 'FoldEquity'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-011', slug: 'bb-vs-btn-push-11bb-j8o-fold',
    title: 'BB 25BB, BTN 11BB 올인에 J8o 판단',
    description: `미들 스테이지. UTG~CO 폴드, BTN이 11BB 올인했습니다. SB도 폴드.

**상황:** BB 25BB, J8o(♥J ♣8), BTN 11BB 올인 (팟 13.5BB)

BTN의 올인에 콜하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 28, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 22, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 30, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 20, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 25, isHero: false, isActive: false },
        { position: 'CO', stackBB: 18, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 11, isHero: false, isActive: true },
        { position: 'SB', stackBB: 24, isHero: false, isActive: false },
        { position: 'BB', stackBB: 25, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'J', suit: 'heart' }, { rank: '8', suit: 'club' }],
      potSize: 13.5, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 203,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
        { position: 'BTN', action: 'ALL_IN', amount: 11 }, { position: 'SB', action: 'FOLD' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['폴드를 선택했다', 'J8o가 BB 콜링 레인지 밖임을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['BTN 11BB 푸시 레인지가 넓어 J8o 에퀴티가 낮음을 언급했다', 'BB 콜링 레인지(~20%)를 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — BTN 11BB 올인 레인지는 약 35%로 넓습니다. 그러나 BB 콜링 레인지는 약 20%(77+, A9o+, A6s+, KTo+)이며, J8o는 이 레인지에 포함되지 않습니다. J8o의 에퀴티가 팟 오즈(9BB 콜→21.5BB 팟, 42% 필요)를 충족하지 못합니다.`,
      keyConceptTags: ['PushFold', 'CallRange', 'PotOdds'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-012', slug: 'co-14bb-aqo-pushfold',
    title: 'CO 14BB AQo 올인 결정',
    description: `미들 스테이지. UTG~HJ 모두 폴드, CO 차례입니다.

**상황:** CO 14BB, AQo(♠A ♥Q), BTN 22BB / SB 15BB / BB 30BB

프리미엄 핸드에 가까운 14BB CO, 어떤 액션을 취하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 25, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 20, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 28, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 22, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 18, isHero: false, isActive: false },
        { position: 'CO', stackBB: 14, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 22, isHero: false, isActive: true },
        { position: 'SB', stackBB: 15, isHero: false, isActive: true },
        { position: 'BB', stackBB: 30, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'spade' }, { rank: 'Q', suit: 'heart' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 194,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' },
      ],
    },
    correctAction: 'ALL_IN',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['올인을 선택했다', 'AQo가 14BB CO 올인 레인지에 포함됨을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['AQo의 강한 에퀴티를 언급했다', '14BB에서 미니레이즈 vs 올인 비교를 언급했다'] },
      ],
      modelAnswer: `**정답: 올인** — AQo는 14BB CO에서 최상위 레인지 핸드입니다. Nash 기준 14BB CO 올인 레인지(~20%)에 명확히 포함되며, 상대 콜링 레인지(QQ+, AK) 대비 40-50% 에퀴티를 보유하고 폴드 에퀴티도 상당합니다.`,
      keyConceptTags: ['PushFold', 'FoldEquity', 'PremiumHand'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-013', slug: 'btn-9bb-22-pushfold',
    title: 'BTN 9BB 22 포켓 듀스 올인 결정',
    description: `미들 스테이지. UTG~CO 모두 폴드, BTN 차례입니다.

**상황:** BTN 9BB, 포켓 듀스(2♠2♣), SB 20BB / BB 30BB

가장 작은 포켓 페어. 어떤 액션을 취하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 28, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 22, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 25, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 18, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 30, isHero: false, isActive: false },
        { position: 'CO', stackBB: 20, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 9, isHero: true, isActive: true },
        { position: 'SB', stackBB: 20, isHero: false, isActive: true },
        { position: 'BB', stackBB: 30, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '2', suit: 'spade' }, { rank: '2', suit: 'club' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 202,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
      ],
    },
    correctAction: 'ALL_IN',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['올인을 선택했다', '22도 9BB BTN에서 올인 대상임을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['22+가 BTN 9BB 올인 레인지에 포함됨을 언급했다', '포켓 페어의 에퀴티 특성을 언급했다'] },
      ],
      modelAnswer: `**정답: 올인** — 9BB BTN에서 Nash 올인 레인지는 ~50%로 넓습니다. 22도 포켓 페어이므로 이 레인지에 포함됩니다. 언페어드 핸드 대비 약 55% 에퀴티를 보유하며, 폴드 에퀴티가 있어 +EV입니다.`,
      keyConceptTags: ['PushFold', 'PocketPair', 'BTNPosition'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-014', slug: 'hj-11bb-kjs-pushfold',
    title: 'HJ 11BB KJs 올인 결정',
    description: `미들 스테이지. UTG~LJ 모두 폴드, HJ 차례입니다.

**상황:** HJ 11BB, KJs(♥K ♥J), CO~BB 각각 20-35BB 보유

수이티드 브로드웨이 핸드에서의 판단입니다. 어떤 액션을 취하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'HJ',
      players: [
        { position: 'UTG', stackBB: 25, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 30, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 22, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 20, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 11, isHero: true, isActive: true },
        { position: 'CO', stackBB: 25, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 35, isHero: false, isActive: true },
        { position: 'SB', stackBB: 18, isHero: false, isActive: true },
        { position: 'BB', stackBB: 20, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'heart' }, { rank: 'J', suit: 'heart' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 206,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
      ],
    },
    correctAction: 'ALL_IN',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['올인을 선택했다', 'KJs가 11BB HJ 올인 레인지에 포함됨을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['KJs가 프리미엄 수이티드 브로드웨이임을 언급했다', 'Nash 레인지와 비교했다'] },
      ],
      modelAnswer: `**정답: 올인** — KJs는 수이티드 킹잭으로 매우 강한 핸드입니다. Nash 기준 11BB HJ 올인 레인지(~20%)에 명확히 포함됩니다. 수이티드 특성으로 상대 콜링 레인지 대비 추가 에퀴티를 보유합니다.`,
      keyConceptTags: ['PushFold', 'SuitedBroadway', 'FoldEquity'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-015', slug: 'bb-call-vs-sb-8bb-a4o',
    title: 'BB 20BB, SB 8BB 올인에 A4o 콜 결정',
    description: `미들 스테이지. UTG~BTN 폴드, SB가 8BB 올인했습니다.

**상황:** BB 20BB, A4o(♦A ♦4), SB 8BB 올인 (팟 10BB)

약한 에이스로 콜하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 25, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 22, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 28, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 20, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 30, isHero: false, isActive: false },
        { position: 'CO', stackBB: 18, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 24, isHero: false, isActive: false },
        { position: 'SB', stackBB: 8, isHero: false, isActive: true },
        { position: 'BB', stackBB: 20, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'diamond' }, { rank: '4', suit: 'diamond' }],
      potSize: 10, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 195,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
        { position: 'BTN', action: 'FOLD' }, { position: 'SB', action: 'ALL_IN', amount: 8 },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['콜을 선택했다', 'A4o가 BB 콜링 레인지에 포함됨을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['SB 8BB 광범위 푸시 레인지 대비 A4o의 에퀴티를 언급했다', '팟 오즈가 유리함을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — SB 8BB 올인 레인지(~50%)는 매우 넓습니다. A4o는 이 레인지 대비 약 55% 에퀴티를 보유합니다. 팟 오즈(7BB 콜→18BB 팟, 39% 필요) 대비 에퀴티가 충분하며, Nash 기준 BB는 A2o+를 콜합니다.`,
      keyConceptTags: ['PushFold', 'CallRange', 'WeakAce'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-016', slug: 'utg2-10bb-qq-pushfold',
    title: 'UTG+2 10BB QQ 올인 결정',
    description: `미들 스테이지. UTG, UTG+1 폴드, UTG+2 차례입니다.

**상황:** UTG+2 10BB, QQ(♦Q ♣Q), 나머지 6명 액션 대기

얼리 포지션에서 QQ, 어떤 액션을 취하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'UTG+2',
      players: [
        { position: 'UTG', stackBB: 25, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 30, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 10, isHero: true, isActive: true },
        { position: 'LJ', stackBB: 22, isHero: false, isActive: true },
        { position: 'HJ', stackBB: 28, isHero: false, isActive: true },
        { position: 'CO', stackBB: 20, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 35, isHero: false, isActive: true },
        { position: 'SB', stackBB: 18, isHero: false, isActive: true },
        { position: 'BB', stackBB: 25, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'Q', suit: 'diamond' }, { rank: 'Q', suit: 'club' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 213,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
      ],
    },
    correctAction: 'ALL_IN',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['올인을 선택했다', 'QQ는 어떤 포지션에서도 10BB에서 올인임을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['QQ의 강한 에퀴티를 언급했다', '10BB에서 림프 또는 미니레이즈가 비효율적임을 언급했다'] },
      ],
      modelAnswer: `**정답: 올인** — QQ는 10BB 어떤 포지션에서도 올인이 정답입니다. 상대 콜링 레인지(KK+, AK) 대비에도 QQ는 약 55% 에퀴티를 보유하며, 폴드 에퀴티를 고려하면 명확한 +EV 올인입니다.`,
      keyConceptTags: ['PushFold', 'PremiumHand', 'ShortStack'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-017', slug: 'btn-12bb-j9s-pushfold',
    title: 'BTN 12BB J9s 올인 결정',
    description: `미들 스테이지. UTG~CO 모두 폴드, BTN 차례입니다.

**상황:** BTN 12BB, J9s(♣J ♣9), SB 22BB / BB 28BB

수이티드 커넥터 핸드, 어떤 액션을 취하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 25, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 30, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 22, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 18, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 28, isHero: false, isActive: false },
        { position: 'CO', stackBB: 20, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 12, isHero: true, isActive: true },
        { position: 'SB', stackBB: 22, isHero: false, isActive: true },
        { position: 'BB', stackBB: 28, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'J', suit: 'club' }, { rank: '9', suit: 'club' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 205,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
      ],
    },
    correctAction: 'ALL_IN',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['올인을 선택했다', 'J9s가 12BB BTN 올인 레인지에 포함됨을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['수이티드 커넥터의 에퀴티 이점을 언급했다', 'BTN 위치 이점을 언급했다'] },
      ],
      modelAnswer: `**정답: 올인** — J9s는 BTN 12BB Nash 올인 레인지(~30%)에 포함됩니다. 수이티드 커넥터로 콜을 받더라도 약 45% 에퀴티를 보유하고 폴드 에퀴티까지 더해 +EV입니다.`,
      keyConceptTags: ['PushFold', 'SuitedConnector', 'BTNPosition'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-018', slug: 'sb-7bb-73o-fold',
    title: 'SB 7BB 73o — 올인인가 폴드인가?',
    description: `미들 스테이지. UTG~BTN 모두 폴드, SB 차례입니다.

**상황:** SB 7BB, 73o(♠7 ♥3), BB 35BB

7BB 숏스택이지만 핸드가 매우 약합니다. 어떤 액션을 취하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 22, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 28, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 20, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 25, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 30, isHero: false, isActive: false },
        { position: 'CO', stackBB: 18, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 24, isHero: false, isActive: false },
        { position: 'SB', stackBB: 7, isHero: true, isActive: true },
        { position: 'BB', stackBB: 35, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '7', suit: 'spade' }, { rank: '3', suit: 'heart' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 209,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
        { position: 'BTN', action: 'FOLD' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['폴드를 선택했다', '7BB에서도 모든 핸드를 푸시하지 않음을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['73o가 7BB SB Nash 레인지 밖임을 언급했다', 'BB의 넓은 콜링 레인지 대비 에퀴티 부족을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — 7BB SB Nash 레인지는 약 60%(75o+, 64o+, 53o+...)이지만 73o는 포함되지 않습니다. BB는 이 상황에서 거의 모든 핸드로 콜하며, 73o는 BB 콜링 레인지 전체 대비 에퀴티가 약 38%에 불과합니다.`,
      keyConceptTags: ['PushFold', 'WeakHand', 'NashRange'],
    },
    publishedAt: D, createdAt: D,
  },
]

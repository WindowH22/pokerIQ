import type { Problem } from '@/types'

const D = '2024-01-01T00:00:00.000Z'

export const RANGE_ANALYSIS_PROBLEMS: Problem[] = [
  {
    id: 'prob-034', slug: 'utg-openrange-ajo-fold',
    title: 'UTG 오픈 레인지: AJo 폴드?',
    description: `9인 풀링 테이블, 일반 토너먼트 미들 스테이지. UTG 차례.

**상황:** UTG 25BB(히어로), AJo. 모든 액션이 당신에게 처음 옵니다

AJo로 UTG에서 오픈하시겠습니까, 폴드하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'UTG',
      players: [
        { position: 'UTG', stackBB: 25, isHero: true, isActive: true },
        { position: 'UTG+1', stackBB: 28, isHero: false, isActive: true },
        { position: 'UTG+2', stackBB: 22, isHero: false, isActive: true },
        { position: 'LJ', stackBB: 30, isHero: false, isActive: true },
        { position: 'HJ', stackBB: 25, isHero: false, isActive: true },
        { position: 'CO', stackBB: 20, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 35, isHero: false, isActive: true },
        { position: 'SB', stackBB: 18, isHero: false, isActive: true },
        { position: 'BB', stackBB: 22, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'heart' }, { rank: 'J', suit: 'diamond' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 225,
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'range', name: 'Range', nameKo: '레인지 분석', maxScore: 50,
          checklistItems: ['AJo가 UTG 오픈 레인지에 포함됨을 알았다', 'UTG 오픈 레인지를 정확히 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['AJo의 강도(상위 12-15%)를 언급했다', '25BB에서 오픈이 적절함을 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈(오픈)** — UTG 오픈 레인지는 약 상위 12-15%(TT+, AJs+, AJo+, KQs 등)입니다. AJo(오프수이트)는 이 경계에 있으며 25BB에서 오픈이 표준입니다. 6-7명이 뒤에 있어 폴드 EV가 낮지만, AJo는 충분히 강한 핸드입니다.`,
      keyConceptTags: ['RangeAnalysis', 'UTG', 'OpenRange'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-035', slug: 'btn-3bet-vs-co-open-kjs',
    title: 'BTN 3벳 레인지: KJs로 3벳?',
    description: `9인 캐시 게임. CO가 2.5BB 오픈. 히어로 BTN 차례.

**상황:** BTN 100BB(히어로), KJs(♠K ♠J). CO 100BB가 오픈

3벳하시겠습니까, 콜하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 100, isHero: true, isActive: true },
        { position: 'SB', stackBB: 100, isHero: false, isActive: true },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'spade' }, { rank: 'J', suit: 'spade' }],
      potSize: 8.5, stage: 'PREFLOP', totalChips: 900,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'RAISE', amount: 5 },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'range', name: 'Range', nameKo: '레인지 분석', maxScore: 50,
          checklistItems: ['KJs가 BTN 3벳/콜 레인지에 포함됨을 알았다', 'BTN 포지션 어드밴티지를 언급했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['KJs의 수이티드 가치를 언급했다', '3벳의 블러프/밸류 목적을 언급했다'] },
      ],
      modelAnswer: `**정답: 3벳** — BTN에서 KJs는 표준 3벳 레인지에 포함됩니다. 수이티드로 폴드 에퀴티와 리얼라이제이션 에퀴티가 모두 높습니다. CO 오픈 레인지 대비 충분한 에퀴티(55%+)를 보유하며, BTN 포지션 어드밴티지를 활용할 수 있습니다.`,
      keyConceptTags: ['RangeAnalysis', 'BTN', '3bet', 'Suited'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-036', slug: 'sb-defend-vs-btn-open-q7s',
    title: 'SB 디펜스 레인지: Q7s 콜?',
    description: `BTN이 2.5BB 오픈. SB 히어로 차례.

**상황:** SB 100BB(히어로), Q7s(♣Q ♣7). BTN 100BB 오픈, BB 아직 남음

콜하시겠습니까, 폴드하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: true },
        { position: 'SB', stackBB: 100, isHero: true, isActive: true },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'Q', suit: 'club' }, { rank: '7', suit: 'club' }],
      potSize: 8, stage: 'PREFLOP', totalChips: 900,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
        { position: 'BTN', action: 'RAISE', amount: 5 },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'range', name: 'Range', nameKo: '레인지 분석', maxScore: 50,
          checklistItems: ['SB에서 OOP 포지션 단점을 이해했다', 'Q7s가 SB 디펜스 레인지 경계에 있음을 언급했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['BB 스퀴즈 가능성을 언급했다', 'SB에서 약 수이티드 핸드의 한계를 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — SB는 포스트플롭에서 항상 OOP(불리한 포지션)입니다. Q7s(수이티드)는 좋아 보이지만 BB 스퀴즈 위험이 있고, 플롭에서 최선을 다해 히트하지 않으면 플레이하기 어렵습니다. SB 디펜스 레인지에서 Q7s는 마지널하여 폴드가 표준입니다.`,
      keyConceptTags: ['RangeAnalysis', 'SB', 'Defense', 'OOP'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-037', slug: 'bb-vs-co-open-defend-range-k4s',
    title: 'BB 디펜스: K4s 콜 여부',
    description: `CO 2.5BB 오픈. BB 히어로 차례.

**상황:** BB 100BB(히어로), K4s(♦K ♦4). CO가 오픈, BTN/SB는 폴드

콜하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: false },
        { position: 'SB', stackBB: 100, isHero: false, isActive: false },
        { position: 'BB', stackBB: 100, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'diamond' }, { rank: '4', suit: 'diamond' }],
      potSize: 8, stage: 'PREFLOP', totalChips: 900,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'RAISE', amount: 5 },
        { position: 'BTN', action: 'FOLD' }, { position: 'SB', action: 'FOLD' },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'range', name: 'Range', nameKo: '레인지 분석', maxScore: 50,
          checklistItems: ['BB의 헤즈업 팟 오즈를 계산했다', 'K4s가 BB 디펜스 레인지에 포함됨을 언급했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['BB의 낮은 콜 비용(1.5BB)을 언급했다', 'K4s 수이티드의 플롭 에퀴티를 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — BB에서 이미 2BB를 포스트했으므로 1.5BB만 추가하면 됩니다. 팟 오즈 약 25%(1.5 / 6.5)이며, K4s(수이티드)는 이를 충분히 정당화합니다. BB 디펜스 레인지에는 K4s+, 수이티드 에이스, 수이티드 커넥터 등이 포함됩니다.`,
      keyConceptTags: ['RangeAnalysis', 'BB', 'Defense', 'PotOdds'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-038', slug: 'hj-openrange-suited-connector-76s',
    title: 'HJ에서 76s 오픈 여부',
    description: `9인 캐시 게임. HJ 히어로 차례, 앞에서 모두 폴드.

**상황:** HJ 100BB(히어로), 7♠6♠. UTG~LJ 폴드

오픈하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'HJ',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: true, isActive: true },
        { position: 'CO', stackBB: 100, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: true },
        { position: 'SB', stackBB: 100, isHero: false, isActive: true },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '7', suit: 'spade' }, { rank: '6', suit: 'spade' }],
      potSize: 3, stage: 'PREFLOP', totalChips: 900,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'range', name: 'Range', nameKo: '레인지 분석', maxScore: 50,
          checklistItems: ['수이티드 커넥터의 오픈 가치를 이해했다', 'HJ 포지션 오픈 레인지를 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['76s의 플로우 잠재력을 언급했다', 'HJ가 충분히 늦은 포지션임을 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈(오픈)** — HJ는 9인 테이블에서 5번째 포지션으로 오픈 레인지가 약 상위 20%입니다. 76s(수이티드 커넥터)는 스트레이트/플러시 가능성으로 높은 에퀴티 리얼라이제이션을 보여줍니다. HJ 오픈 레인지에 포함됩니다.`,
      keyConceptTags: ['RangeAnalysis', 'HJ', 'SuitedConnector', 'OpenRange'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-039', slug: '4bet-range-ako-vs-3bet',
    title: '4벳 레인지: AKo로 4벳?',
    description: `BTN이 오픈(2.5BB), 히어로 SB 3벳(8BB), BB 폴드, BTN이 다시 3벳(20BB).

**상황:** SB 100BB(히어로), AKo. BTN이 히어로 3벳에 다시 3벳

4벳 올인 또는 폴드?`,
    difficulty: 'INTERMEDIATE', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: true },
        { position: 'SB', stackBB: 100, isHero: true, isActive: true },
        { position: 'BB', stackBB: 100, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: 'A', suit: 'heart' }, { rank: 'K', suit: 'diamond' }],
      potSize: 49, stage: 'PREFLOP', totalChips: 900,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
        { position: 'BTN', action: 'RAISE', amount: 5 }, { position: 'BB', action: 'FOLD' },
        { position: 'SB', action: 'RAISE', amount: 16 }, { position: 'BTN', action: 'RAISE', amount: 40 },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'range', name: 'Range', nameKo: '레인지 분석', maxScore: 50,
          checklistItems: ['AKo가 4벳 레인지에 포함됨을 알았다', 'BTN 3벳 레인지를 분석했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['AKo의 에퀴티(AA/KK 대비 포함)를 언급했다', '4벳 올인의 폴드 에퀴티를 언급했다'] },
      ],
      modelAnswer: `**정답: 4벳 올인** — AKo는 모든 포지션에서 4벳 레인지에 포함됩니다. BTN 3벳 레인지(TT+, AQs+, 일부 블러프) 대비 AKo는 약 50-55% 에퀴티를 보유합니다. 폴드 에퀴티도 있으며, 폴드하면 16BB를 손실합니다.`,
      keyConceptTags: ['RangeAnalysis', '4bet', 'AK', 'BlindVsBlind'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-040', slug: 'co-openrange-t9s',
    title: 'CO에서 T9s 오픈',
    description: `9인 캐시 게임. CO 히어로 차례, UTG~HJ 모두 폴드.

**상황:** CO 100BB(히어로), T♥9♥

오픈하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: true },
        { position: 'SB', stackBB: 100, isHero: false, isActive: true },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'T', suit: 'heart' }, { rank: '9', suit: 'heart' }],
      potSize: 3, stage: 'PREFLOP', totalChips: 900,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['오픈(레이즈)을 선택했다', 'CO 오픈 레인지에 T9s 포함을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['T9s의 수이티드 커넥터 가치를 언급했다', 'CO 포지션 어드밴티지를 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈(오픈)** — CO는 BTN 바로 앞 포지션으로 오픈 레인지가 약 상위 25-28%입니다. T9s(수이티드 커넥터)는 스트레이트/플러시 드로우 잠재력이 높고 CO 오픈 레인지에 포함됩니다.`,
      keyConceptTags: ['RangeAnalysis', 'CO', 'SuitedConnector'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-041', slug: 'bb-squeeze-jj-vs-co-open-btncall',
    title: 'BB 스퀴즈: JJ로 스퀴즈?',
    description: `CO 오픈(2.5BB), BTN 콜, SB 폴드. BB 히어로 차례.

**상황:** BB 100BB(히어로), J♠J♥. CO+BTN 모두 팟에 참여

3벳 스퀴즈하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: true },
        { position: 'SB', stackBB: 100, isHero: false, isActive: false },
        { position: 'BB', stackBB: 100, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'J', suit: 'spade' }, { rank: 'J', suit: 'heart' }],
      potSize: 12.5, stage: 'PREFLOP', totalChips: 900,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'RAISE', amount: 5 },
        { position: 'BTN', action: 'CALL', amount: 5 }, { position: 'SB', action: 'FOLD' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'range', name: 'Range', nameKo: '레인지 분석', maxScore: 50,
          checklistItems: ['스퀴즈의 의미와 효과를 이해했다', 'JJ가 스퀴즈 밸류 레인지임을 언급했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['2명 상대 폴드 에퀴티를 언급했다', 'JJ의 에퀴티가 CO+BTN 레인지 대비 좋음을 언급했다'] },
      ],
      modelAnswer: `**정답: 3벳(스퀴즈)** — JJ는 스퀴즈 밸류 레인지 상단입니다. CO 오픈 + BTN 콜 두 명 모두 폴드 가능성이 있어 폴드 에퀴티가 크고, 콜하더라도 JJ는 좋은 에퀴티를 보유합니다. 스퀴즈 사이즈는 약 14-16BB가 표준입니다.`,
      keyConceptTags: ['RangeAnalysis', 'Squeeze', 'BB', 'JJ'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-042', slug: 'utg1-3bet-caller-range-aks',
    title: 'UTG+1 3벳에 콜: AKs 플레이',
    description: `UTG 오픈(2.5BB), UTG+1 3벳(9BB). 히어로 LJ 차례.

**상황:** LJ 100BB(히어로), A♠K♠. UTG 오픈, UTG+1 3벳, 뒤에 5명 남음

콜하시겠습니까, 4벳하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'LJ',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: true },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: true, isActive: true },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: true },
        { position: 'CO', stackBB: 100, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: true },
        { position: 'SB', stackBB: 100, isHero: false, isActive: true },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'spade' }, { rank: 'K', suit: 'spade' }],
      potSize: 21.5, stage: 'PREFLOP', totalChips: 900,
      actionSequence: [
        { position: 'UTG', action: 'RAISE', amount: 5 }, { position: 'UTG+1', action: 'RAISE', amount: 18 },
        { position: 'UTG+2', action: 'FOLD' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'range', name: 'Range', nameKo: '레인지 분석', maxScore: 50,
          checklistItems: ['AKs가 4벳 레인지임을 이해했다', '콜드 4벳의 의미를 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['UTG vs UTG+1 3벳 레인지의 강도를 언급했다', 'AKs 에퀴티 우위를 언급했다'] },
      ],
      modelAnswer: `**정답: 4벳** — UTG 오픈 + UTG+1 3벳은 매우 강한 레인지(QQ+, AKs, 일부 AKo)입니다. AKs는 이 레인지 대비 약 40-45% 에퀴티이지만, 콜드 4벳으로 폴드 에퀴티를 추가하고 AA/KK를 분리할 수 있습니다. 콜도 가능하지만 4벳이 최선입니다.`,
      keyConceptTags: ['RangeAnalysis', 'Cold4bet', 'AKs', 'EarlyPosition'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-043', slug: 'btn-open-range-a2o-fold',
    title: 'BTN 오픈 레인지: A2o',
    description: `9인 캐시 게임. BTN 히어로 차례, UTG~CO 모두 폴드.

**상황:** BTN 100BB(히어로), A2o(♠A ♦2). SB/BB 아직 남음

오픈하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 100, isHero: true, isActive: true },
        { position: 'SB', stackBB: 100, isHero: false, isActive: true },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'spade' }, { rank: '2', suit: 'diamond' }],
      potSize: 3, stage: 'PREFLOP', totalChips: 900,
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
          checklistItems: ['오픈(레이즈)을 선택했다', 'BTN에서 A2o 오픈이 표준임을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['BTN 포지션 어드밴티지를 언급했다', 'A2o의 에이스 가치를 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈(오픈)** — BTN은 테이블에서 가장 유리한 포지션으로 오픈 레인지가 약 상위 40-50%입니다. A2o(오프수이트)도 BTN에서는 표준 오픈 레인지에 포함됩니다. 에이스 가치와 BTN 포지션 어드밴티지를 활용합니다.`,
      keyConceptTags: ['RangeAnalysis', 'BTN', 'OpenRange', 'PositionAdvantage'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-044', slug: 'utg-fold-range-k9o',
    title: 'UTG에서 K9o: 폴드',
    description: `9인 캐시 게임. UTG 히어로 차례.

**상황:** UTG 100BB(히어로), K9o(♠K ♦9)

오픈하시겠습니까, 폴드하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'UTG',
      players: [
        { position: 'UTG', stackBB: 100, isHero: true, isActive: true },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: true },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: true },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: true },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: true },
        { position: 'CO', stackBB: 100, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: true },
        { position: 'SB', stackBB: 100, isHero: false, isActive: true },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'spade' }, { rank: '9', suit: 'diamond' }],
      potSize: 3, stage: 'PREFLOP', totalChips: 900,
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'range', name: 'Range', nameKo: '레인지 분석', maxScore: 50,
          checklistItems: ['K9o가 UTG 오픈 레인지에 포함되지 않음을 이해했다', 'UTG의 타이트한 레인지를 설명했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['6-7명이 뒤에서 3벳 가능성을 언급했다', 'K9o의 도미네이션 위험을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — UTG는 가장 이른 포지션으로 오픈 레인지가 약 상위 12-15%입니다. K9o(오프수이트)는 이 레인지에 포함되지 않습니다. 7명이 뒤에 있어 3벳 위험이 크고, AK/KQ/KJ에게 도미네이트 당할 수 있습니다.`,
      keyConceptTags: ['RangeAnalysis', 'UTG', 'FoldRange', 'Domination'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-045', slug: 'small-blind-limp-vs-btn-fold',
    title: 'SB에서 림프 vs 레이즈',
    description: `BTN~CO 모두 폴드, SB 히어로만 남음(헤즈업 가능).

**상황:** SB 100BB(히어로), 5♦4♦. BB 100BB만 남음

림프(콜)하시겠습니까, 레이즈하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: false },
        { position: 'SB', stackBB: 100, isHero: true, isActive: true },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '5', suit: 'diamond' }, { rank: '4', suit: 'diamond' }],
      potSize: 3, stage: 'PREFLOP', totalChips: 900,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
        { position: 'BTN', action: 'FOLD' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'range', name: 'Range', nameKo: '레인지 분석', maxScore: 50,
          checklistItems: ['SB vs BB 헤즈업 레인지를 이해했다', '림프 vs 레이즈 전략을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['레이즈가 림프보다 유리한 이유를 설명했다', '5♦4♦의 레인지 가치를 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈** — SB vs BB 헤즈업에서 림프는 BB에게 무료로 실현 에퀴티를 줍니다. 레이즈하면 즉시 폴드 EV를 얻고, 콜 시에도 IP(유리한 포지션)에서 플레이합니다. 5♦4♦는 레이즈 레인지에 포함됩니다.`,
      keyConceptTags: ['RangeAnalysis', 'SBvsBB', 'Limp', 'HeadsUp'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-046', slug: '5bet-jam-aks-vs-4bet',
    title: '5벳 잼: AKs vs 4벳',
    description: `CO 오픈(2.5BB), BTN 3벳(8BB), CO 4벳(20BB). 히어로 BTN 차례.

**상황:** BTN 100BB(히어로), A♣K♣. CO가 4벳

5벳 올인하시겠습니까, 폴드하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 100, isHero: true, isActive: true },
        { position: 'SB', stackBB: 100, isHero: false, isActive: false },
        { position: 'BB', stackBB: 100, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: 'A', suit: 'club' }, { rank: 'K', suit: 'club' }],
      potSize: 42, stage: 'PREFLOP', totalChips: 900,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'RAISE', amount: 5 },
        { position: 'BTN', action: 'RAISE', amount: 16 }, { position: 'SB', action: 'FOLD' },
        { position: 'BB', action: 'FOLD' }, { position: 'CO', action: 'RAISE', amount: 40 },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'range', name: 'Range', nameKo: '레인지 분석', maxScore: 50,
          checklistItems: ['CO 4벳 레인지를 분석했다(AA/KK/QQ, AKs)', 'AKs가 5벳 잼 레인지임을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['AKs의 에퀴티가 CO 4벳 레인지 대비 충분함을 언급했다', '수이티드 가치를 언급했다'] },
      ],
      modelAnswer: `**정답: 5벳 올인** — CO 4벳 레인지(AA, KK, QQ, AKs, 일부 AKo) 대비 AKs는 약 42% 에퀴티입니다. 수이티드로 플러시 아웃이 추가되어 에퀴티가 높습니다. 폴드하면 16BB 손실이며, 잼이 최선입니다.`,
      keyConceptTags: ['RangeAnalysis', '5bet', 'AKs', 'Premium'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-047', slug: 'multiway-pot-range-narrowing-88',
    title: '멀티웨이 팟에서 88 플레이',
    description: `UTG 오픈(2.5BB), HJ 콜, CO 콜. BTN 히어로 차례.

**상황:** BTN 100BB(히어로), 8♦8♣. 3명이 이미 콜. SB/BB 아직 남음

콜하시겠습니까, 3벳하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: true },
        { position: 'CO', stackBB: 100, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 100, isHero: true, isActive: true },
        { position: 'SB', stackBB: 100, isHero: false, isActive: true },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '8', suit: 'diamond' }, { rank: '8', suit: 'club' }],
      potSize: 17.5, stage: 'PREFLOP', totalChips: 900,
      actionSequence: [
        { position: 'UTG', action: 'RAISE', amount: 5 }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'CALL', amount: 5 }, { position: 'CO', action: 'CALL', amount: 5 },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'range', name: 'Range', nameKo: '레인지 분석', maxScore: 50,
          checklistItems: ['멀티웨이 팟에서 88의 포지션을 이해했다', '셋 마이닝 가치를 언급했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['멀티웨이에서 88 3벳의 단점을 언급했다', '셋 히트 시 큰 팟을 기대할 수 있음을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜(셋 마이닝)** — 멀티웨이 팟(4-5명)에서 88을 3벳하면 팟이 너무 커져 에이스/킹 오버카드에 취약합니다. BTN에서 콜하여 셋 히트(약 11.8%)를 노리는 것이 최선입니다. SB/BB도 콜할 수 있어 팟 오즈가 좋습니다.`,
      keyConceptTags: ['RangeAnalysis', 'Multiway', 'SetMining', 'BTN'],
    },
    publishedAt: D, createdAt: D,
  },
]

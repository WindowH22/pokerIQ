import type { Problem } from '@/types'

const D = '2024-01-01T00:00:00.000Z'

export const POT_ODDS_PROBLEMS: Problem[] = [
  {
    id: 'prob-048', slug: 'flush-draw-call-potodds',
    title: '플러시 드로우: 팟 오즈 콜 계산',
    description: `플롭 후 히어로 BB, SB가 배팅.

**상황:** 플롭 K♣8♣3♥, 히어로 A♣5♣(넛 플러시 드로우). SB가 팟(12BB) 배팅

콜하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'POT_ODDS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: false },
        { position: 'SB', stackBB: 100, isHero: false, isActive: true },
        { position: 'BB', stackBB: 100, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'club' }, { rank: '5', suit: 'club' }],
      boardCards: [{ rank: 'K', suit: 'club' }, { rank: '8', suit: 'club' }, { rank: '3', suit: 'heart' }],
      potSize: 24, stage: 'FLOP', totalChips: 900,
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'potodds', name: 'Pot Odds', nameKo: '팟 오즈 계산', maxScore: 60,
          checklistItems: ['팟 오즈를 올바르게 계산했다(33%)', '플러시 드로우 에퀴티(~36%)를 계산했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 40,
          checklistItems: ['에퀴티 > 팟 오즈임을 이해했다', '넛 플러시 드로우의 강도를 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — 팟 오즈: 12/(24+12) = 33%. 넛 플러시 드로우(9 아웃)의 턴 에퀴티: 약 19%, 리버까지: 약 36%. 콜 비용(33%) < 에퀴티(36%), 콜이 수익적입니다.`,
      keyConceptTags: ['PotOdds', 'FlushDraw', 'Equity', 'Outs'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-049', slug: 'straight-draw-call-price',
    title: '오픈 엔드 스트레이트 드로우: 콜 여부',
    description: `플롭 후 히어로 BTN, BB가 배팅.

**상황:** 플롭 7♠8♦9♣, 히어로 T♥J♥(오픈 엔드 스트레이트 드로우). BB가 반 팟(8BB) 배팅

콜하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'POT_ODDS',
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
        { position: 'SB', stackBB: 100, isHero: false, isActive: false },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'T', suit: 'heart' }, { rank: 'J', suit: 'heart' }],
      boardCards: [{ rank: '7', suit: 'spade' }, { rank: '8', suit: 'diamond' }, { rank: '9', suit: 'club' }],
      potSize: 24, stage: 'FLOP', totalChips: 900,
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'outs', name: 'Outs', nameKo: '아웃 계산', maxScore: 50,
          checklistItems: ['오픈 엔드 스트레이트 드로우 8 아웃을 계산했다', '팟 오즈를 계산했다(25%)'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['에퀴티(32%)가 팟 오즈(25%)보다 높음을 언급했다', '레이즈 가능성도 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — 오픈 엔드 스트레이트 드로우 8 아웃. 팟 오즈: 8/(16+8) = 25%. 리버까지 에퀴티: 약 32%. 에퀴티(32%) > 팟 오즈(25%), 콜이 수익적입니다. 레이즈(반블러프)도 고려할 수 있습니다.`,
      keyConceptTags: ['PotOdds', 'StraightDraw', 'Outs', 'Equity'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-050', slug: 'gutshot-fold-bad-odds',
    title: '거트샷: 팟 오즈 부족으로 폴드',
    description: `플롭 후 히어로 HJ, BB가 배팅.

**상황:** 플롭 A♠8♦3♣, 히어로 5♥7♥(거트샷 스트레이트 드로우). BB가 팟(16BB) 배팅

콜하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'POT_ODDS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'HJ',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: true, isActive: true },
        { position: 'CO', stackBB: 100, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: false },
        { position: 'SB', stackBB: 100, isHero: false, isActive: false },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '5', suit: 'heart' }, { rank: '7', suit: 'heart' }],
      boardCards: [{ rank: 'A', suit: 'spade' }, { rank: '8', suit: 'diamond' }, { rank: '3', suit: 'club' }],
      potSize: 32, stage: 'FLOP', totalChips: 900,
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'potodds', name: 'Pot Odds', nameKo: '팟 오즈 계산', maxScore: 60,
          checklistItems: ['거트샷 4 아웃을 계산했다', '팟 오즈(33%)가 에퀴티(16%)보다 높음을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 40,
          checklistItems: ['콜이 -EV임을 계산했다', '오버카드 없음으로 에퀴티가 낮음을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — 거트샷(6만 히트) 4 아웃. 팟 오즈: 16/(32+16) = 33%. 에퀴티(턴): 약 9%, 리버까지: 약 16%. 에퀴티(16%) < 팟 오즈(33%), 콜은 -EV입니다. 오버카드도 없으므로 폴드가 최선입니다.`,
      keyConceptTags: ['PotOdds', 'Gutshot', 'Fold', 'NegativeEV'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-051', slug: 'river-call-pot-odds-bluffcatch',
    title: '리버 팟 오즈: 블러프캐치 결정',
    description: `리버, 히어로 BB. BTN이 오버배팅(팟 크기 1.5배, 24BB 배팅).

**상황:** 보드 K♥8♦3♠2♣J♣, 히어로 K♦Q♠(탑 페어 킹). BTN 24BB 배팅

콜하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'POT_ODDS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: true },
        { position: 'SB', stackBB: 100, isHero: false, isActive: false },
        { position: 'BB', stackBB: 100, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'diamond' }, { rank: 'Q', suit: 'spade' }],
      boardCards: [
        { rank: 'K', suit: 'heart' }, { rank: '8', suit: 'diamond' },
        { rank: '3', suit: 'spade' }, { rank: '2', suit: 'club' }, { rank: 'J', suit: 'club' },
      ],
      potSize: 48, stage: 'RIVER', totalChips: 900,
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'potodds', name: 'Pot Odds', nameKo: '팟 오즈 계산', maxScore: 50,
          checklistItems: ['팟 오즈를 올바르게 계산했다(24/72 = 33%)', '필요 에퀴티를 계산했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['BTN의 블러프 가능성을 언급했다', 'KQ 탑 페어의 블러프캐치 가치를 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — 팟 오즈: 24/(48+24) = 33%. BTN이 이 라인(오버배팅)으로 밸류와 블러프를 섞는다면, 히어로는 33% 이상의 확률로 앞서있어야 합니다. KQ 탑 페어는 BTN 블러프 레인지(플러시/스트레이트 미스 등) 대비 충분히 앞섭니다.`,
      keyConceptTags: ['PotOdds', 'River', 'BluffCatch', 'Overbet'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-052', slug: 'implied-odds-small-pair',
    title: '임플라이드 오즈: 22로 셋 마이닝',
    description: `CO 오픈(2.5BB), BTN 히어로 차례.

**상황:** BTN 100BB(히어로), 2♠2♣. CO 100BB 오픈, SB/BB 아직 남음

콜하시겠습니까? (임플라이드 오즈 고려)`,
    difficulty: 'INTERMEDIATE', category: 'POT_ODDS',
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
      heroCards: [{ rank: '2', suit: 'spade' }, { rank: '2', suit: 'club' }],
      potSize: 8.5, stage: 'PREFLOP', totalChips: 900,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'RAISE', amount: 5 },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'implied', name: 'Implied Odds', nameKo: '임플라이드 오즈', maxScore: 60,
          checklistItems: ['임플라이드 오즈 개념을 설명했다', '셋 히트 시 충분한 스택을 언급했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 40,
          checklistItems: ['22 셋 마이닝 규칙(15x+ 스택)을 언급했다', 'BTN 포지션 어드밴티지를 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — 직접 팟 오즈는 부족하지만 임플라이드 오즈가 충분합니다. CO(100BB) 스택이 콜 비용(5BB)의 15-20배 이상이므로 셋 히트 시 큰 팟을 기대할 수 있습니다. BTN 포지션에서 셋 마이닝은 표준 플레이입니다.`,
      keyConceptTags: ['PotOdds', 'ImpliedOdds', 'SetMining', 'SmallPair'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-053', slug: 'two-pair-vs-flush-draw-board',
    title: '투 페어 vs 플러시 드로우 보드: 배팅 사이즈 결정',
    description: `플롭 후 히어로 CO IP. 보드에 플러시 드로우.

**상황:** 플롭 Q♣8♣3♦, 히어로 Q♥8♥(투 페어). BB 체크

배팅 사이즈는 얼마가 적절합니까?`,
    difficulty: 'INTERMEDIATE', category: 'POT_ODDS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: false },
        { position: 'SB', stackBB: 100, isHero: false, isActive: false },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'Q', suit: 'heart' }, { rank: '8', suit: 'heart' }],
      boardCards: [{ rank: 'Q', suit: 'club' }, { rank: '8', suit: 'club' }, { rank: '3', suit: 'diamond' }],
      potSize: 12, stage: 'FLOP', totalChips: 900,
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'sizing', name: 'Sizing', nameKo: '배팅 사이즈', maxScore: 60,
          checklistItems: ['플러시 드로우에게 나쁜 팟 오즈를 주는 배팅(75-100%)을 선택했다', '투 페어 보호 필요성을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 40,
          checklistItems: ['클럽 플러시 드로우에 불리한 팟 오즈를 제공함을 언급했다', '투 페어 밸류를 극대화 목적을 언급했다'] },
      ],
      modelAnswer: `**정답: 큰 배팅(팟의 75-100%)** — 투 페어는 클럽 플러시 드로우에 취약합니다. 큰 배팅으로 드로우에게 나쁜 팟 오즈를 제공해야 합니다. 팟의 75%인 9BB 배팅 시 드로우 팟 오즈: 9/21 = 43% > 에퀴티(36%)로 폴드를 유도할 수 있습니다.`,
      keyConceptTags: ['PotOdds', 'BettingSize', 'ProtectingHand', 'FlushDraw'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-054', slug: 'overcards-call-with-position',
    title: '오버카드 콜: 팟 오즈와 에퀴티',
    description: `플롭 후 히어로 BTN. BB가 반팟 배팅.

**상황:** 플롭 7♦4♠2♣, 히어로 A♥K♥(오버카드만). BB가 10BB 배팅

콜하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'POT_ODDS',
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
        { position: 'SB', stackBB: 100, isHero: false, isActive: false },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'heart' }, { rank: 'K', suit: 'heart' }],
      boardCards: [{ rank: '7', suit: 'diamond' }, { rank: '4', suit: 'spade' }, { rank: '2', suit: 'club' }],
      potSize: 20, stage: 'FLOP', totalChips: 900,
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'equity', name: 'Equity', nameKo: '에퀴티 계산', maxScore: 50,
          checklistItems: ['오버카드 6 아웃의 에퀴티를 계산했다(24%)', '팟 오즈(33%)와 비교했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['에퀴티(24%) < 팟 오즈(33%)임을 계산했다', 'AK의 역임플라이드 오즈를 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — AK 오버카드 6 아웃. 팟 오즈: 10/(20+10) = 33%. 에퀴티: 약 24%(리버까지). 에퀴티(24%) < 팟 오즈(33%), 콜은 -EV입니다. 또한 에이스/킹이 히트해도 BB의 세트/투 페어에 역임플라이드 오즈 위험이 있습니다.`,
      keyConceptTags: ['PotOdds', 'Overcards', 'ReverseImplied', 'Fold'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-055', slug: 'turn-call-combo-draw',
    title: '턴 콤보 드로우: 콜 또는 레이즈',
    description: `턴, 히어로 SB. CO가 배팅.

**상황:** 보드 J♠T♦8♠K♣, 히어로 Q♠9♠(넛 스트레이트 + 플러시 드로우). CO가 팟(30BB) 배팅

콜하시겠습니까, 레이즈하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'POT_ODDS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: false },
        { position: 'SB', stackBB: 100, isHero: true, isActive: true },
        { position: 'BB', stackBB: 100, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: 'Q', suit: 'spade' }, { rank: '9', suit: 'spade' }],
      boardCards: [
        { rank: 'J', suit: 'spade' }, { rank: 'T', suit: 'diamond' },
        { rank: '8', suit: 'spade' }, { rank: 'K', suit: 'club' },
      ],
      potSize: 60, stage: 'TURN', totalChips: 900,
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'combo', name: 'Combo Draw', nameKo: '콤보 드로우 계산', maxScore: 50,
          checklistItems: ['콤보 드로우의 총 아웃을 계산했다', '스트레이트+플러시 콤보의 강도를 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['레이즈가 콜보다 더 좋은 이유를 설명했다', '팟 오즈 외 폴드 에퀴티를 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈** — 넛 스트레이트(이미 완성: 9TJQK) + 스페이드 플러시 드로우. 실제로 스트레이트는 이미 완성이고 플러시 드로우(9 아웃)가 추가입니다. 넛 핸드로 레이즈하여 스택을 쌓는 것이 최선입니다.`,
      keyConceptTags: ['PotOdds', 'ComboDraw', 'NutStraight', 'Raise'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-056', slug: 'river-hero-call-thin',
    title: '리버 얇은 콜: 3rd 페어 팟 오즈',
    description: `리버, 히어로 BTN. BB가 작은 배팅(팟의 33%).

**상황:** 보드 A♥K♣8♦3♠6♥, 히어로 8♠7♠(미들 페어). BB가 8BB 배팅(팟 24BB)

콜하시겠습니까?`,
    difficulty: 'EXPERT', category: 'POT_ODDS',
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
        { position: 'SB', stackBB: 100, isHero: false, isActive: false },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '8', suit: 'spade' }, { rank: '7', suit: 'spade' }],
      boardCards: [
        { rank: 'A', suit: 'heart' }, { rank: 'K', suit: 'club' },
        { rank: '8', suit: 'diamond' }, { rank: '3', suit: 'spade' }, { rank: '6', suit: 'heart' },
      ],
      potSize: 32, stage: 'RIVER', totalChips: 900,
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'potodds', name: 'Pot Odds', nameKo: '팟 오즈 계산', maxScore: 50,
          checklistItems: ['팟 오즈를 계산했다(8/32 = 20%)', '필요 승률(20%)을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['BB의 작은 배팅이 블러프 가능성이 있음을 언급했다', '8 미들 페어가 충분한 블러프캐처임을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — 팟 오즈: 8/(24+8) = 25%. 리버에서 BB의 작은 배팅(33%)은 밸류/블러프 양쪽을 포함합니다. 8 미들 페어가 블러프 레인지를 이기면 콜이 +EV입니다. 보드 연결성이 낮아 블러프 빈도도 높습니다.`,
      keyConceptTags: ['PotOdds', 'River', 'ThinCall', 'BluffCatch'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-057', slug: 'turn-draw-price-raise',
    title: '턴 플러시 드로우: 레이즈로 가격 부과',
    description: `턴, 히어로 BB. BTN이 팟(20BB) 배팅.

**상황:** 보드 K♣Q♦8♣3♣, 히어로 A♣J♥(넛 플러시 드로우 + 오버카드). BTN 20BB 배팅

콜하시겠습니까, 레이즈하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'POT_ODDS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: true },
        { position: 'SB', stackBB: 100, isHero: false, isActive: false },
        { position: 'BB', stackBB: 100, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'club' }, { rank: 'J', suit: 'heart' }],
      boardCards: [
        { rank: 'K', suit: 'club' }, { rank: 'Q', suit: 'diamond' },
        { rank: '8', suit: 'club' }, { rank: '3', suit: 'club' },
      ],
      potSize: 40, stage: 'TURN', totalChips: 900,
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'outs', name: 'Outs', nameKo: '아웃 계산', maxScore: 50,
          checklistItems: ['넛 플러시 드로우 9 아웃 + 오버카드 추가 아웃을 계산했다', '레이즈의 이중 목적을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['반블러프 레이즈로 즉시 폴드 EV를 언급했다', '에퀴티 실현을 극대화하는 레이즈를 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈** — 넛 플러시 드로우(9 아웃) + AJ 오버카드. 총 에퀴티 약 40%. 콜하면 BTN이 리버에서 블러프/배팅으로 계속 압박할 수 있습니다. 레이즈로 즉시 폴드 EV를 얻거나 에퀴티를 실현하는 것이 최선입니다.`,
      keyConceptTags: ['PotOdds', 'SemiBluff', 'FlushDraw', 'Raise'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-058', slug: 'preflop-call-pots-odds-sb',
    title: 'SB: 작은 오픈에 큰 팟 오즈',
    description: `BB가 미니 레이즈(4BB). SB 히어로 차례.

**상황:** SB 100BB(히어로), 9♥8♥. BB가 미니 레이즈(4BB). UTG 오픈→BB 3벳 구조

콜하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'POT_ODDS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: false },
        { position: 'SB', stackBB: 100, isHero: true, isActive: true },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '9', suit: 'heart' }, { rank: '8', suit: 'heart' }],
      potSize: 9, stage: 'PREFLOP', totalChips: 900,
      actionSequence: [
        { position: 'UTG', action: 'RAISE', amount: 5 },
        { position: 'UTG+1', action: 'FOLD' }, { position: 'UTG+2', action: 'FOLD' },
        { position: 'LJ', action: 'FOLD' }, { position: 'HJ', action: 'FOLD' },
        { position: 'CO', action: 'FOLD' }, { position: 'BTN', action: 'FOLD' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'potodds', name: 'Pot Odds', nameKo: '팟 오즈 계산', maxScore: 50,
          checklistItems: ['팟 오즈를 계산했다', 'OOP(불리한 포지션) 단점을 언급했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['SB OOP 단점을 언급했다', 'UTG 오픈 레인지 대비 98s의 에퀴티를 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — SB에서 UTG 오픈 콜은 OOP(불리한 포지션)에서 시작합니다. 팟 오즈는 나쁘지 않지만(3.5/8.5 = 41%), SB에서 포스트플롭 불이익이 큽니다. 98s(수이티드)지만 UTG 레인지 대비 에퀴티 실현이 어렵습니다.`,
      keyConceptTags: ['PotOdds', 'OOP', 'SB', 'SuitedConnector'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-059', slug: 'three-way-pot-flush-draw-protection',
    title: '쓰리웨이 팟: 플러시 드로우 보호 배팅',
    description: `플롭 후 3명 남음. 히어로 CO IP.

**상황:** 플롭 A♦K♦8♥, 히어로 A♣K♥(탑 투 페어). BB, UTG 체크

배팅하시겠습니까? 사이즈는 얼마?`,
    difficulty: 'INTERMEDIATE', category: 'POT_ODDS',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 100, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 100, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 100, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 100, isHero: false, isActive: false },
        { position: 'SB', stackBB: 100, isHero: false, isActive: false },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'club' }, { rank: 'K', suit: 'heart' }],
      boardCards: [{ rank: 'A', suit: 'diamond' }, { rank: 'K', suit: 'diamond' }, { rank: '8', suit: 'heart' }],
      potSize: 18, stage: 'FLOP', totalChips: 900,
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'sizing', name: 'Sizing', nameKo: '배팅 사이즈', maxScore: 50,
          checklistItems: ['플러시 드로우에게 나쁜 팟 오즈를 주는 사이즈를 선택했다', '밸류와 보호 목적을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['다이아몬드 플러시 드로우 보호 필요성을 언급했다', '탑 투 페어 밸류 배팅을 언급했다'] },
      ],
      modelAnswer: `**정답: 큰 배팅(팟의 75%+)** — 탑 투 페어는 다이아몬드 플러시 드로우에 취약합니다. 팟의 75%(13.5BB) 배팅 시 드로우 팟 오즈: 13.5/31.5 = 43% > 에퀴티(36%)로 콜이 불리합니다. 두 명 상대로 큰 배팅이 필요합니다.`,
      keyConceptTags: ['PotOdds', 'TopTwoPair', 'Protection', 'Multiway'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-060', slug: 'call-oesd-multiway',
    title: '멀티웨이 OESD: 콜 여부',
    description: `플롭 후 4명 남음. 히어로 BB OOP.

**상황:** 플롭 9♣T♠J♦, 히어로 Q♥8♥(오픈 엔드 스트레이트 드로우). CO가 15BB 배팅, BTN/SB 폴드

콜하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'POT_ODDS',
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
      heroCards: [{ rank: 'Q', suit: 'heart' }, { rank: '8', suit: 'heart' }],
      boardCards: [{ rank: '9', suit: 'club' }, { rank: 'T', suit: 'spade' }, { rank: 'J', suit: 'diamond' }],
      potSize: 30, stage: 'FLOP', totalChips: 900,
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'outs', name: 'Outs', nameKo: '아웃 계산', maxScore: 50,
          checklistItems: ['OESD 8 아웃을 계산했다', '팟 오즈(33%)와 에퀴티(32%)를 비교했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 50,
          checklistItems: ['스트레이트 완성 시 임플라이드 오즈를 언급했다', '보드 연결성으로 스트레이트 히트 시 큰 팟 기대를 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — OESD 8 아웃. 팟 오즈: 15/(30+15) = 33%. 에퀴티(리버까지): 약 32%. 직접 팟 오즈는 살짝 불리하지만, 스트레이트 완성 시 CO의 강한 핸드(셋, 스트레이트 등)에서 큰 임플라이드 오즈를 기대할 수 있어 콜이 수익적입니다.`,
      keyConceptTags: ['PotOdds', 'OESD', 'ImpliedOdds', 'Call'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-061', slug: 'river-fold-bad-potodds',
    title: '리버 콜: 팟 오즈 계산 후 폴드',
    description: `리버, 히어로 BTN. BB가 대형 오버배팅(팟의 2배).

**상황:** 보드 A♠8♣5♦2♥9♠, 히어로 8♥7♥(세컨드 페어). BB가 60BB 배팅(팟 30BB)

콜하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'POT_ODDS',
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
        { position: 'SB', stackBB: 100, isHero: false, isActive: false },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '8', suit: 'heart' }, { rank: '7', suit: 'heart' }],
      boardCards: [
        { rank: 'A', suit: 'spade' }, { rank: '8', suit: 'club' },
        { rank: '5', suit: 'diamond' }, { rank: '2', suit: 'heart' }, { rank: '9', suit: 'spade' },
      ],
      potSize: 90, stage: 'RIVER', totalChips: 900,
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'potodds', name: 'Pot Odds', nameKo: '팟 오즈 계산', maxScore: 60,
          checklistItems: ['팟 오즈를 계산했다(60/90 = 40%)', '필요 승률(40%)이 실제 에퀴티보다 높음을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 40,
          checklistItems: ['오버배팅이 강한 밸류 레인지를 나타냄을 언급했다', '세컨드 페어가 이 레인지를 이기기 어려움을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — 팟 오즈: 60/(30+60) = 40%. 리버 오버배팅(2배)은 매우 강한 밸류 레인지(세트, 스트레이트, 투 페어)를 나타냅니다. 8 세컨드 페어가 이 레인지를 이길 확률은 40%보다 훨씬 낮습니다. 폴드가 최선입니다.`,
      keyConceptTags: ['PotOdds', 'River', 'Overbet', 'Fold'],
    },
    publishedAt: D, createdAt: D,
  },
]

import type { Problem } from '@/types'

const D = '2024-01-01T00:00:00.000Z'

export const BLUFF_CATCH_PROBLEMS: Problem[] = [
  {
    id: 'prob-076', slug: 'river-bluff-catch-second-pair-ak-board',
    title: '리버 블러프캐치 — AK 보드 세컨 페어',
    description: `BTN이 프리플롭 레이즈, BB(히어로)가 콜. 플롭 A♠K♣4♥ — 히어로 체크, BTN이 7BB 배팅, 히어로 콜. 턴 3♦ — 히어로 체크, BTN이 15BB 배팅, 히어로 콜. 리버 9♠ — 히어로 체크, BTN이 30BB 올인.

**상황:** 히어로 JJ(♦J ♠J), 팟 55BB, BTN 스택 30BB(올인).

JJ로 세컨 페어(J < K < A)를 가진 상태에서 BTN의 리버 올인을 콜하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'BLUFF_CATCH',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 45, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 42, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 38, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 44, isHero: false, isActive: false },
        { position: 'CO', stackBB: 36, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 30, isHero: false, isActive: true },
        { position: 'SB', stackBB: 50, isHero: false, isActive: false },
        { position: 'BB', stackBB: 55, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'J', suit: 'diamond' }, { rank: 'J', suit: 'spade' }],
      boardCards: [
        { rank: 'A', suit: 'spade' }, { rank: 'K', suit: 'club' },
        { rank: '4', suit: 'heart' }, { rank: '3', suit: 'diamond' },
        { rank: '9', suit: 'spade' },
      ],
      potSize: 55, stage: 'RIVER', tournamentStage: 'MIDDLE', totalChips: 380,
      actionSequence: [
        { position: 'BTN', action: 'RAISE' }, { position: 'BB', action: 'CALL' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['폴드를 선택했다', 'BTN의 트리플 배럴이 밸류 헤비임을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['AK 보드에서 BTN 레인지가 AK, AA, KK, Ax로 밸류 헤비임을 언급했다', '리버 30BB 오버배팅의 폴라라이즈드 의미를 언급했다', 'JJ의 블러프캐치 가치가 낮음을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — AK 보드에서 BTN의 트리플 배럴 + 리버 올인은 Ax, Kx, AK, 세트를 강하게 암시합니다. JJ는 이 보드에서 블러프캐치로 적합하지 않습니다. BTN의 블러프는 QJ, JT 등 거트샷 미스 정도이나, 올인까지 가는 경우는 밸류가 압도적으로 많습니다.`,
      keyConceptTags: ['BluffCatch', 'TripleBarrel', 'PolarizedRange', 'Fold'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-077', slug: 'river-call-top-pair-vs-small-bet',
    title: '리버 콜 — 탑 페어 vs 소형 배팅',
    description: `CO가 오픈, BTN(히어로)이 콜. 플롭 Q♦7♣2♠ — CO 7BB 배팅, BTN 콜. 턴 T♥ — CO 체크, BTN 체크. 리버 5♣ — CO가 8BB 소형 배팅.

**상황:** 히어로 Q♠J♦(탑 페어 J 키커), 팟 30BB, CO 배팅 8BB.

CO의 소형 리버 배팅에 탑 페어로 콜하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'BLUFF_CATCH',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 42, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 35, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 44, isHero: false, isActive: false },
        { position: 'CO', stackBB: 50, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 55, isHero: true, isActive: true },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 35, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: 'Q', suit: 'spade' }, { rank: 'J', suit: 'diamond' }],
      boardCards: [
        { rank: 'Q', suit: 'diamond' }, { rank: '7', suit: 'club' },
        { rank: '2', suit: 'spade' }, { rank: 'T', suit: 'heart' },
        { rank: '5', suit: 'club' },
      ],
      potSize: 30, stage: 'RIVER', tournamentStage: 'MIDDLE', totalChips: 369,
      actionSequence: [
        { position: 'CO', action: 'RAISE' }, { position: 'BTN', action: 'CALL' },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['콜을 선택했다', '소형 배팅의 폴라라이즈드 특성을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['8BB/30BB = 21% 팟 오즈를 계산했다', 'CO 소형 배팅이 블러프(미스 드로우)와 씬 밸류의 혼합임을 언급했다', 'QJ 탑 페어가 이 팟 오즈에서 수익적 콜임을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — CO의 8BB 소형 배팅은 팟의 27%로 27% 이하의 에퀴티면 콜이 수익적입니다. 탑 페어(Q)는 CO의 레인지 중 블러프(미스 드로우 등)에 이기며, 소형 배팅은 밸류가 확실하지 않을 때 쓰는 경우가 많아 QJ로 콜이 맞습니다.`,
      keyConceptTags: ['PotOdds', 'BluffCatch', 'SmallBet', 'TopPair'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-078', slug: 'river-fold-vs-triple-barrel-ak',
    title: '리버 폴드 — 트리플 배럴 vs 언더페어',
    description: `UTG가 오픈, BB(히어로)가 콜. 플롭 A♠K♦8♣ — 히어로 체크, UTG 12BB 배팅, 히어로 콜. 턴 J♥ — 히어로 체크, UTG 22BB 배팅, 히어로 콜. 리버 2♦ — 히어로 체크, UTG 45BB 오버베팅.

**상황:** 히어로 T♠T♥(언더페어), 팟 75BB, UTG 45BB 배팅.

AKJ 보드에서 TT 언더페어로 UTG의 트리플 배럴 오버베팅에 콜하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'BLUFF_CATCH',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 80, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 38, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'CO', stackBB: 36, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 50, isHero: false, isActive: false },
        { position: 'SB', stackBB: 44, isHero: false, isActive: false },
        { position: 'BB', stackBB: 75, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'T', suit: 'spade' }, { rank: 'T', suit: 'heart' }],
      boardCards: [
        { rank: 'A', suit: 'spade' }, { rank: 'K', suit: 'diamond' },
        { rank: '8', suit: 'club' }, { rank: 'J', suit: 'heart' },
        { rank: '2', suit: 'diamond' },
      ],
      potSize: 75, stage: 'RIVER', tournamentStage: 'MIDDLE', totalChips: 450,
      actionSequence: [
        { position: 'UTG', action: 'RAISE' }, { position: 'BB', action: 'CALL' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['폴드를 선택했다', 'AKJ 보드에서 TT의 불리함을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['UTG 타이트 레인지가 이 보드에서 밸류 헤비임을 언급했다', '45BB/75BB = 60% 팟 오즈 필요 — TT로 충족 불가를 언급했다', 'TT는 AKJ 보드에서 AK, AA, KK, JJ, QT 등에 이미 진 상태임을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — AKJ 보드에서 UTG 트리플 배럴 오버베팅(60% 팟)은 Ax, Kx, JJ+, AJ, KJ 등 극히 강한 밸류를 의미합니다. TT는 이 보드에서 A, K, J 모두 언더페어이며, 60% 에퀴티 달성 불가능하므로 폴드가 정답입니다.`,
      keyConceptTags: ['TripleBarrel', 'Overbet', 'Fold', 'UnderPair'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-079', slug: 'river-call-flush-blocker-bluffcatch',
    title: '리버 블러프캐치 — 플러시 블로커 보유',
    description: `BTN이 오픈, BB(히어로)가 콜. 플롭 9♦6♦2♣ — 히어로 체크, BTN 8BB 배팅, 히어로 콜. 턴 K♥ — 히어로 체크, BTN 체크. 리버 T♦ — 히어로 체크, BTN 25BB 배팅.

**상황:** 히어로 A♦8♠(♦ 블로커 + 에이스 하이), 팟 40BB, BTN 25BB 배팅.

플러시 보드에서 A♦ 블로커를 보유한 채 BTN의 리버 배팅에 콜하시겠습니까?`,
    difficulty: 'EXPERT', category: 'BLUFF_CATCH',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 44, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 60, isHero: false, isActive: true },
        { position: 'SB', stackBB: 35, isHero: false, isActive: false },
        { position: 'BB', stackBB: 50, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'diamond' }, { rank: '8', suit: 'spade' }],
      boardCards: [
        { rank: '9', suit: 'diamond' }, { rank: '6', suit: 'diamond' },
        { rank: '2', suit: 'club' }, { rank: 'K', suit: 'heart' },
        { rank: 'T', suit: 'diamond' },
      ],
      potSize: 40, stage: 'RIVER', tournamentStage: 'MIDDLE', totalChips: 390,
      actionSequence: [
        { position: 'BTN', action: 'RAISE' }, { position: 'BB', action: 'CALL' },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['콜을 선택했다', 'A♦ 블로커의 의미를 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['A♦를 보유하면 상대의 넛 플러시(A♦ X♦) 가능성이 제거됨을 언급했다', '25BB/65BB = 38% 팟 오즈 계산을 언급했다', 'BTN 턴 체크 → 리버 배팅 패턴이 블러프 가능성을 높임을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — A♦를 보유하면 BTN의 넛 플러시(A♦X♦) 가능성을 차단합니다. BTN이 턴을 체크했다는 것은 강한 플러시 메이드가 없을 가능성을 암시합니다. 팟 오즈 38%에서 미스 드로우 블러프를 고려하면 콜이 +EV입니다.`,
      keyConceptTags: ['Blocker', 'FlushDraw', 'BluffCatch', 'PotOdds'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-080', slug: 'river-fold-strong-hand-polarized-range',
    title: '리버 폴드 — 강한 핸드 vs 폴라라이즈드 올인',
    description: `SB가 3-bet, BTN(히어로)이 콜. 플롭 5♠5♣2♦ — SB 체크, BTN 체크. 턴 Q♦ — SB 20BB 배팅, BTN 콜. 리버 Q♠ — SB 올인 80BB.

**상황:** 히어로 K♦K♥(KK 오버페어), 보드 5♠5♣2♦Q♦Q♠, 팟 55BB, SB 80BB 올인.

KK 오버페어로 SB의 리버 올인에 콜하시겠습니까?`,
    difficulty: 'EXPERT', category: 'BLUFF_CATCH',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 44, isHero: false, isActive: false },
        { position: 'CO', stackBB: 36, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 65, isHero: true, isActive: true },
        { position: 'SB', stackBB: 80, isHero: false, isActive: true },
        { position: 'BB', stackBB: 50, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: 'K', suit: 'diamond' }, { rank: 'K', suit: 'heart' }],
      boardCards: [
        { rank: '5', suit: 'spade' }, { rank: '5', suit: 'club' },
        { rank: '2', suit: 'diamond' }, { rank: 'Q', suit: 'diamond' },
        { rank: 'Q', suit: 'spade' },
      ],
      potSize: 55, stage: 'RIVER', tournamentStage: 'MIDDLE', totalChips: 440,
      actionSequence: [
        { position: 'SB', action: 'RAISE' }, { position: 'BTN', action: 'CALL' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['폴드를 선택했다', 'QQ 보드에서 KK의 블로커 가치가 없음을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['보드 QQ 페어로 SB의 QX, Q5, 55가 풀하우스/쿼드를 형성함을 언급했다', '80BB/135BB = 59% 에퀴티 필요 — KK로 달성 불가를 언급했다', 'SB 3-bet 레인지에 QQ, 55, Qx 핸드가 포함됨을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — 보드 QQ55에서 SB의 3-bet 레인지에는 QQ(풀하우스), 55(같은 보드), Qx(트립스+) 등 KK를 꺾는 핸드가 많습니다. 80BB 오버베팅은 극단적으로 폴라라이즈드이며, KK는 59% 에퀴티가 필요하나 이 보드에서 달성 불가입니다.`,
      keyConceptTags: ['Fold', 'OverbetPolarized', 'FullHouse', 'PairedBoard'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-081', slug: 'river-call-second-pair-small-stab',
    title: '리버 콜 — 세컨 페어 vs 소형 스탭',
    description: `HJ가 오픈, CO(히어로)가 콜. 플롭 8♥7♣2♠ — HJ 체크, 히어로 체크. 턴 K♦ — HJ 체크, 히어로 체크. 리버 J♠ — HJ 12BB 소형 배팅.

**상황:** 히어로 8♠6♦(세컨 페어), 팟 35BB, HJ 12BB 배팅.

HJ의 소형 리버 스탭에 세컨 페어로 콜하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'BLUFF_CATCH',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 42, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 55, isHero: false, isActive: true },
        { position: 'CO', stackBB: 50, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 44, isHero: false, isActive: false },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 40, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: '8', suit: 'spade' }, { rank: '6', suit: 'diamond' }],
      boardCards: [
        { rank: '8', suit: 'heart' }, { rank: '7', suit: 'club' },
        { rank: '2', suit: 'spade' }, { rank: 'K', suit: 'diamond' },
        { rank: 'J', suit: 'spade' },
      ],
      potSize: 35, stage: 'RIVER', tournamentStage: 'MIDDLE', totalChips: 375,
      actionSequence: [
        { position: 'HJ', action: 'RAISE' }, { position: 'CO', action: 'CALL' },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['콜을 선택했다', 'HJ 더블체크 후 소형 배팅의 의미를 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['HJ가 플롭+턴 모두 체크한 것은 강한 핸드가 아님을 암시함을 언급했다', '12BB/47BB = 26% 팟 오즈로 콜이 수익적임을 언급했다', '소형 배팅은 씬 밸류/블러프 프로브임을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — HJ가 플롭과 턴을 모두 체크한 것은 탑페어+보다 약한 핸드임을 암시합니다. 소형 배팅(12BB/47BB = 26%)은 26% 에퀴티만 있으면 콜이 수익적입니다. 세컨 페어(8)는 HJ의 에어/미스 블러프에 이기며 콜이 맞습니다.`,
      keyConceptTags: ['BluffCatch', 'SecondPair', 'SmallBet', 'PotOdds'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-082', slug: 'river-fold-second-pair-overbet-scary-board',
    title: '리버 폴드 — 스케어 카드 오버베팅 vs 세컨 페어',
    description: `BTN이 오픈, SB(히어로)가 3-bet, BTN 콜. 플롭 J♥9♦4♣ — 히어로 15BB 배팅, BTN 콜. 턴 A♠ — 히어로 체크, BTN 25BB 배팅, 히어로 콜. 리버 A♣ — 히어로 체크, BTN 70BB 오버베팅.

**상황:** 히어로 J♣T♦(세컨 페어, J 페어), 팟 90BB, BTN 70BB 오버베팅.

AA 더블페어 보드에서 BTN의 리버 오버베팅에 JT 세컨 페어로 콜하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'BLUFF_CATCH',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 44, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 70, isHero: false, isActive: true },
        { position: 'SB', stackBB: 65, isHero: true, isActive: true },
        { position: 'BB', stackBB: 40, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: 'J', suit: 'club' }, { rank: 'T', suit: 'diamond' }],
      boardCards: [
        { rank: 'J', suit: 'heart' }, { rank: '9', suit: 'diamond' },
        { rank: '4', suit: 'club' }, { rank: 'A', suit: 'spade' },
        { rank: 'A', suit: 'club' },
      ],
      potSize: 90, stage: 'RIVER', tournamentStage: 'MIDDLE', totalChips: 420,
      actionSequence: [
        { position: 'BTN', action: 'RAISE' }, { position: 'SB', action: 'RAISE' },
        { position: 'BTN', action: 'CALL' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['폴드를 선택했다', 'AA 더블페어 보드에서 JT의 블러프캐치 가치를 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['AA 보드에서 BTN 콜링 레인지에 Ax, AK, AJ 등이 포함됨을 언급했다', '70BB/160BB = 44% 에퀴티 필요 — JT로 달성 불가를 언급했다', 'BTN이 오버배팅하는 것은 Ax 트립스 이상임을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — AA 리버에서 BTN의 77% 팟 오버베팅은 Ax(트립스), AJ, AK, AA(쿼드) 등 극강 밸류를 암시합니다. JT 세컨 페어로 44% 에퀴티 달성이 불가능하므로 폴드가 정답입니다.`,
      keyConceptTags: ['Fold', 'PairedBoard', 'Overbet', 'TripsBoard'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-083', slug: 'river-bluff-catch-ace-high-low-board',
    title: '리버 블러프캐치 — 에이스 하이 vs 저보드',
    description: `CO가 오픈, BB(히어로)가 콜. 플롭 7♠4♦2♣ — 히어로 체크, CO 8BB 배팅, 히어로 콜. 턴 3♥ — 히어로 체크, CO 체크. 리버 9♠ — 히어로 체크, CO 20BB 배팅.

**상황:** 히어로 A♠K♦(에이스 하이, 미스), 팟 35BB, CO 20BB 배팅.

저 보드에서 에이스 하이로 CO의 리버 배팅에 콜하시겠습니까?`,
    difficulty: 'ADVANCED', category: 'BLUFF_CATCH',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 55, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 44, isHero: false, isActive: false },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 50, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'spade' }, { rank: 'K', suit: 'diamond' }],
      boardCards: [
        { rank: '7', suit: 'spade' }, { rank: '4', suit: 'diamond' },
        { rank: '2', suit: 'club' }, { rank: '3', suit: 'heart' },
        { rank: '9', suit: 'spade' },
      ],
      potSize: 35, stage: 'RIVER', tournamentStage: 'MIDDLE', totalChips: 380,
      actionSequence: [
        { position: 'CO', action: 'RAISE' }, { position: 'BB', action: 'CALL' },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['콜을 선택했다', '저 보드에서 AK의 블러프캐치 가치를 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['CO 레인지에 미스 드로우(AK, AQ, KQ 등)가 많음을 언급했다', '20BB/55BB = 36% 팟 오즈를 계산했다', 'CO 턴 체크가 약점을 암시함을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — 7432-9 보드는 CO 오픈 레인지의 대부분(AK, AQ, 고급 수이티드 핸드)이 미스하는 보드입니다. CO의 턴 체크는 강한 핸드가 없음을 암시하며, 리버 배팅은 블러프일 가능성이 높습니다. 팟 오즈 36%에서 AK 하이로 콜이 수익적입니다.`,
      keyConceptTags: ['BluffCatch', 'AceHigh', 'LowBoard', 'MissedDraw'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-084', slug: 'river-thin-value-call-pair-of-nines',
    title: '리버 씬밸류 콜 — 9 페어 vs 소형 배팅',
    description: `BTN이 오픈, BB(히어로)가 콜. 플롭 9♦6♣3♠ — 히어로 체크, BTN 6BB 배팅, 히어로 콜. 턴 T♥ — 히어로 체크, BTN 체크. 리버 4♦ — 히어로 체크, BTN 10BB 소형 배팅.

**상황:** 히어로 9♠8♦(탑 페어), 팟 30BB, BTN 10BB 배팅.

9 페어 탑 페어로 BTN의 소형 리버 배팅에 콜하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'BLUFF_CATCH',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 44, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 55, isHero: false, isActive: true },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 50, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: '9', suit: 'spade' }, { rank: '8', suit: 'diamond' }],
      boardCards: [
        { rank: '9', suit: 'diamond' }, { rank: '6', suit: 'club' },
        { rank: '3', suit: 'spade' }, { rank: 'T', suit: 'heart' },
        { rank: '4', suit: 'diamond' },
      ],
      potSize: 30, stage: 'RIVER', tournamentStage: 'MIDDLE', totalChips: 380,
      actionSequence: [
        { position: 'BTN', action: 'RAISE' }, { position: 'BB', action: 'CALL' },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['콜을 선택했다', '9 탑 페어가 이 팟 오즈에서 수익적 콜임을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['10BB/40BB = 25% 팟 오즈를 계산했다', 'BTN 턴 체크가 약한 핸드를 암시함을 언급했다', '소형 배팅의 블러프/씬밸류 혼합 특성을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — 10BB/40BB = 25% 팟 오즈입니다. BTN이 턴을 체크했고 소형 배팅은 확실한 밸류가 아닌 경우가 많습니다. 9 탑 페어는 에어와 미스 드로우를 이기며, 25% 에퀴티는 충분히 달성 가능합니다.`,
      keyConceptTags: ['PotOdds', 'TopPair', 'SmallBet', 'CallCriteria'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-085', slug: 'river-fold-underpair-heavy-action',
    title: '리버 폴드 — 언더페어 vs 오버베팅 재레이즈',
    description: `UTG가 오픈, HJ(히어로)가 3-bet, UTG 콜. 플롭 A♣K♦5♥ — 히어로 15BB 배팅, UTG 콜. 턴 J♦ — 히어로 20BB 배팅, UTG 레이즈 55BB, 히어로 콜. 리버 2♠ — UTG 올인 80BB.

**상황:** 히어로 Q♦Q♣(QQ 오버페어 → AKJ 보드 언더페어), 팟 160BB, UTG 80BB 올인.

AKJ 보드에서 QQ로 UTG의 리버 올인에 콜하시겠습니까?`,
    difficulty: 'EXPERT', category: 'BLUFF_CATCH',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'HJ',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: true, isActive: true },
        { position: 'CO', stackBB: 44, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 36, isHero: false, isActive: false },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 40, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: 'Q', suit: 'diamond' }, { rank: 'Q', suit: 'club' }],
      boardCards: [
        { rank: 'A', suit: 'club' }, { rank: 'K', suit: 'diamond' },
        { rank: '5', suit: 'heart' }, { rank: 'J', suit: 'diamond' },
        { rank: '2', suit: 'spade' },
      ],
      potSize: 160, stage: 'RIVER', tournamentStage: 'MIDDLE', totalChips: 475,
      actionSequence: [
        { position: 'UTG', action: 'RAISE' }, { position: 'HJ', action: 'RAISE' },
        { position: 'UTG', action: 'CALL' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['폴드를 선택했다', 'AKJ 보드에서 QQ의 심각한 에퀴티 열세를 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['UTG의 타이트 레인지가 AK, AA, KK, JJ를 다수 포함함을 언급했다', '턴 레이즈 후 리버 올인은 넛급 핸드임을 언급했다', '80BB/240BB = 33% 에퀴티 필요 — QQ로 AKJ 보드에서 달성 불가를 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — UTG 콜 3-bet 레인지에는 AA, KK, QQ, JJ, AK가 포함됩니다. AKJ 보드에서 히어로의 QQ는 이미 Ax, Kx, Jx에 모두 피트되어 있으며, 턴 레이즈+리버 올인은 AK, AJ, KJ, JJ, AA, KK 등 넛급임을 의미합니다. 폴드가 정답입니다.`,
      keyConceptTags: ['Fold', 'Overpair', 'HighBoard', 'TurnRaiseRiverJam'],
    },
    publishedAt: D, createdAt: D,
  },
]

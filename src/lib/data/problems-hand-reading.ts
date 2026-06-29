import type { Problem } from '@/types'

const D = '2024-01-01T00:00:00.000Z'

export const HAND_READING_PROBLEMS: Problem[] = [
  {
    id: 'prob-086', slug: 'hand-reading-narrow-range-two-barrel',
    title: '핸드 리딩 — 투 배럴 레인지 좁히기',
    description: `UTG가 오픈(3BB), CO(히어로)가 콜. 플롭 K♠Q♦5♣ — UTG 8BB 배팅, 히어로 콜. 턴 7♥ — UTG 20BB 배팅.

**상황:** 히어로 J♠T♠(오픈엔더 + 오버카드), 팟 39BB, UTG 20BB 배팅.

UTG의 투 배럴 패턴을 고려하면 히어로 JT로 어떤 액션이 맞습니까?`,
    difficulty: 'ADVANCED', category: 'HAND_READING',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 70, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 38, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'CO', stackBB: 65, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 44, isHero: false, isActive: false },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 40, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: 'J', suit: 'spade' }, { rank: 'T', suit: 'spade' }],
      boardCards: [
        { rank: 'K', suit: 'spade' }, { rank: 'Q', suit: 'diamond' },
        { rank: '5', suit: 'club' }, { rank: '7', suit: 'heart' },
      ],
      potSize: 39, stage: 'TURN', tournamentStage: 'MIDDLE', totalChips: 414,
      actionSequence: [
        { position: 'UTG', action: 'RAISE' }, { position: 'CO', action: 'CALL' },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['콜을 선택했다', 'JTs 오픈엔더의 에퀴티를 인식했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['UTG 투 배럴이 KQ, KK, QQ 등 밸류 헤비임을 언급했다', 'JTs 오픈엔더(A9, 오버카드 포함) 에퀴티가 약 35%임을 언급했다', '리버 스트레이트 완성 시 역레버리지 효과를 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — JTs는 A9/오픈엔더로 약 35% 에퀴티를 보유합니다. 20BB/79BB = 25% 팟 오즈로 콜이 수익적입니다. UTG 투 배럴은 KQ, Kx 위주지만 JTs의 에퀴티가 충분합니다.`,
      keyConceptTags: ['HandReading', 'OpenEnder', 'DrawEquity', 'TwoBarrel'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-087', slug: 'hand-reading-cbet-range-advantage',
    title: '핸드 리딩 — 레인지 어드밴티지 분석',
    description: `BTN이 오픈(2.5BB), BB(히어로)가 콜. 플롭 A♥7♦2♠ — 히어로가 체크.

**상황:** 히어로 A♣3♣(탑 페어 약 키커), BTN이 체크백.

BTN의 플롭 체크백은 무엇을 의미하며, 턴에서 히어로의 액션은?`,
    difficulty: 'INTERMEDIATE', category: 'HAND_READING',
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
      heroCards: [{ rank: 'A', suit: 'club' }, { rank: '3', suit: 'club' }],
      boardCards: [
        { rank: 'A', suit: 'heart' }, { rank: '7', suit: 'diamond' },
        { rank: '2', suit: 'spade' },
      ],
      potSize: 8, stage: 'FLOP', tournamentStage: 'MIDDLE', totalChips: 380,
      actionSequence: [
        { position: 'BTN', action: 'RAISE' }, { position: 'BB', action: 'CALL' },
      ],
    },
    correctAction: 'CHECK',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['체크(또는 소형 배팅)를 선택했다', 'BTN 체크백의 의미를 분석했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['BTN 체크백이 Ax 미보유 또는 포켓 페어 중간(TT-QQ)임을 언급했다', 'A3o는 체크로 벨류를 보호하면서 블러프 인두싱이 가능함을 언급했다', 'BTN 레인지를 좁혀 약한 포켓페어 또는 드로우임을 언급했다'] },
      ],
      modelAnswer: `**정답: 체크** — BTN의 플롭 체크백은 AK, AQ 등 강한 Ax를 대부분 제외합니다. BTN은 포켓 페어(TT-QQ) 또는 미드카드 드로우가 많습니다. A3의 히어로는 체크로 BTN의 블러프를 유도하거나, 턴에서 소형 배팅으로 씬밸류를 추출할 수 있습니다.`,
      keyConceptTags: ['HandReading', 'CheckBack', 'RangeAdvantage', 'ThinValue'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-088', slug: 'hand-reading-3bet-pot-oop',
    title: '핸드 리딩 — 3-bet 팟 OOP 레인지',
    description: `SB(히어로)가 3-bet(9BB), BTN 콜. 플롭 8♦6♠3♥ — 히어로가 배팅 선택.

**상황:** 히어로 A♠K♦(오버카드 2장, 백도어 넛 플러시 드로우), 팟 18BB.

3-bet 팟 OOP에서 AK 미스 플롭, C-bet 여부?`,
    difficulty: 'ADVANCED', category: 'HAND_READING',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 44, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 60, isHero: false, isActive: true },
        { position: 'SB', stackBB: 55, isHero: true, isActive: true },
        { position: 'BB', stackBB: 40, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: 'A', suit: 'spade' }, { rank: 'K', suit: 'diamond' }],
      boardCards: [
        { rank: '8', suit: 'diamond' }, { rank: '6', suit: 'spade' },
        { rank: '3', suit: 'heart' },
      ],
      potSize: 18, stage: 'FLOP', tournamentStage: 'MIDDLE', totalChips: 400,
      actionSequence: [
        { position: 'BTN', action: 'RAISE' }, { position: 'SB', action: 'RAISE' },
        { position: 'BTN', action: 'CALL' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['C-bet(레이즈/배팅)을 선택했다', '3-bet 팟 C-bet의 논리를 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['3-bet 팟에서 히어로의 레인지 어드밴티지(AA,KK,QQ,AK)를 언급했다', '863 드라이 보드는 BTN 콜링 레인지 히트가 낮음을 언급했다', 'AK의 에퀴티(두 오버카드)로 반블러프 C-bet이 수익적임을 언급했다'] },
      ],
      modelAnswer: `**정답: C-bet** — 3-bet 팟에서 히어로의 SB 3-bet 레인지(AA, KK, QQ, JJ, AK)가 863 보드를 지배합니다. BTN 콜링 레인지(포켓 페어, 수이티드 커넥터)는 이 보드에서 자주 미스합니다. AK는 두 오버카드 에퀴티를 가진 반블러프 C-bet으로 +EV입니다.`,
      keyConceptTags: ['HandReading', 'ThreeBetPot', 'CBet', 'RangeAdvantage'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-089', slug: 'hand-reading-turn-check-raise',
    title: '핸드 리딩 — 턴 체크레이즈 의미 분석',
    description: `CO가 오픈, BTN(히어로)이 콜. 플롭 T♥9♦4♣ — CO 8BB, 히어로 콜. 턴 J♥ — CO 16BB 배팅, 히어로가 레이즈 검토.

**상황:** 히어로 8♠7♠(스트레이트 메이드! T9J8), 팟 34BB, CO 16BB 배팅.

스트레이트 메이드로 CO의 배팅에 체크레이즈가 맞습니까?`,
    difficulty: 'INTERMEDIATE', category: 'HAND_READING',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 55, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 60, isHero: true, isActive: true },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 40, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: '8', suit: 'spade' }, { rank: '7', suit: 'spade' }],
      boardCards: [
        { rank: 'T', suit: 'heart' }, { rank: '9', suit: 'diamond' },
        { rank: '4', suit: 'club' }, { rank: 'J', suit: 'heart' },
      ],
      potSize: 34, stage: 'TURN', tournamentStage: 'MIDDLE', totalChips: 386,
      actionSequence: [
        { position: 'CO', action: 'RAISE' }, { position: 'BTN', action: 'CALL' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['레이즈를 선택했다', '스트레이트 메이드의 강도를 인식했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['87s 스트레이트(J-high straight)가 이 보드에서 최강 핸드에 가까움을 언급했다', 'CO의 투 페어(TJ, 9J)나 세트가 지속 배팅할 가능성이 높아 레이즈로 밸류 추출이 가능함을 언급했다', '플러시 드로우나 Q8 등 상위 스트레이트 가능성이 낮음을 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈** — 87s는 T-9-4-J 보드에서 8-7-6-5 또는 J-T-9-8 스트레이트를 완성합니다. 여기서는 8-high(8-7 → J-T-9-8) 스트레이트가 메이드입니다. CO의 투 페어(TJ, 9J 등)나 세트를 상대로 레이즈하여 밸류를 최대한 추출해야 합니다.`,
      keyConceptTags: ['HandReading', 'Straight', 'ValueBet', 'TurnRaise'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-090', slug: 'hand-reading-villain-limp-range',
    title: '핸드 리딩 — 림퍼 레인지 좁히기',
    description: `UTG가 림프, 모두 폴드, BTN(히어로)이 레이즈(7BB), BB 폴드, UTG 콜. 플롭 A♠J♦3♣ — UTG 체크.

**상황:** 히어로 K♠K♣(KK 오버페어), 팟 15BB.

UTG 림프-콜 레인지 분석: 히어로가 K-K 오버페어로 C-bet을 해야 하나요?`,
    difficulty: 'INTERMEDIATE', category: 'HAND_READING',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 44, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 55, isHero: true, isActive: true },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 40, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: 'K', suit: 'spade' }, { rank: 'K', suit: 'club' }],
      boardCards: [
        { rank: 'A', suit: 'spade' }, { rank: 'J', suit: 'diamond' },
        { rank: '3', suit: 'club' },
      ],
      potSize: 15, stage: 'FLOP', tournamentStage: 'MIDDLE', totalChips: 370,
      actionSequence: [
        { position: 'UTG', action: 'LIMP' }, { position: 'BTN', action: 'RAISE' },
        { position: 'UTG', action: 'CALL' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['C-bet(레이즈/배팅)을 선택했다', 'UTG 림프-콜 레인지에서 Ax 비율을 분석했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['림프-콜 레인지는 AK, AQ 같은 강한 Ax보다 중간 포켓페어와 수이티드 핸드가 많음을 언급했다', 'KK는 이 보드에서 많은 UTG 림프-콜 핸드에 여전히 우위임을 언급했다', 'C-bet으로 포켓 페어(TT-QQ)나 미스 핸드를 폴드시킬 수 있음을 언급했다'] },
      ],
      modelAnswer: `**정답: C-bet** — UTG 림프-콜은 보통 중간 포켓 페어(77-JJ), 수이티드 커넥터, 약한 Ax 위주입니다. AK/AQ는 대부분 재레이즈합니다. KK는 포켓 페어와 미드 Ax에 앞서며, C-bet으로 폴드 에퀴티를 얻는 것이 맞습니다.`,
      keyConceptTags: ['HandReading', 'LimpCall', 'RangeAnalysis', 'CBet'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-091', slug: 'hand-reading-donk-bet-interpretation',
    title: '핸드 리딩 — 돈크 배팅 해석',
    description: `CO가 오픈, BTN(히어로)이 콜. 플롭 K♦8♣3♥ — BB가 갑자기 15BB 리드 배팅.

**상황:** 히어로 A♣K♥(탑 페어 탑 키커), 팟 9BB, BB 15BB 돈크 배팅.

BB의 돈크 배팅에 어떻게 대응합니까?`,
    difficulty: 'ADVANCED', category: 'HAND_READING',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 55, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 60, isHero: true, isActive: true },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 45, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'club' }, { rank: 'K', suit: 'heart' }],
      boardCards: [
        { rank: 'K', suit: 'diamond' }, { rank: '8', suit: 'club' },
        { rank: '3', suit: 'heart' },
      ],
      potSize: 9, stage: 'FLOP', tournamentStage: 'MIDDLE', totalChips: 391,
      actionSequence: [
        { position: 'CO', action: 'RAISE' }, { position: 'BTN', action: 'CALL' },
        { position: 'BB', action: 'CALL' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['레이즈(3-bet)를 선택했다', '돈크 배팅 레인지에 대응하는 방법을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['BB 돈크 배팅이 K8, K3, 88, 33 등 강한 메이드 또는 세미블러프임을 언급했다', 'AK는 탑 페어 탑 키커로 레이즈하여 약한 Kx나 블러프를 이기는 밸류를 추출함을 언급했다', '레이즈로 CO를 폴드시키고 BB와 단독 팟을 만드는 전략을 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈** — BB의 돈크 배팅은 K8, K3(투 페어), 88/33(세트), 또는 8x 드로우를 포함합니다. AK(탑 페어 탑 키커)는 BB의 약한 Kx(K5, K7 등)나 드로우에 강하게 앞서며, 레이즈로 CO도 폴드시키고 팟을 크게 키워야 합니다.`,
      keyConceptTags: ['HandReading', 'DonkBet', 'Raise', 'TopPairTopKicker'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-092', slug: 'hand-reading-river-sizing-tells',
    title: '핸드 리딩 — 리버 사이징 텔',
    description: `BTN이 오픈, BB(히어로)가 콜. 플롭 J♠7♦2♣ — 히어로 체크, BTN 7BB, 히어로 콜. 턴 5♠ — 히어로 체크, BTN 체크. 리버 T♥ — 히어로 체크, BTN 30BB 오버배팅.

**상황:** 히어로 9♦9♣(미드 포켓 페어), 팟 32BB, BTN 30BB 오버배팅.

BTN의 리버 오버베팅에 99로 콜하시겠습니까?`,
    difficulty: 'EXPERT', category: 'HAND_READING',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BB',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 44, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 65, isHero: false, isActive: true },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 55, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: '9', suit: 'diamond' }, { rank: '9', suit: 'club' }],
      boardCards: [
        { rank: 'J', suit: 'spade' }, { rank: '7', suit: 'diamond' },
        { rank: '2', suit: 'club' }, { rank: '5', suit: 'spade' },
        { rank: 'T', suit: 'heart' },
      ],
      potSize: 32, stage: 'RIVER', tournamentStage: 'MIDDLE', totalChips: 395,
      actionSequence: [
        { position: 'BTN', action: 'RAISE' }, { position: 'BB', action: 'CALL' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['폴드를 선택했다', '리버 오버베팅의 의미를 분석했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['BTN 턴 체크 후 리버 오버베팅이 강한 핸드(JT, T7, TT, JJ) 또는 극단적 블러프를 의미함을 언급했다', '30BB/62BB = 48% 에퀴티 필요 — 99가 J7T52 보드에서 달성 불가를 언급했다', '99는 J, T 페어에 이미 패배함을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — BTN의 턴 체크 후 리버 오버베팅(30/62BB)은 폴라라이즈드입니다. 99는 JT, TT, JJ, T7 등 이미 페어/투 페어/세트에 밀립니다. 48% 에퀴티 달성 불가이므로 폴드가 정답입니다.`,
      keyConceptTags: ['HandReading', 'RiverSizing', 'Overbet', 'Fold'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-093', slug: 'hand-reading-flop-raise-strong-draw',
    title: '핸드 리딩 — 플롭 레이즈 세미블러프',
    description: `CO가 오픈, BTN(히어로)이 콜. 플롭 9♦8♣7♥ — CO 10BB C-bet.

**상황:** 히어로 6♦5♦(플러시 드로우 + 스트레이트 메이드! 6-5-4 → 6-7-8-9?), 팟 17BB.

실제로 히어로는 9♦8♣7♥에서 6-5로 스트레이트를 메이드합니다(5-6-7-8-9). 이 상황에서 레이즈?`,
    difficulty: 'INTERMEDIATE', category: 'HAND_READING',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 55, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 60, isHero: true, isActive: true },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 40, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: '6', suit: 'diamond' }, { rank: '5', suit: 'diamond' }],
      boardCards: [
        { rank: '9', suit: 'diamond' }, { rank: '8', suit: 'club' },
        { rank: '7', suit: 'heart' },
      ],
      potSize: 17, stage: 'FLOP', tournamentStage: 'MIDDLE', totalChips: 386,
      actionSequence: [
        { position: 'CO', action: 'RAISE' }, { position: 'BTN', action: 'CALL' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['레이즈를 선택했다', '65 스트레이트 메이드의 밸류를 인식했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['65 → 5-6-7-8-9 스트레이트가 메이드됨을 명확히 언급했다', '플러시 드로우도 추가 아웃으로 보유함을 언급했다', 'CO의 탑페어(9x), 투 페어(98, 87 등)에 대한 레이즈 밸류를 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈** — 65는 9-8-7 보드에서 5-6-7-8-9 스트레이트를 완성합니다. 여기에 ♦ 플러시 드로우도 보유해 아웃이 풍부합니다. CO의 탑페어(9x), 투 페어(98)에 대해 레이즈로 밸류를 극대화해야 합니다.`,
      keyConceptTags: ['HandReading', 'Straight', 'FlushDraw', 'ValueRaise'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-094', slug: 'hand-reading-multiway-pot-narrowing',
    title: '핸드 리딩 — 멀티웨이 팟 레인지 좁히기',
    description: `UTG 오픈, HJ 콜, CO(히어로) 콜, BB 콜. 플롭 A♦K♥Q♠ — BB 체크, UTG 12BB 배팅, HJ 레이즈 35BB, CO 고민.

**상황:** 히어로 J♠T♦(스트레이트 메이드! AKQ-J-T), 팟 48BB, HJ 레이즈 35BB(추가 콜 필요).

UTG 배팅 + HJ 레이즈가 있는 멀티웨이 팟에서 JTs 스트레이트 메이드 — 콜 또는 레이즈?`,
    difficulty: 'EXPERT', category: 'HAND_READING',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 60, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 55, isHero: false, isActive: true },
        { position: 'CO', stackBB: 65, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 44, isHero: false, isActive: false },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 40, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'J', suit: 'spade' }, { rank: 'T', suit: 'diamond' }],
      boardCards: [
        { rank: 'A', suit: 'diamond' }, { rank: 'K', suit: 'heart' },
        { rank: 'Q', suit: 'spade' },
      ],
      potSize: 48, stage: 'FLOP', tournamentStage: 'MIDDLE', totalChips: 419,
      actionSequence: [
        { position: 'UTG', action: 'RAISE' }, { position: 'HJ', action: 'CALL' },
        { position: 'CO', action: 'CALL' }, { position: 'BB', action: 'CALL' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['레이즈(3-bet)를 선택했다', 'JTs 스트레이트가 넛 스트레이트임을 인식했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['JT가 AKQ 보드에서 넛 스트레이트(JT-AKQ)를 완성함을 명확히 언급했다', '멀티웨이 팟에서 레이즈로 팟을 키우는 것이 최적임을 언급했다', 'UTG 배팅+HJ 레이즈에도 JTs 넛 핸드는 3-bet이 맞음을 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈(3-bet)** — JTs는 A-K-Q 보드에서 A-K-Q-J-T 넛 스트레이트를 완성합니다. 이는 이 보드에서 절대적 최강 핸드입니다. UTG 배팅+HJ 레이즈 상황에서도 3-bet으로 팟을 최대로 키워야 합니다.`,
      keyConceptTags: ['HandReading', 'NutStraight', 'MultiwayPot', 'ThreeBet'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-095', slug: 'hand-reading-flop-float-ip',
    title: '핸드 리딩 — 플롭 플로트 IP',
    description: `SB가 3-bet(8BB), BTN(히어로)이 콜. 플롭 6♦4♣2♥ — SB 10BB C-bet.

**상황:** 히어로 A♠K♦(오버카드 2장), 팟 16BB, SB 10BB 배팅.

드라이 저 보드에서 AK 미스로 플로트(콜) 후 턴 블러프 계획이 있을 때 올바른 액션은?`,
    difficulty: 'ADVANCED', category: 'HAND_READING',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 44, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 60, isHero: true, isActive: true },
        { position: 'SB', stackBB: 55, isHero: false, isActive: true },
        { position: 'BB', stackBB: 40, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: 'A', suit: 'spade' }, { rank: 'K', suit: 'diamond' }],
      boardCards: [
        { rank: '6', suit: 'diamond' }, { rank: '4', suit: 'club' },
        { rank: '2', suit: 'heart' },
      ],
      potSize: 16, stage: 'FLOP', tournamentStage: 'MIDDLE', totalChips: 400,
      actionSequence: [
        { position: 'BTN', action: 'RAISE' }, { position: 'SB', action: 'RAISE' },
        { position: 'BTN', action: 'CALL' },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['콜(플로트)을 선택했다', 'IP 플로트 전략을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['642 드라이 보드에서 SB 3-bet 레인지도 미스가 많음을 언급했다', 'IP에서 플로트 후 턴 A/K 히트 또는 SB 체크 시 블러프 기회를 언급했다', 'AK는 두 오버카드로 백도어 에퀴티를 보유함을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜(플로트)** — 642 드라이 보드는 SB의 3-bet 레인지(QQ, KK, AK 등)도 자주 미스합니다. IP에서 플로트하면 턴에 A/K가 뜰 경우 탑 페어를 만들거나, SB가 체크할 때 블러프를 실행할 수 있습니다. AK는 포기하기엔 에퀴티가 충분합니다.`,
      keyConceptTags: ['HandReading', 'Float', 'IP', 'BackdoorEquity'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-096', slug: 'metagame-table-image-tight-exploit',
    title: '메타게임 — 타이트 이미지 익스플로잇',
    description: `히어로는 1시간 동안 매우 타이트하게 플레이해 이미지가 쌓였습니다. 현재 BTN에서 폴드가 모두 돌아왔습니다.

**상황:** 히어로 8♦6♦(약한 수이티드 커넥터), BTN에서 아직 아무도 입장하지 않음. SB/BB 스택 각 50BB, 히어로 60BB.

타이트 이미지를 활용해 블라인드를 훔칠 기회입니까?`,
    difficulty: 'INTERMEDIATE', category: 'METAGAME',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 44, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 60, isHero: true, isActive: true },
        { position: 'SB', stackBB: 50, isHero: false, isActive: true },
        { position: 'BB', stackBB: 50, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '8', suit: 'diamond' }, { rank: '6', suit: 'diamond' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 405,
      actionSequence: [],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['레이즈(스틸)을 선택했다', '타이트 이미지의 블라인드 스틸 효과를 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['타이트 이미지에서 레이즈 시 블라인드 폴드 빈도가 높음을 언급했다', '86s 수이티드 커넥터가 콜 시 에퀴티 포텐셜을 보유함을 언급했다', '메타게임적으로 타이트 이미지 활용이 수익적임을 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈** — 타이트 이미지 보유 시 블라인드 스틸 성공률이 높습니다. SB/BB는 히어로가 레이즈할 때 강한 핸드라고 인식해 자주 폴드합니다. 86s는 콜 시에도 포스트플롭 에퀴티가 있어 메타게임을 활용한 수익적 스틸 기회입니다.`,
      keyConceptTags: ['Metagame', 'TableImage', 'BlindSteal', 'Exploit'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-097', slug: 'metagame-loose-image-value-hand',
    title: '메타게임 — 루즈 이미지에서 밸류 핸드',
    description: `히어로는 이번 세션에 여러 번 블러프가 들켜 루즈/어그레시브 이미지가 쌓였습니다. UTG에서 입장 기회.

**상황:** 히어로 A♠A♣(AA 프리미엄), UTG 포지션. 스택 55BB.

루즈 이미지로 AA를 어떻게 플레이해야 수익을 극대화합니까?`,
    difficulty: 'INTERMEDIATE', category: 'METAGAME',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'UTG',
      players: [
        { position: 'UTG', stackBB: 55, isHero: true, isActive: true },
        { position: 'UTG+1', stackBB: 40, isHero: false, isActive: true },
        { position: 'UTG+2', stackBB: 38, isHero: false, isActive: true },
        { position: 'LJ', stackBB: 45, isHero: false, isActive: true },
        { position: 'HJ', stackBB: 42, isHero: false, isActive: true },
        { position: 'CO', stackBB: 36, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 44, isHero: false, isActive: true },
        { position: 'SB', stackBB: 50, isHero: false, isActive: true },
        { position: 'BB', stackBB: 48, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'spade' }, { rank: 'A', suit: 'club' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 398,
      actionSequence: [],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['레이즈를 선택했다', '루즈 이미지에서 밸류 핸드 플레이 방식을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['루즈 이미지 상대는 히어로 레이즈를 블러프로 읽어 더 많이 콜함을 언급했다', '슬로우 플레이보다 표준 레이즈가 팟 크기와 밸류 추출에 유리함을 언급했다', '메타게임적으로 루즈 이미지가 AA 밸류를 극대화하는 기회임을 언급했다'] },
      ],
      modelAnswer: `**정답: 표준 레이즈** — 루즈 이미지에서 상대들은 히어로의 레이즈를 블러프 또는 약한 핸드로 인식해 콜 빈도가 높습니다. AA는 이 상황에서 콜러가 많을수록 유리하므로, 슬로우 플레이보다 표준 레이즈(2.5-3BB)로 팟을 키우는 것이 최적입니다.`,
      keyConceptTags: ['Metagame', 'TableImage', 'ValueHand', 'SlowPlay'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-098', slug: 'metagame-adjust-vs-calling-station',
    title: '메타게임 — 콜링 스테이션 상대 조정',
    description: `테이블에 한 플레이어(BB)가 거의 모든 베팅에 콜하는 콜링 스테이션으로 알려져 있습니다. CO(히어로)에서 BTN 폴드, 히어로 오픈, SB 폴드, BB 콜.

**상황:** 히어로 Q♠J♣(준 강한 핸드), 플롭 Q♦8♥2♣, BB 체크.

콜링 스테이션 BB 상대로 어떻게 플레이합니까?`,
    difficulty: 'INTERMEDIATE', category: 'METAGAME',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 55, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 44, isHero: false, isActive: false },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 50, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'Q', suit: 'spade' }, { rank: 'J', suit: 'club' }],
      boardCards: [
        { rank: 'Q', suit: 'diamond' }, { rank: '8', suit: 'heart' },
        { rank: '2', suit: 'club' },
      ],
      potSize: 11, stage: 'FLOP', tournamentStage: 'MIDDLE', totalChips: 380,
      actionSequence: [
        { position: 'CO', action: 'RAISE' }, { position: 'BB', action: 'CALL' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['배팅(레이즈)을 선택했다', '콜링 스테이션 상대 전략을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['콜링 스테이션에게는 블러프가 비효율적임을 언급했다', 'QJ 탑 페어로 가치 배팅을 극대화해야 함을 언급했다', '콜링 스테이션의 약한 핸드 콜을 이용한 밸류 추출 전략을 언급했다'] },
      ],
      modelAnswer: `**정답: 배팅** — 콜링 스테이션에게는 블러프가 낭비입니다. QJ 탑 페어(Q 탑 키커 J)는 BB의 약한 Q, 8x, 페어 미스 등에 대해 강하게 배팅해 밸류를 추출해야 합니다. 콜링 스테이션 상대일수록 배팅 크기를 키워 팟 성장을 극대화합니다.`,
      keyConceptTags: ['Metagame', 'CallingStation', 'ValueBet', 'Exploit'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-099', slug: 'metagame-bluff-vs-nitty-player',
    title: '메타게임 — 니티 플레이어 상대 블러프',
    description: `테이블에서 HJ 플레이어는 매우 타이트(니티)하게 플레이합니다. CO(히어로)에서 HJ 오픈, 히어로 콜, 모두 폴드. 플롭 T♣5♦2♠ — HJ 10BB 배팅, 히어로 콜. 턴 K♠ — HJ 체크.

**상황:** 히어로 J♦9♦(미스 핸드), 팟 32BB, HJ 체크.

니티 HJ의 턴 체크 — 히어로가 배팅 블러프할 기회입니까?`,
    difficulty: 'ADVANCED', category: 'METAGAME',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 55, isHero: false, isActive: true },
        { position: 'CO', stackBB: 60, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 44, isHero: false, isActive: false },
        { position: 'SB', stackBB: 30, isHero: false, isActive: false },
        { position: 'BB', stackBB: 40, isHero: false, isActive: false },
      ],
      heroCards: [{ rank: 'J', suit: 'diamond' }, { rank: '9', suit: 'diamond' }],
      boardCards: [
        { rank: 'T', suit: 'club' }, { rank: '5', suit: 'diamond' },
        { rank: '2', suit: 'spade' }, { rank: 'K', suit: 'spade' },
      ],
      potSize: 32, stage: 'TURN', tournamentStage: 'MIDDLE', totalChips: 394,
      actionSequence: [
        { position: 'HJ', action: 'RAISE' }, { position: 'CO', action: 'CALL' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['배팅(블러프)을 선택했다', '니티 플레이어 체크의 의미를 해석했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['니티 HJ의 턴 체크는 K 히트 또는 강한 핸드가 없음을 암시함을 언급했다', 'IP에서 K 스케어 카드 배팅으로 HJ 미드 핸드를 폴드시킬 수 있음을 언급했다', '메타게임적으로 니티 플레이어에게 공격적 블러프가 수익적임을 언급했다'] },
      ],
      modelAnswer: `**정답: 배팅(블러프)** — 니티 HJ의 턴 체크는 K를 미보유하거나 핸드가 약함을 암시합니다. K 스케어 카드 배팅은 HJ의 중간 핸드(TT 미만 포켓 페어, T9 등)를 폴드시킬 수 있습니다. 니티 플레이어에게는 블러프가 매우 효과적입니다.`,
      keyConceptTags: ['Metagame', 'Bluff', 'NittyPlayer', 'ScarecardExploit'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-100', slug: 'metagame-late-session-stack-protect',
    title: '메타게임 — 세션 후반 스택 보호',
    description: `세션 후반부, 히어로는 오늘 큰 수익을 거두고 있습니다(+80BB). 피로도가 높고 멘탈 상태가 중요합니다. BB에서 BTN이 레이즈(2.5BB), SB 폴드.

**상황:** 히어로 K♦7♠(중간 핸드), BB에서 BTN 레이즈 2.5BB.

세션 후반 +80BB 수익 보호 관점에서 K7o를 어떻게 플레이합니까?`,
    difficulty: 'INTERMEDIATE', category: 'METAGAME',
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
        { position: 'BB', stackBB: 60, isHero: true, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'diamond' }, { rank: '7', suit: 'spade' }],
      potSize: 4, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 390,
      actionSequence: [
        { position: 'BTN', action: 'RAISE' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['폴드를 선택했다', '세션 후반 메타게임 판단을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['K7o가 BTN 오픈 레인지 대비 에퀴티 열세임을 언급했다', '세션 후반 수익 보호 관점에서 마지널 핸드를 폴드하는 것이 현명함을 언급했다', 'OOP에서 K7o의 포스트플롭 어려움을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — K7o는 BTN 레인지 대비 에퀴티가 낮고 OOP에서 플레이하기 어렵습니다. 세션 후반 +80BB 수익을 보유한 상황에서 마지널 핸드로 불필요한 위험을 감수할 필요가 없습니다. 메타게임적으로 수익 보호를 위해 폴드가 현명합니다.`,
      keyConceptTags: ['Metagame', 'SessionManagement', 'Fold', 'BankrollProtection'],
    },
    publishedAt: D, createdAt: D,
  },
]

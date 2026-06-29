import type { Problem } from '@/types'

const D = '2024-01-01T00:00:00.000Z'

export const POSITION_PLAY_PROBLEMS: Problem[] = [
  {
    id: 'prob-062', slug: 'btn-steal-a8o-tight-blinds',
    title: 'BTN A8o 스틸 — 타이트한 블라인드',
    description: `얼리~미들 스테이지. UTG~CO 모두 폴드, BTN 차례입니다.

**상황:** BTN 30BB, SB 35BB(VPIP 18%), BB 28BB(VPIP 20%)

두 블라인드 모두 타이트한 레귤러입니다. A8o를 들고 있습니다.`,
    difficulty: 'BEGINNER', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 35, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 42, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 38, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 30, isHero: false, isActive: false },
        { position: 'CO', stackBB: 44, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 30, isHero: true, isActive: true },
        { position: 'SB', stackBB: 35, isHero: false, isActive: true },
        { position: 'BB', stackBB: 28, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'heart' }, { rank: '8', suit: 'diamond' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 322,
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
          checklistItems: ['레이즈(스틸)를 선택했다', 'BTN 포지션에서 적극적 스틸이 적절함을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['타이트한 블라인드 대비 폴드 에퀴티를 언급했다', 'A8o가 BTN 레이징 레인지에 포함됨을 언급했다', '포지션 우위(BTN 포지션)를 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈(2.2~2.5BB)** — BTN은 가장 유리한 포지션입니다. VPIP 18~20%의 타이트한 블라인드에게는 폴드 에퀴티가 높습니다. A8o는 표준 BTN 오픈 레인지에 포함되며, 스틸 시도가 +EV입니다.`,
      keyConceptTags: ['Position', 'SteaI', 'FoldEquity', 'ButtonPlay'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-063', slug: 'sb-isolate-limper-kjo',
    title: 'SB KJo — 리머 아이솔레이션',
    description: `미들 스테이지. UTG가 리mp, UTG+1~BTN 모두 폴드. SB 차례입니다.

**상황:** UTG 리mp(35BB), SB 40BB, BB 30BB. SB는 KJo를 들고 있습니다.

리머에 맞서 아이솔레이션 레이즈를 할까요?`,
    difficulty: 'INTERMEDIATE', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 35, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 28, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 32, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 25, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 40, isHero: false, isActive: false },
        { position: 'CO', stackBB: 38, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 30, isHero: false, isActive: false },
        { position: 'SB', stackBB: 40, isHero: true, isActive: true },
        { position: 'BB', stackBB: 30, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'spade' }, { rank: 'J', suit: 'diamond' }],
      potSize: 4, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 298,
      actionSequence: [
        { position: 'UTG', action: 'LIMP' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
        { position: 'BTN', action: 'FOLD' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['레이즈(아이솔레이션)를 선택했다', 'UTG 리머를 상대로 아이솔레이션이 유효함을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['KJo가 리머 레인지 대비 강함을 언급했다', '리머의 약한 핸드 레인지에 대한 폴드 에퀴티를 언급했다', '멀티웨이 팟 회피 목적을 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈(4~5BB)** — UTG 리머는 보통 미디엄-위크 핸드를 들고 있습니다. KJo는 이 레인지 대비 도미네이션 우위를 가지며, 아이솔레이션 레이즈로 팟을 헤즈업으로 만드는 것이 +EV입니다. 콜하면 BB도 들어와 멀티웨이가 될 수 있습니다.`,
      keyConceptTags: ['Isolation', 'Position', 'LimpRange', 'Heads-up'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-064', slug: 'co-open-t8s-position-advantage',
    title: 'CO T8s 오픈 — 포지션 어드밴티지',
    description: `미들 스테이지. UTG~HJ 모두 폴드, CO 차례입니다.

**상황:** CO 50BB, BTN 55BB / SB 48BB / BB 45BB

CO 포지션에서 T8s(♥T ♠8)를 들고 있습니다. 오픈레이즈 하시겠습니까?`,
    difficulty: 'BEGINNER', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 35, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 42, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 38, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 45, isHero: false, isActive: false },
        { position: 'CO', stackBB: 50, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 55, isHero: false, isActive: true },
        { position: 'SB', stackBB: 48, isHero: false, isActive: true },
        { position: 'BB', stackBB: 45, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'T', suit: 'heart' }, { rank: '8', suit: 'spade' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 398,
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
          checklistItems: ['레이즈를 선택했다', 'CO 포지션에서 T8s 오픈이 적절함을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['T8s의 플레이어빌리티(스트레이트/플러시 가능성)를 언급했다', 'CO 포지션 이점을 언급했다', '폴드 에퀴티와 이니셔티브를 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈(2.2~2.5BB)** — CO는 BTN 다음으로 좋은 포지션입니다. T8s는 스트레이트·플러시 드로우 조합 가능성이 높아 플레이어빌리티가 뛰어납니다. 딥 스택에서 T8s의 임플라이드 오즈와 폴드 에퀴티를 합산하면 CO 오픈 레인지에 포함됩니다.`,
      keyConceptTags: ['Position', 'Suitedness', 'PlayAbility', 'CO'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-065', slug: 'btn-3bet-vs-co-open-jts',
    title: 'BTN JTs — CO 오픈 대응 3-bet',
    description: `얼리 스테이지. CO가 2.5BB 오픈, BTN 차례입니다.

**상황:** CO 60BB(오픈 2.5BB), BTN 65BB, SB 55BB, BB 50BB. BTN은 JTs(♣J ♣T)를 들고 있습니다.

BTN에서 3-bet을 할까요, 콜을 할까요?`,
    difficulty: 'INTERMEDIATE', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 45, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 50, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 48, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 55, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'CO', stackBB: 60, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 65, isHero: true, isActive: true },
        { position: 'SB', stackBB: 55, isHero: false, isActive: true },
        { position: 'BB', stackBB: 50, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'J', suit: 'club' }, { rank: 'T', suit: 'club' }],
      potSize: 5, stage: 'PREFLOP', tournamentStage: 'EARLY', totalChips: 470,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'RAISE' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['3-bet을 선택했다', 'JTs가 BTN 3-bet 레인지에 포함됨을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['포지션 이점(BTN이 CO보다 유리)을 언급했다', 'JTs의 플레이어빌리티와 에퀴티를 언급했다', '3-bet 범위를 밸런싱하는 블러프/세미-블러프 역할을 언급했다'] },
      ],
      modelAnswer: `**정답: 3-bet(7~8BB)** — BTN은 CO 대비 포지션 우위를 가집니다. JTs는 CO 레인지 대비 40~45% 에퀴티를 보유하며, 3-bet시 폴드 에퀴티+에퀴티 리얼리제이션이 콜보다 높습니다. 3-bet 범위를 밸런스하는 세미-블러프로도 적합합니다.`,
      keyConceptTags: ['3-bet', 'Position', 'BTN', 'Semi-bluff', 'Equity'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-066', slug: 'sb-3bet-vs-btn-steal-ajo',
    title: 'SB AJo — BTN 스틸 대응 3-bet',
    description: `미들 스테이지. UTG~CO 모두 폴드, BTN이 2.5BB로 오픈, SB 차례입니다.

**상황:** BTN 45BB(공격적 스틸러), SB 40BB, BB 38BB. SB는 AJo(♠A ♥J)를 들고 있습니다.

BTN의 넓은 스틸 레인지에 맞서 어떻게 하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 35, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 38, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 44, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 45, isHero: false, isActive: true },
        { position: 'SB', stackBB: 40, isHero: true, isActive: true },
        { position: 'BB', stackBB: 38, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'spade' }, { rank: 'J', suit: 'heart' }],
      potSize: 5, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 358,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
        { position: 'BTN', action: 'RAISE' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['3-bet을 선택했다', 'AJo가 SB 3-bet 레인지에 포함됨을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['BTN의 넓은 스틸 레인지 대비 AJo의 에퀴티 우위를 언급했다', '3-bet으로 이니셔티브를 가져가는 이점을 언급했다', 'OOP 단점을 3-bet으로 상쇄하는 전략을 언급했다'] },
      ],
      modelAnswer: `**정답: 3-bet(8~9BB)** — 공격적인 BTN 스틸러는 60%+ 핸드로 오픈합니다. AJo는 이 광범위한 레인지 대비 60~65% 에퀴티를 보유합니다. SB는 OOP라서 콜보다 3-bet으로 이니셔티브를 잡는 것이 유리합니다.`,
      keyConceptTags: ['3-bet', 'OOP Defense', 'SB vs BTN', 'Initiative'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-067', slug: 'btn-squeeze-tt-utg-co-call',
    title: 'BTN TT — UTG+CO 콜 상황 스퀴즈',
    description: `미들 스테이지. UTG가 2.5BB 오픈, HJ폴드, CO가 콜, BTN 차례입니다.

**상황:** UTG 50BB(오픈), CO 45BB(콜), BTN 55BB, SB 40BB, BB 48BB. BTN은 TT(♣T ♦T)를 들고 있습니다.

스퀴즈를 할까요, 콜을 할까요?`,
    difficulty: 'ADVANCED', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 50, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 42, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 35, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 40, isHero: false, isActive: false },
        { position: 'CO', stackBB: 45, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 55, isHero: true, isActive: true },
        { position: 'SB', stackBB: 40, isHero: false, isActive: true },
        { position: 'BB', stackBB: 48, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'T', suit: 'club' }, { rank: 'T', suit: 'diamond' }],
      potSize: 7, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 393,
      actionSequence: [
        { position: 'UTG', action: 'RAISE' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'CALL' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['스퀴즈(레이즈)를 선택했다', 'TT가 BTN 스퀴즈 레인지에 포함됨을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['CO 콜러(콜드콜 레인지)의 약점을 이용한 스퀴즈를 언급했다', 'TT가 UTG+CO 레인지 대비 에퀴티를 보유함을 언급했다', '스퀴즈의 폴드 에퀴티를 언급했다'] },
      ],
      modelAnswer: `**정답: 스퀴즈(8~9BB)** — CO 콜드콜은 3-bet 범위를 차단당한 미디엄 핸드(TT, 99, AJ 등)를 암시합니다. TT는 이 범위 대비 강하며, 스퀴즈시 CO와 UTG 모두 폴드할 가능성이 있어 폴드 에퀴티가 큽니다.`,
      keyConceptTags: ['Squeeze', 'Position', 'FoldEquity', 'ColdCall'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-068', slug: 'co-flat-ats-vs-utg-open',
    title: 'CO ATs — UTG 오픈 콜드콜 vs 3-bet',
    description: `얼리 스테이지. UTG가 2.5BB 오픈, UTG+1~HJ 폴드, CO 차례입니다.

**상황:** UTG 60BB(타이트, VPIP 15%), CO 65BB. CO는 ATs(♥A ♥T)를 들고 있습니다.

타이트한 UTG 오픈에 맞서 3-bet을 할까요, 콜을 할까요?`,
    difficulty: 'INTERMEDIATE', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 60, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 45, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 50, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 55, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 48, isHero: false, isActive: false },
        { position: 'CO', stackBB: 65, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 52, isHero: false, isActive: true },
        { position: 'SB', stackBB: 40, isHero: false, isActive: true },
        { position: 'BB', stackBB: 58, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'heart' }, { rank: 'T', suit: 'heart' }],
      potSize: 5, stage: 'PREFLOP', tournamentStage: 'EARLY', totalChips: 473,
      actionSequence: [
        { position: 'UTG', action: 'RAISE' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['콜을 선택했다', '타이트한 UTG 레인지에 대한 3-bet의 위험성을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['UTG 타이트 레인지(AA-JJ, AKs 등) 대비 ATs의 에퀴티 열세를 언급했다', 'CO 포지션에서 콜 후 에퀴티 리얼리제이션 이점을 언급했다', '3-bet시 ATs가 도미네이션 당할 위험을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — VPIP 15% UTG 오픈 레인지(JJ+, AK, AQs 등)에는 AT를 도미네이션하는 핸드가 많습니다. 3-bet하면 UTG가 4-bet 또는 콜할 때 큰 역도미네이션 위험이 있습니다. CO 포지션 이점으로 콜 후 플롭 대응이 더 +EV입니다.`,
      keyConceptTags: ['Domination', 'UTG Range', 'Cold 4-bet Risk', 'Position'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-069', slug: 'btn-setmine-22-utg-open-deep',
    title: 'BTN 22 — UTG 오픈 딥스택 세트마이닝',
    description: `얼리 스테이지(딥스택). UTG가 2.5BB 오픈, UTG+1~CO 폴드, BTN 차례입니다.

**상황:** UTG 100BB, BTN 100BB. BTN은 22(♣2 ♦2)를 들고 있습니다.

딥스택에서 포켓 듀스로 세트마이닝 콜을 할까요?`,
    difficulty: 'BEGINNER', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 100, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 95, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 98, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 102, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 100, isHero: false, isActive: false },
        { position: 'CO', stackBB: 97, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 100, isHero: true, isActive: true },
        { position: 'SB', stackBB: 95, isHero: false, isActive: true },
        { position: 'BB', stackBB: 100, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '2', suit: 'club' }, { rank: '2', suit: 'diamond' }],
      potSize: 5, stage: 'PREFLOP', tournamentStage: 'EARLY', totalChips: 887,
      actionSequence: [
        { position: 'UTG', action: 'RAISE' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'FOLD' },
      ],
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['콜(세트마이닝)을 선택했다', '딥스택에서 임플라이드 오즈가 충분함을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['7.5:1 이상의 임플라이드 오즈 계산을 언급했다', '포지션(BTN) 이점을 언급했다', '세트 히트율(약 12%)과 수익성을 언급했다'] },
      ],
      modelAnswer: `**정답: 콜** — 100BB 딥스택에서 세트마이닝 규칙은 '스택:콜 비율 ≥ 15:1'입니다. 2.5BB 콜 대비 스택 100BB = 40:1로 충분합니다. 세트를 히트하면(약 12%) BTN 포지션에서 UTG의 오버페어를 스택할 가능성이 높습니다.`,
      keyConceptTags: ['SetMining', 'ImpliedOdds', 'DeepStack', 'Position'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-070', slug: 'hj-open-a5s-suitedness',
    title: 'HJ A5s — 수이티드 에이스 오픈',
    description: `미들 스테이지. UTG~LJ 모두 폴드, HJ 차례입니다.

**상황:** HJ 45BB, CO 50BB / BTN 42BB / SB 38BB / BB 40BB. HJ는 A5s(♦A ♦5)를 들고 있습니다.

HJ 포지션에서 A5s로 오픈할까요?`,
    difficulty: 'BEGINNER', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'HJ',
      players: [
        { position: 'UTG', stackBB: 35, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 38, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 45, isHero: true, isActive: true },
        { position: 'CO', stackBB: 50, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 42, isHero: false, isActive: true },
        { position: 'SB', stackBB: 38, isHero: false, isActive: true },
        { position: 'BB', stackBB: 40, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'A', suit: 'diamond' }, { rank: '5', suit: 'diamond' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 373,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['레이즈를 선택했다', 'A5s가 HJ 오픈 레인지에 포함됨을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['A5s의 플러시 가능성과 너트 잠재력을 언급했다', 'A5s의 블러프 3-bet 대응력을 언급했다', 'HJ 포지션에서 오픈이 적절함을 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈(2.2BB)** — A5s는 수이티드 에이스로서 플러시 드로우와 더블벨리 잠재력이 있습니다. 또한 누군가 3-bet할 때 4-bet 블러프 또는 올인 옵션이 있어 GTO 범위 밸런스에 기여합니다. HJ 포지션은 오픈 적합합니다.`,
      keyConceptTags: ['SuitedAce', 'HJ', 'NutPotential', 'Playability'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-071', slug: 'sb-fold-q9o-vs-hj-open',
    title: 'SB Q9o — HJ 오픈 대응 폴드',
    description: `미들 스테이지. UTG~CO 폴드, HJ가 2.5BB 오픈, CO~BTN 폴드. SB 차례입니다.

**상황:** HJ 55BB(레귤러, 오픈율 22%), BTN 폴드, SB 45BB, BB 40BB. SB는 Q9o(♦Q ♠9)를 들고 있습니다.

SB OOP에서 Q9o로 어떻게 하시겠습니까?`,
    difficulty: 'INTERMEDIATE', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'SB',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 42, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 45, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 55, isHero: false, isActive: true },
        { position: 'CO', stackBB: 48, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 50, isHero: false, isActive: false },
        { position: 'SB', stackBB: 45, isHero: true, isActive: true },
        { position: 'BB', stackBB: 40, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'Q', suit: 'diamond' }, { rank: '9', suit: 'spade' }],
      potSize: 5, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 403,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'RAISE' }, { position: 'CO', action: 'FOLD' },
        { position: 'BTN', action: 'FOLD' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['폴드를 선택했다', 'OOP에서 Q9o의 한계를 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['SB OOP의 불리함을 언급했다', 'HJ 오픈 레인지 대비 Q9o의 에퀴티 열세를 언급했다', 'Q9o의 도미네이션 위험을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — SB는 OOP이며 BB 스퀴즈 위협도 있습니다. HJ 22% 오픈 레인지(JJ-22, AJ+, KQ, T9s 등)에 Q9o는 취약합니다. QJ, QT, Q9보다 강한 핸드에 도미네이션 당하기 쉬우며, OOP 플레이어빌리티가 낮아 폴드가 최선입니다.`,
      keyConceptTags: ['OOP', 'SB Defense', 'Domination', 'Fold'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-072', slug: 'btn-iso-j9s-co-limp',
    title: 'BTN J9s — CO 리mp 아이솔레이션',
    description: `미들 스테이지. UTG~HJ 폴드, CO가 리mp, BTN 차례입니다.

**상황:** CO 35BB(리mp), BTN 50BB, SB 42BB, BB 38BB. BTN은 J9s(♦J ♦9)를 들고 있습니다.

BTN에서 J9s로 아이솔레이션 레이즈를 할까요?`,
    difficulty: 'BEGINNER', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 30, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 35, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 40, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 38, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 42, isHero: false, isActive: false },
        { position: 'CO', stackBB: 35, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 50, isHero: true, isActive: true },
        { position: 'SB', stackBB: 42, isHero: false, isActive: true },
        { position: 'BB', stackBB: 38, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'J', suit: 'diamond' }, { rank: '9', suit: 'diamond' }],
      potSize: 4, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 350,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' }, { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' }, { position: 'CO', action: 'LIMP' },
      ],
    },
    correctAction: 'RAISE',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['레이즈(아이솔레이션)를 선택했다', 'BTN 포지션에서 리머 대응 ISO가 적절함을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['CO 리머 레인지 대비 J9s의 에퀴티와 플레이어빌리티를 언급했다', 'BTN 포지션 이점을 언급했다', '멀티웨이 팟 방지를 위한 아이솔레이션을 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈(3.5~4BB)** — CO 리머는 미디엄-위크 핸드를 들고 있으며, J9s(수이티드 커넥터)는 그 레인지 대비 충분한 에퀴티와 플레이어빌리티를 보유합니다. BTN 포지션 이점으로 플롭 이후 유리하게 플레이할 수 있습니다.`,
      keyConceptTags: ['Isolation', 'BTN', 'SuitedConnector', 'Position'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-073', slug: 'utg1-fold-kjo-ep-position',
    title: 'UTG+1 KJo — 얼리 포지션 폴드',
    description: `얼리 스테이지. UTG가 폴드, UTG+1 차례입니다.

**상황:** UTG+1 55BB, 나머지 플레이어 모두 40~60BB. UTG+1은 KJo(♥K ♣J)를 들고 있습니다.

얼리 포지션에서 KJo로 오픈레이즈를 할까요?`,
    difficulty: 'INTERMEDIATE', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'UTG+1',
      players: [
        { position: 'UTG', stackBB: 50, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 55, isHero: true, isActive: true },
        { position: 'UTG+2', stackBB: 48, isHero: false, isActive: true },
        { position: 'LJ', stackBB: 60, isHero: false, isActive: true },
        { position: 'HJ', stackBB: 55, isHero: false, isActive: true },
        { position: 'CO', stackBB: 52, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 58, isHero: false, isActive: true },
        { position: 'SB', stackBB: 45, isHero: false, isActive: true },
        { position: 'BB', stackBB: 50, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'K', suit: 'heart' }, { rank: 'J', suit: 'club' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'EARLY', totalChips: 473,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['폴드를 선택했다', '얼리 포지션에서 KJo의 한계를 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['뒤에 7명의 액션이 남아있는 EP의 불리함을 언급했다', 'KJo가 오픈 후 3-bet당할 때 어려운 위치임을 언급했다', 'AK, AJ, KQ 등에 도미네이션 당할 위험을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — UTG+1은 뒤에 7명이 남아 있습니다. KJo는 3-bet을 받으면 AK, AJ, KQ, KK, AA에 도미네이션 당하는 취약한 위치입니다. 레이즈해서 3-bet을 받으면 콜하기도 폴드하기도 어려운 '레몬' 상황에 빠집니다. 표준 EP 오픈 레인지에서 KJo는 제외됩니다.`,
      keyConceptTags: ['EP Range', 'Domination', 'Position', 'Fold'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-074', slug: 'btn-iso-raise-q8s-vs-sb-limp',
    title: 'BTN Q8s — SB 리mp에 맞선 아이솔레이션',
    description: `미들 스테이지. UTG~CO 모두 폴드, BTN이 폴드, SB가 리mp, BTN(히어로) 차례입니다.

잠깐, 이미 BTN은 폴드했습니다. **실제로는 CO 차례**입니다.

UTG~HJ 폴드, CO(히어로) 55BB, BTN 45BB, SB가 리mp(35BB), BB 40BB. CO는 Q8s(♥Q ♥8)를 들고 있습니다.`,
    difficulty: 'BEGINNER', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'CO',
      players: [
        { position: 'UTG', stackBB: 40, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 42, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 44, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 36, isHero: false, isActive: false },
        { position: 'CO', stackBB: 55, isHero: true, isActive: true },
        { position: 'BTN', stackBB: 45, isHero: false, isActive: true },
        { position: 'SB', stackBB: 35, isHero: false, isActive: true },
        { position: 'BB', stackBB: 40, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: 'Q', suit: 'heart' }, { rank: '8', suit: 'heart' }],
      potSize: 4, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 375,
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
          checklistItems: ['레이즈를 선택했다', 'CO에서 Q8s 오픈이 적절함을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['Q8s의 수이티드 플레이어빌리티를 언급했다', 'CO 포지션의 이점을 언급했다', '폴드 에퀴티와 이니셔티브를 언급했다'] },
      ],
      modelAnswer: `**정답: 레이즈(2.2~2.5BB)** — CO는 후반 포지션으로 BTN, 블라인드에 포지션을 가집니다. Q8s는 수이티드로 플러시 드로우 잠재력이 있으며, CO 오픈 레인지에 포함되는 플레이어블 핸드입니다.`,
      keyConceptTags: ['CO', 'Suitedness', 'Position', 'Open'],
    },
    publishedAt: D, createdAt: D,
  },
  {
    id: 'prob-075', slug: 'lj-fold-87o-ep-mid-position',
    title: 'LJ 87o — 미드-얼리 포지션 판단',
    description: `미들 스테이지. UTG~HJ 폴드, LJ(히어로) 차례입니다. (LJ = Lojack, UTG+3 정도)

**상황:** LJ 50BB, CO~BB 모두 35~55BB. LJ는 87o(♠8 ♣7)를 들고 있습니다.

LJ에서 오프수트 커넥터 87o로 오픈레이즈를 할까요?`,
    difficulty: 'INTERMEDIATE', category: 'POSITION_PLAY',
    gameContext: {
      smallBlind: 1, bigBlind: 2, heroPosition: 'LJ',
      players: [
        { position: 'UTG', stackBB: 42, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 38, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 45, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 50, isHero: true, isActive: true },
        { position: 'HJ', stackBB: 48, isHero: false, isActive: true },
        { position: 'CO', stackBB: 55, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 52, isHero: false, isActive: true },
        { position: 'SB', stackBB: 35, isHero: false, isActive: true },
        { position: 'BB', stackBB: 40, isHero: false, isActive: true },
      ],
      heroCards: [{ rank: '8', suit: 'spade' }, { rank: '7', suit: 'club' }],
      potSize: 3, stage: 'PREFLOP', tournamentStage: 'MIDDLE', totalChips: 405,
      actionSequence: [
        { position: 'UTG', action: 'FOLD' }, { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' },
      ],
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        { id: 'action', name: 'Action', nameKo: '액션 정확도', maxScore: 40,
          checklistItems: ['폴드를 선택했다', '87o가 LJ 오픈 레인지에서 제외됨을 이해했다'] },
        { id: 'reasoning', name: 'Reasoning', nameKo: '근거', maxScore: 60,
          checklistItems: ['오프수트 커넥터의 플레이어빌리티 한계를 언급했다', 'LJ는 아직 EP에 가까워 5명이 뒤에 있음을 언급했다', '수이티드(87s)와 달리 87o는 플러시 가능성이 없음을 언급했다'] },
      ],
      modelAnswer: `**정답: 폴드** — LJ는 여전히 5명이 뒤에 있는 얼리-미드 포지션입니다. 87o는 수이티드가 아니라 플러시 드로우가 없으며, 오프수트 커넥터는 EP에서 오픈 레인지에서 제외됩니다. 87s(수이티드 버전)는 오픈할 수 있지만 87o는 폴드가 올바른 선택입니다.`,
      keyConceptTags: ['LJ Range', 'Offsuit Connector', 'EP Fold', 'Position'],
    },
    publishedAt: D, createdAt: D,
  },
]

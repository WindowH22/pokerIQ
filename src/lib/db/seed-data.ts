import type { Problem } from '@/types'

export const CONCEPTS = [
  {
    id: 'icm',
    term: 'ICM',
    termKo: 'ICM (독립 칩 모델)',
    shortDescription: '토너먼트 칩을 실제 상금 가치로 환산하는 수학 모델',
    fullExplanation: `ICM(Independent Chip Model)은 토너먼트에서 현재 보유한 칩의 실질 상금 가치를 계산하는 방법입니다.

**핵심 원리:**
- 칩 수가 많다고 해서 상금도 같은 비율로 늘지 않습니다
- 예: 토너먼트 칩의 50%를 보유해도 1등 상금의 50%를 얻는 게 아님
- 칩 가치는 토너먼트가 진행될수록 비선형적으로 변합니다

**공식 (Malmuth-Harville):**
P(1등) = 보유 칩 / 전체 칩
P(2등 | 1등 아님) = 보유 칩 / (전체 칩 - 1등 칩)
...반복 계산

**실전 적용:**
- 버블 상황: 폴드로 상금권 진입이 콜로 칩 획득보다 +EV일 수 있음
- 파이널 테이블: 같은 칩 EV라도 ICM EV가 다를 수 있음
- 숏스택 보호: 다른 숏스택이 탈락하면 내 ICM 가치가 상승

**한계 (2025 arXiv 논문 기준):**
대형 스택은 과소평가, 숏스택은 과대평가하는 편향이 존재합니다.`,
    difficulty: 'INTERMEDIATE',
    relatedTerms: ['chip_ev', 'bubble_factor', 'risk_premium'],
  },
  {
    id: 'gto',
    term: 'GTO',
    termKo: 'GTO (게임 이론 최적)',
    shortDescription: '어떤 상대도 착취할 수 없는 수학적으로 균형잡힌 전략',
    fullExplanation: `GTO(Game Theory Optimal)는 내쉬 균형에 기반한 포커 전략으로, 상대가 어떤 전략을 사용해도 착취당하지 않는 전략입니다.

**핵심 개념:**
- 블러프와 밸류의 균형된 비율 유지
- 상대가 콜하든 폴드하든 무차별하게 만드는 것이 목표
- 베팅/체크/콜/폴드를 특정 주파수(frequency)로 혼합

**9인 테이블의 특수성:**
- 멀티웨이 팟에서는 GTO 계산이 기하급수적으로 복잡해짐
- 10^161 가지 가능한 게임 상태 (2024 arXiv 조사)
- CFR(Counterfactual Regret Minimization) 알고리즘으로 근사치 계산

**실전 적용:**
- 헤즈업: GTO가 가장 명확하게 적용됨
- 멀티웨이: 익스플로이티브 플레이가 종종 더 효과적
- 알려진 약점이 있는 상대: 익스플로이티브가 우선

**GTO vs 익스플로이티브:**
약한 상대에게는 GTO를 벗어난 익스플로이티브 전략이 더 높은 수익을 가져다줌`,
    difficulty: 'ADVANCED',
    relatedTerms: ['nash_equilibrium', 'exploitative', 'cfr'],
  },
  {
    id: 'pot_odds',
    term: 'Pot Odds',
    termKo: '팟 오즈',
    shortDescription: '콜에 필요한 금액 대비 현재 팟 크기의 비율',
    fullExplanation: `팟 오즈는 콜을 결정할 때 수익성을 판단하는 기본 계산입니다.

**계산 공식:**
팟 오즈 = 콜 금액 / (팟 + 콜 금액) × 100%

**예시:**
팟 100, 상대 베팅 50 → 콜 금액 50
팟 오즈 = 50 / (100 + 50 + 50) × 100 = 25%
→ 에퀴티가 25% 이상이면 콜이 수익적

**룰 오브 2와 4:**
- 플랍에서 (아웃 수 × 4) = 턴+리버 에퀴티 근사
- 턴에서 (아웃 수 × 2) = 리버 에퀴티 근사
- 예: 플러시 드로우(9 아웃) → 9×4 = 36% 에퀴티

**임플라이드 오즈:**
현재 팟 오즈가 낮아도 히트 시 추가로 얻을 수 있는 칩까지 고려

**멀티웨이 팟 주의:**
- 9인 테이블에서 여러 명이 콜하면 에퀴티 계산이 복잡해짐
- 상대 레인지가 강해져서 아웃 수가 줄어들 수 있음`,
    difficulty: 'BEGINNER',
    relatedTerms: ['equity', 'implied_odds', 'outs'],
  },
  {
    id: 'push_fold',
    term: 'Push/Fold',
    termKo: '푸시/폴드',
    shortDescription: '숏스택(15BB 미만)에서 올인 또는 폴드만 선택하는 전략',
    fullExplanation: `Push/Fold는 스택이 15BB 이하로 줄어들었을 때 수학적으로 최적인 전략입니다.

**이론적 근거 (CMU 논문, 내쉬 균형):**
- 미니레이즈나 림프는 스택 손실 대비 수익이 낮음
- 올인은 폴드 에퀴티(상대가 폴드하게 만드는 가치)를 최대화
- 내쉬 균형 기반 push/fold 레인지가 계산되어 있음

**스택별 푸시 레인지 (BTN 기준, 9인 테이블):**
- 5BB: 거의 모든 핸드 (~85%)
- 10BB: 약 40% (A2s+, K9s+, Q9s+, J9s+, A8o+, KTo+)
- 15BB: 약 20% (ATs+, KJs+, QQs+, AJo+)

**ICM 보정 필요:**
- 버블에서는 GTO push 레인지보다 타이트하게 플레이
- 파이널 테이블에서는 상금 점프에 따라 추가 조정

**콜링 레인지:**
숏스택의 푸시에 대한 콜링 레인지는 포지션과 스택에 따라 달라짐`,
    difficulty: 'BEGINNER',
    relatedTerms: ['icm', 'fold_equity', 'nash_equilibrium'],
  },
  {
    id: 'bubble_factor',
    term: 'Bubble Factor',
    termKo: '버블 팩터',
    shortDescription: '버블 상황에서 칩을 잃는 것이 얼마나 더 고통스러운지를 나타내는 계수',
    fullExplanation: `버블 팩터(Bubble Factor)는 ICM에서 파생된 개념으로, 현재 상황에서 칩 손실의 고통이 칩 획득의 기쁨보다 얼마나 큰지를 수치로 표현합니다.

**공식:**
버블 팩터 = (칩 획득 시 ICM 이익) / (칩 손실 시 ICM 손실)

**일반적인 버블 팩터 예시:**
- 버블 직전 (9인 SNG, 4명 남음, 3명 상금): 약 2.0-3.0
- 파이널 테이블: 약 1.2-1.8
- 대형 MTT 버블: 4.0 이상도 가능

**실전 의미:**
- BF = 2.0 → 칩 2배를 얻어야 현재 위험을 감수할 가치가 있음
- BF가 높을수록 콜/레이즈를 더 타이트하게 해야 함

**9인 테이블 파이널 테이블:**
- 상금 차이가 클수록 버블 팩터 상승
- 칩리더는 BF가 낮아 공격적으로 플레이 가능
- 숏스택과 중간 스택의 BF 차이가 큼`,
    difficulty: 'ADVANCED',
    relatedTerms: ['icm', 'risk_premium', 'chip_ev'],
  },
  {
    id: 'range',
    term: 'Range',
    termKo: '레인지 (핸드 범위)',
    shortDescription: '특정 상황에서 플레이어가 가질 수 있는 모든 가능한 핸드의 집합',
    fullExplanation: `레인지(Range)는 상대방이 특정 액션을 취할 때 가지고 있을 수 있는 모든 핸드의 집합입니다.

**왜 레인지로 생각해야 하나:**
- 포커는 정보가 불완전한 게임
- "상대가 AK를 가지고 있다"가 아닌 "상대의 레인지는 QQ+, AK+"라고 생각해야 함

**9인 테이블 포지션별 레인지 (선술 참고):**
- UTG 오픈 레인지: ~15% (22+, ATs+, KJs+, AJo+)
- MP 오픈 레인지: ~20%
- CO 오픈 레인지: ~28%
- BTN 오픈 레인지: ~45-50%

**레인지 구성 요소:**
- 밸류 핸드: 강한 핸드로 베팅/레이즈
- 블러프/세미블러프: 약한 핸드지만 압박을 위해 공격
- 체크/폴드: 레인지에 포함되어야 하는 약한 핸드들

**레인지 좁히기:**
각 스트리트의 액션을 통해 상대 레인지를 좁혀나가는 것이 핵심 스킬`,
    difficulty: 'INTERMEDIATE',
    relatedTerms: ['gto', 'polarized', 'merged'],
  },
]

export const SEED_PROBLEMS: Omit<Problem, 'createdAt'>[] = [
  {
    id: 'prob-001',
    slug: 'final-table-5-handed-icm',
    title: '파이널 테이블 5인, 2등 vs 칩리더 충돌',
    description: `파이널 테이블 5인이 남은 상황입니다. 당신은 현재 2등 스택입니다.

**상황 요약:**
- CO 위치의 숏스택(8BB)이 올인을 했습니다
- 칩리더(BTN, 45BB)가 콜을 했습니다
- 당신은 SB 위치에서 KQo를 들고 있습니다 (28BB)

**상금 구조 (9인 SNG):**
1위: 40%, 2위: 25%, 3위: 15%, 4위: 10%, 5위: 10%

**현재 스택 (BB 단위):**
- UTG: 탈락
- UTG+1: 탈락
- UTG+2: 탈락
- LJ: 탈락
- HJ: 12BB
- CO: 8BB (올인)
- BTN: 45BB (콜)
- SB: 28BB ← 히어로
- BB: 7BB

KQo로 스퀴즈 올인을 하시겠습니까?`,
    difficulty: 'ADVANCED',
    category: 'ICM_DECISION',
    gameContext: {
      smallBlind: 1,
      bigBlind: 2,
      ante: 0.3,
      heroPosition: 'SB',
      players: [
        { position: 'HJ', stackBB: 12, isHero: false, isActive: true },
        { position: 'CO', stackBB: 8, isHero: false, isActive: true },
        { position: 'BTN', stackBB: 45, isHero: false, isActive: true },
        { position: 'SB', stackBB: 28, isHero: true, isActive: true },
        { position: 'BB', stackBB: 7, isHero: false, isActive: true },
      ],
      heroCards: [
        { rank: 'K', suit: 'spade' },
        { rank: 'Q', suit: 'heart' },
      ],
      potSize: 18.3,
      stage: 'PREFLOP',
      payoutStructure: [
        { place: 1, amount: 40 },
        { place: 2, amount: 25 },
        { place: 3, amount: 15 },
        { place: 4, amount: 10 },
        { place: 5, amount: 10 },
      ],
      tournamentStage: 'FINAL_TABLE',
      totalChips: 100,
    },
    correctAction: 'FOLD',
    rubric: {
      criteria: [
        {
          id: 'action',
          name: 'Action Correctness',
          nameKo: '액션 정확도',
          maxScore: 25,
          checklistItems: [
            'FOLD를 선택했다',
            '스퀴즈 시 칩리더와의 충돌 위험을 언급했다',
          ],
        },
        {
          id: 'icm',
          name: 'ICM Understanding',
          nameKo: 'ICM 이해도',
          maxScore: 30,
          checklistItems: [
            'ICM 또는 상금 가치를 명시적으로 언급했다',
            '2등 포지션 보호의 중요성을 언급했다',
            '칩리더와의 올인이 ICM 손실이 큼을 언급했다',
            '다른 숏스택(HJ 12BB, BB 7BB)의 탈락 가능성을 고려했다',
          ],
        },
        {
          id: 'range',
          name: 'Range Analysis',
          nameKo: '레인지 분석',
          maxScore: 20,
          checklistItems: [
            'KQo의 에퀴티가 칩리더 레인지 대비 낮음을 언급했다',
            'CO 숏스택의 올인 레인지를 분석했다',
            '칩리더의 콜 레인지를 분석했다',
          ],
        },
        {
          id: 'reasoning',
          name: 'Reasoning Quality',
          nameKo: '근거 품질',
          maxScore: 25,
          checklistItems: [
            '논리적이고 구체적인 근거를 제시했다',
            '여러 요소를 종합적으로 고려했다',
          ],
        },
      ],
      modelAnswer: `**정답: 폴드**

이 상황에서 KQo 스퀴즈 올인은 ICM 관점에서 매우 비효율적입니다.

**ICM 분석:**
현재 2등 스택(28BB)으로 파이널 테이블 5인 중 좋은 위치에 있습니다. KQo로 올인했을 때:
- 칩리더(45BB) 레인지에는 AA, KK, QQ, AK, AQ가 포함됩니다
- KQo의 에퀴티: 칩리더 레인지 대비 약 35-40%
- 탈락 시 ICM 가치 손실이 획득 시 이익보다 훨씬 큼

**포지션 고려:**
- HJ(12BB), BB(7BB)가 더 짧은 스택입니다
- 기다리면 이들이 먼저 탈락할 가능성이 높습니다
- 리스크 없이 상금 순위가 올라갈 수 있습니다

**결론:**
KQo는 좋은 핸드지만, 3웨이 팟에서 칩리더의 레인지는 매우 강합니다. 현재 ICM 리스크를 감수할 필요가 없습니다.`,
      keyConceptTags: ['ICM', 'BubbleFactor', 'Range', 'PositionPlay'],
    },
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'prob-002',
    slug: 'btn-shortstack-pushfold',
    title: 'BTN 숏스택 10BB 올인 결정',
    description: `9인 토너먼트 미들 스테이지입니다.

**상황:**
- 당신은 BTN 포지션에 10BB 스택을 보유하고 있습니다
- 모든 플레이어가 폴드하고 당신 차례입니다
- A7o를 들고 있습니다

**현재 스택 (BB 단위):**
- UTG: 22BB
- UTG+1: 35BB
- UTG+2: 18BB
- LJ: 41BB
- HJ: 27BB
- CO: 폴드
- BTN: 10BB ← 히어로
- SB: 15BB
- BB: 29BB

아직 상금권까지 거리가 있는 상황(버블 아님)입니다. 어떤 액션을 취하시겠습니까?`,
    difficulty: 'BEGINNER',
    category: 'PUSH_FOLD',
    gameContext: {
      smallBlind: 1,
      bigBlind: 2,
      heroPosition: 'BTN',
      players: [
        { position: 'UTG', stackBB: 22, isHero: false, isActive: true },
        { position: 'UTG+1', stackBB: 35, isHero: false, isActive: true },
        { position: 'UTG+2', stackBB: 18, isHero: false, isActive: true },
        { position: 'LJ', stackBB: 41, isHero: false, isActive: true },
        { position: 'HJ', stackBB: 27, isHero: false, isActive: true },
        { position: 'CO', stackBB: 20, isHero: false, isActive: false },
        { position: 'BTN', stackBB: 10, isHero: true, isActive: true },
        { position: 'SB', stackBB: 15, isHero: false, isActive: true },
        { position: 'BB', stackBB: 29, isHero: false, isActive: true },
      ],
      heroCards: [
        { rank: 'A', suit: 'club' },
        { rank: '7', suit: 'heart' },
      ],
      potSize: 3,
      stage: 'PREFLOP',
      tournamentStage: 'MIDDLE',
      totalChips: 217,
    },
    correctAction: 'ALL_IN',
    rubric: {
      criteria: [
        {
          id: 'action',
          name: 'Action Correctness',
          nameKo: '액션 정확도',
          maxScore: 30,
          checklistItems: [
            'ALL_IN(올인)을 선택했다',
            '10BB 숏스택에서 미니레이즈가 비효율적임을 이해했다',
          ],
        },
        {
          id: 'push_fold',
          name: 'Push/Fold Theory',
          nameKo: '푸시/폴드 이해',
          maxScore: 30,
          checklistItems: [
            'Push/Fold 임계값(15BB) 개념을 언급했다',
            '폴드 에퀴티의 중요성을 언급했다',
            'A7o가 BTN 푸시 레인지에 포함됨을 언급했다',
          ],
        },
        {
          id: 'position',
          name: 'Position Understanding',
          nameKo: '포지션 이해',
          maxScore: 20,
          checklistItems: [
            'BTN 포지션의 유리함을 언급했다',
            'SB/BB의 수비 레인지를 고려했다',
          ],
        },
        {
          id: 'reasoning',
          name: 'Reasoning Quality',
          nameKo: '근거 품질',
          maxScore: 20,
          checklistItems: [
            '논리적이고 구체적인 근거를 제시했다',
          ],
        },
      ],
      modelAnswer: `**정답: 올인 (All-in)**

10BB 스택에서 A7o는 BTN에서 명확한 올인 핸드입니다.

**Push/Fold 이론:**
- 스택이 15BB 이하일 때는 미니레이즈 대신 올인이 수학적으로 최적
- 미니레이즈(2.5BB)는 폴드 에퀴티를 낭비하고, 상대가 콜 시 팟 오즈가 불리해짐
- 올인은 SB와 BB를 폴드하게 만들 수 있는 최대 압력 행사

**BTN에서 A7o 분석:**
- BTN은 9인 테이블에서 최고의 포지션 (항상 마지막 행동)
- Nash 균형 기준 10BB BTN 푸시 레인지: 약 40% (A2o+, K5o+, Q8o+ 포함)
- A7o는 이 레인지에 충분히 포함됨

**에퀴티:**
- SB/BB의 콜링 레인지 vs A7o: 약 45-50% 에퀴티 보유
- 버블도 아닌 상황에서 칩 EV 플레이가 우선`,
      keyConceptTags: ['PushFold', 'Position', 'FoldEquity', 'NashEquilibrium'],
    },
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'prob-003',
    slug: 'bb-defense-vs-btn-steal',
    title: 'BB 방어: BTN 오픈레이즈에 3-벳 or 콜?',
    description: `9인 캐쉬게임 또는 딥스택 토너먼트 초반부입니다.

**상황:**
- BTN이 2.5BB로 오픈레이즈
- SB 폴드
- 당신은 BB에서 T9s(스페이드)를 들고 있습니다 (100BB 스택)

**질문:** T9s로 어떤 액션을 취하시겠습니까? (3-벳, 콜, 폴드 중 선택)
근거를 포함해 설명해주세요.`,
    difficulty: 'INTERMEDIATE',
    category: 'RANGE_ANALYSIS',
    gameContext: {
      smallBlind: 0.5,
      bigBlind: 1,
      heroPosition: 'BB',
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
      heroCards: [
        { rank: 'T', suit: 'spade' },
        { rank: '9', suit: 'spade' },
      ],
      potSize: 3,
      stage: 'PREFLOP',
      tournamentStage: 'EARLY',
      totalChips: 900,
    },
    correctAction: 'CALL',
    rubric: {
      criteria: [
        {
          id: 'action',
          name: 'Action Correctness',
          nameKo: '액션 정확도',
          maxScore: 20,
          checklistItems: [
            '콜 또는 3-벳을 선택했다 (폴드는 오답)',
            'T9s의 멀티웨이 가치를 이해했다',
          ],
        },
        {
          id: 'position',
          name: 'Position Understanding',
          nameKo: '포지션 이해',
          maxScore: 25,
          checklistItems: [
            'OOP(Out of Position) 불리함을 언급했다',
            'BTN의 넓은 오픈 레인지를 언급했다',
            'BB 방어 의무(팟 오즈 이미 있음)를 언급했다',
          ],
        },
        {
          id: 'range',
          name: 'Range Analysis',
          nameKo: '레인지 분석',
          maxScore: 30,
          checklistItems: [
            'BTN 오픈 레인지(~45-50%)를 언급했다',
            'T9s의 플랍 실현 에퀴티(playability)를 고려했다',
            '3-벳 vs 콜 결정에 대한 합리적 근거가 있다',
          ],
        },
        {
          id: 'reasoning',
          name: 'Reasoning Quality',
          nameKo: '근거 품질',
          maxScore: 25,
          checklistItems: [
            '논리적이고 구체적인 근거를 제시했다',
          ],
        },
      ],
      modelAnswer: `**정답: 콜 (3-벳도 허용 가능)**

GTO 기준으로 T9s는 BB에서 콜이 메인 플레이이며, 때로는 3-벳 블러프 후보가 됩니다.

**BB 방어 논리:**
- 이미 1BB를 투자했으므로 1.5BB를 더 내면 팟 오즈 약 28%
- T9s는 폴드하기엔 너무 강한 핸드

**T9s의 특성:**
- 수이티드 커넥터로 플랍에서 다양한 드로우 가능
- 플러시 드로우(9 아웃), 스트레이트 드로우(8 아웃) 잠재력
- BTN의 넓은 레인지 상대로 에퀴티 충분히 실현 가능

**OOP 고려사항:**
- BTN은 항상 포스트플랍 포지션 어드밴티지를 가짐
- 다만 팟 오즈와 T9s의 플레이어빌리티가 이를 상쇄

**3-벳 여부:**
- 3-벳 블러프로도 사용 가능 (밸런스를 위해)
- 하지만 콜이 더 일반적인 접근법`,
      keyConceptTags: ['Range', 'Position', 'PotOdds', 'BBDefense'],
    },
    publishedAt: new Date().toISOString(),
  },
]

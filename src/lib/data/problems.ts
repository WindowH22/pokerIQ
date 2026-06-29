import type { Problem } from '@/types'
import { PUSH_FOLD_PROBLEMS } from './problems-push-fold'
import { ICM_PROBLEMS } from './problems-icm'
import { RANGE_ANALYSIS_PROBLEMS } from './problems-range'
import { POT_ODDS_PROBLEMS } from './problems-pot-odds'
import { POSITION_PLAY_PROBLEMS } from './problems-position'
import { BLUFF_CATCH_PROBLEMS } from './problems-bluff-catch'
import { HAND_READING_PROBLEMS } from './problems-hand-reading'

const BASE_PROBLEMS: Problem[] = [
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
      actionSequence: [
        { position: 'HJ', action: 'FOLD' },
        { position: 'CO', action: 'ALL_IN', amount: 8 },
        { position: 'BTN', action: 'CALL', amount: 8 },
      ],
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
    publishedAt: '2024-01-01T00:00:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'prob-002',
    slug: 'btn-shortstack-pushfold',
    title: 'BTN 숏스택 10BB 올인 결정',
    description: `9인 토너먼트 미들 스테이지입니다.

**상황:**
- 당신은 BTN 포지션에 10BB 스택을 보유하고 있습니다
- UTG~CO까지 앞의 모든 플레이어가 폴드하고 당신 차례입니다 (SB, BB는 아직 남아있음)
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
        { position: 'UTG', stackBB: 22, isHero: false, isActive: false },
        { position: 'UTG+1', stackBB: 35, isHero: false, isActive: false },
        { position: 'UTG+2', stackBB: 18, isHero: false, isActive: false },
        { position: 'LJ', stackBB: 41, isHero: false, isActive: false },
        { position: 'HJ', stackBB: 27, isHero: false, isActive: false },
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
      actionSequence: [
        { position: 'UTG', action: 'FOLD' },
        { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' },
        { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' },
        { position: 'CO', action: 'FOLD' },
      ],
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
    publishedAt: '2024-01-01T00:00:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
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
      actionSequence: [
        { position: 'UTG', action: 'FOLD' },
        { position: 'UTG+1', action: 'FOLD' },
        { position: 'UTG+2', action: 'FOLD' },
        { position: 'LJ', action: 'FOLD' },
        { position: 'HJ', action: 'FOLD' },
        { position: 'CO', action: 'FOLD' },
        { position: 'BTN', action: 'RAISE', amount: 2.5 },
        { position: 'SB', action: 'FOLD' },
      ],
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
    publishedAt: '2024-01-01T00:00:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
]

export const PROBLEMS: Problem[] = [
  ...BASE_PROBLEMS,
  ...PUSH_FOLD_PROBLEMS,
  ...ICM_PROBLEMS,
  ...RANGE_ANALYSIS_PROBLEMS,
  ...POT_ODDS_PROBLEMS,
  ...POSITION_PLAY_PROBLEMS,
  ...BLUFF_CATCH_PROBLEMS,
  ...HAND_READING_PROBLEMS,
]

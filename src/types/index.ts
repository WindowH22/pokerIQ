export type Suit = 'spade' | 'heart' | 'diamond' | 'club'
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A'

export interface Card {
  rank: Rank
  suit: Suit
}

export type Position =
  | 'UTG' | 'UTG+1' | 'UTG+2'
  | 'LJ' | 'HJ' | 'CO' | 'BTN'
  | 'SB' | 'BB'

export type Action = 'FOLD' | 'CALL' | 'RAISE' | 'CHECK' | 'ALL_IN' | 'LIMP'

export interface ActionEvent {
  position: Position
  action: Action
  amount?: number
}

export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'

export type ProblemCategory =
  | 'ICM_DECISION'
  | 'RANGE_ANALYSIS'
  | 'PUSH_FOLD'
  | 'POT_ODDS'
  | 'POSITION_PLAY'
  | 'METAGAME'
  | 'BLUFF_CATCH'
  | 'HAND_READING'

export interface PlayerState {
  position: Position
  stackBB: number
  isHero: boolean
  isActive: boolean
}

export interface PayoutStructure {
  place: number
  amount: number
}

export interface GameContext {
  smallBlind: number
  bigBlind: number
  ante?: number
  heroPosition: Position
  players: PlayerState[]
  boardCards?: Card[]
  heroCards?: Card[]
  potSize: number
  stage: 'PREFLOP' | 'FLOP' | 'TURN' | 'RIVER'
  payoutStructure?: PayoutStructure[]
  tournamentStage?: 'EARLY' | 'MIDDLE' | 'BUBBLE' | 'ITM' | 'FINAL_TABLE'
  totalChips?: number
  actionSequence?: ActionEvent[]
}

export interface RubricCriteria {
  id: string
  name: string
  nameKo: string
  maxScore: number
  checklistItems: string[]
}

export interface ProblemRubric {
  criteria: RubricCriteria[]
  modelAnswer: string
  keyConceptTags: string[]
}

export interface Problem {
  id: string
  slug: string
  title: string
  description: string
  difficulty: Difficulty
  category: ProblemCategory
  gameContext: GameContext
  correctAction: Action
  rubric: ProblemRubric
  publishedAt: string | null
  createdAt: string
}

export interface EvaluationScore {
  criteriaId: string
  score: number
  maxScore: number
  feedback: string
}

export interface Evaluation {
  id: string
  submissionId: string
  scores: EvaluationScore[]
  totalScore: number
  maxScore: number
  overallFeedback: string
  conceptsToLearn: string[]
  conceptExplanations: Record<string, string>
  createdAt: string
}

export interface Submission {
  id: string
  problemId: string
  userId: string
  action: Action
  reasoning: string
  submittedAt: string
  evaluation?: Evaluation
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    total: number
    page: number
    limit: number
  }
}

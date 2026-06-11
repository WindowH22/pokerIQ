import {
  pgTable,
  text,
  integer,
  jsonb,
  timestamp,
  boolean,
  varchar,
  real,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  username: varchar('username', { length: 50 }),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const problems = pgTable('problems', {
  id: text('id').primaryKey(),
  slug: varchar('slug', { length: 100 }).unique().notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description').notNull(),
  difficulty: varchar('difficulty', { length: 20 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  gameContext: jsonb('game_context').notNull(),
  correctAction: varchar('correct_action', { length: 20 }).notNull(),
  rubric: jsonb('rubric').notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const submissions = pgTable('submissions', {
  id: text('id').primaryKey(),
  problemId: text('problem_id').notNull().references(() => problems.id),
  userId: text('user_id').notNull().references(() => users.id),
  action: varchar('action', { length: 20 }).notNull(),
  reasoning: text('reasoning').notNull(),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
})

export const evaluations = pgTable('evaluations', {
  id: text('id').primaryKey(),
  submissionId: text('submission_id').notNull().references(() => submissions.id).unique(),
  scores: jsonb('scores').notNull(),
  totalScore: real('total_score').notNull(),
  maxScore: real('max_score').notNull(),
  overallFeedback: text('overall_feedback').notNull(),
  conceptsToLearn: jsonb('concepts_to_learn').notNull(),
  conceptExplanations: jsonb('concept_explanations').notNull(),
  evaluationModel: varchar('evaluation_model', { length: 50 }).default('claude-haiku-4-5'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const concepts = pgTable('concepts', {
  id: text('id').primaryKey(),
  term: varchar('term', { length: 50 }).unique().notNull(),
  termKo: varchar('term_ko', { length: 50 }).notNull(),
  shortDescription: text('short_description').notNull(),
  fullExplanation: text('full_explanation').notNull(),
  difficulty: varchar('difficulty', { length: 20 }).notNull(),
  relatedTerms: jsonb('related_terms').notNull(),
})

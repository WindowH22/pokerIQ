# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # start dev server at http://localhost:3000
npm run build        # production build
npm run lint         # run ESLint

# Database (requires POSTGRES_URL in .env.local)
npm run db:generate  # generate Drizzle migration files from schema changes
npm run db:migrate   # apply pending migrations
npm run db:push      # push schema directly to DB (use in dev, not prod)
npm run db:seed      # seed initial problems and concepts data
```

No test suite is configured yet.

## Required Environment Variables

Copy `.env.example` to `.env.local`:

```
POSTGRES_URL=            # Vercel Postgres connection string
ANTHROPIC_API_KEY=       # Used by the AI grader (claude-haiku-4-5)
GOOGLE_CLIENT_ID=        # NextAuth Google OAuth
GOOGLE_CLIENT_SECRET=
AUTH_SECRET=             # NextAuth secret (generate with: openssl rand -base64 32)
```

## Architecture Overview

**Poker IQ** is a Korean-language Texas Hold'em quiz platform. Users view 9-player table scenarios, select a poker action (Fold/Call/Raise/etc.), write reasoning in Korean, and receive AI-graded feedback.

### Request Flow

1. User submits action + reasoning → `POST /api/submissions`
2. API saves submission to DB, then immediately calls `evaluateSubmission()` in `src/lib/ai/evaluate.ts`
3. `evaluateSubmission` sends the problem rubric + user reasoning to `claude-haiku-4-5` and gets back a JSON checklist
4. Scores are computed from the checklist and persisted to the `evaluations` table
5. The full evaluation is returned in the same HTTP response — there is no async job queue

### Key Data Model

`problems.gameContext` and `problems.rubric` are stored as `jsonb`. The TypeScript types (`GameContext`, `ProblemRubric`) in `src/types/index.ts` define their shape, but Drizzle returns them as `unknown`/`jsonb` at runtime — every page and route that reads these columns must cast them explicitly (see the pattern in `src/app/problems/[slug]/page.tsx:62-68`).

### Database

- ORM: Drizzle with `@vercel/postgres` driver
- Schema: `src/lib/db/schema.ts` (5 tables: `users`, `problems`, `submissions`, `evaluations`, `concepts`)
- Connection: `src/lib/db/index.ts` re-exports all schema tables alongside the `db` client — import everything from `@/lib/db`
- Seed data: `src/lib/db/seed-data.ts` contains pre-written problems and poker concept definitions (ICM, GTO, pot odds, etc.)

### Auth

NextAuth v5 (beta) with Google OAuth. The `signIn` callback auto-creates a user row in the `users` table on first login. Session callbacks attach `session.user.id` from the DB. Auth config is in `src/lib/auth/index.ts` and is imported by API routes as `auth()`.

### Problem Categories & Positions

Problems follow 9-player table positions: UTG, UTG+1, UTG+2, LJ, HJ, CO, BTN, SB, BB. Categories: `ICM_DECISION`, `RANGE_ANALYSIS`, `PUSH_FOLD`, `POT_ODDS`, `POSITION_PLAY`, `METAGAME`, `BLUFF_CATCH`, `HAND_READING`.

### Styling

Dark luxury poker theme. Design tokens defined in `src/app/globals.css` using CSS custom properties (`--color-felt`, `--color-gold`, `--color-surface`, etc.) via Tailwind v4's `@theme inline` block. Use these variables in components rather than hardcoding colors. Card suits are colored: hearts/diamonds = `--color-chip-red`, spades/clubs = white.

### Component Patterns

- `src/components/ui/` — primitive components (`Button`, `Card`, `Badge`) with `cva` variants
- `src/components/features/problem/` — domain components: `PokerTable` (SVG oval table with 9 seat positions), `CardDisplay` (playing card rendering), `SubmitForm` (client component — handles action selection, reasoning input, and shows `EvaluationDisplay` after grading)
- Problem detail page (`src/app/problems/[slug]/page.tsx`) is a server component that queries the DB directly; it renders `SubmitForm` as a client island
- `revalidate = 60` is set on the problem page — content is ISR-cached for 60 seconds

### API Routes

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/problems` | GET | no | List published problems |
| `/api/problems/[slug]` | GET | no | Get single problem |
| `/api/submissions` | POST | required | Submit answer → triggers AI grading |
| `/api/auth/[...nextauth]` | — | — | NextAuth handler |

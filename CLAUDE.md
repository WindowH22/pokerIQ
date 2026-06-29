# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # start dev server at http://localhost:3000
npm run build        # production build
npm run lint         # run ESLint
```

No test suite is configured yet.

## Required Environment Variables

Copy `.env.example` to `.env.local`:

```
GROQ_API_KEY=        # Used by the AI grader (llama-3.1-8b-instant via Groq)
```

## Architecture Overview

**Poker IQ** is a Korean-language Texas Hold'em quiz platform. Users view 9-player table scenarios, select a poker action (Fold/Call/Raise/etc.), write reasoning in Korean, and receive AI-graded feedback.

No database, no authentication. All problem and concept data lives in static TypeScript files.

### Request Flow

1. User submits action + reasoning → `POST /api/submissions`
2. API looks up the problem from `src/lib/data/problems.ts`, then calls `evaluateSubmission()` in `src/lib/ai/evaluate.ts`
3. `evaluateSubmission` sends the problem rubric + user reasoning to `llama-3.1-8b-instant` via Groq and gets back a JSON checklist
4. Scores are computed from the checklist and returned in the same HTTP response — stateless, nothing is persisted

### Static Data

- `src/lib/data/problems.ts` — `PROBLEMS` array (`Problem[]`), 3 pre-written problems
- `src/lib/data/concepts.ts` — `CONCEPTS` array (`Concept[]`), 12 poker concept definitions (ICM, GTO, pot odds, etc.)

Problems are filtered by `publishedAt !== null` (not an `isPublished` boolean).

### Problem Categories & Positions

Problems follow 9-player table positions: UTG, UTG+1, UTG+2, LJ, HJ, CO, BTN, SB, BB. Categories: `ICM_DECISION`, `RANGE_ANALYSIS`, `PUSH_FOLD`, `POT_ODDS`, `POSITION_PLAY`, `METAGAME`, `BLUFF_CATCH`, `HAND_READING`.

### Styling

Dark luxury poker theme. Design tokens defined in `src/app/globals.css` using CSS custom properties (`--color-felt`, `--color-gold`, `--color-surface`, etc.) via Tailwind v4's `@theme inline` block. Use these variables in components rather than hardcoding colors. Card suits are colored: hearts/diamonds = `--color-chip-red`, spades/clubs = white.

### Component Patterns

- `src/components/ui/` — primitive components (`Button`, `Card`, `Badge`) with `cva` variants
- `src/components/features/problem/` — domain components: `PokerTable` (SVG oval table with 9 seat positions, chip animation), `CardDisplay` (playing card rendering), `SubmitForm` (client component — handles action selection, reasoning input, and shows `EvaluationDisplay` after grading)
- Problem detail page (`src/app/problems/[slug]/page.tsx`) is a server component that reads from static data; it renders `SubmitForm` as a client island

### API Routes

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/problems` | GET | no | List published problems |
| `/api/problems/[slug]` | GET | no | Get single problem |
| `/api/submissions` | POST | no | Submit answer → triggers AI grading |

import { db, problems, concepts } from './index'
import { SEED_PROBLEMS, CONCEPTS } from './seed-data'
import { eq } from 'drizzle-orm'

async function seed() {
  console.log('🌱 Seeding database...')

  for (const concept of CONCEPTS) {
    const existing = await db
      .select()
      .from(concepts)
      .where(eq(concepts.id, concept.id))
      .limit(1)

    if (existing.length === 0) {
      await db.insert(concepts).values({
        ...concept,
        relatedTerms: concept.relatedTerms,
      })
      console.log(`  ✓ Concept: ${concept.term}`)
    } else {
      console.log(`  ↩ Concept already exists: ${concept.term}`)
    }
  }

  for (const problem of SEED_PROBLEMS) {
    const existing = await db
      .select()
      .from(problems)
      .where(eq(problems.id, problem.id))
      .limit(1)

    if (existing.length === 0) {
      await db.insert(problems).values({
        id: problem.id,
        slug: problem.slug,
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        category: problem.category,
        gameContext: problem.gameContext as unknown as Record<string, unknown>,
        correctAction: problem.correctAction,
        rubric: problem.rubric as unknown as Record<string, unknown>,
        isPublished: true,
        publishedAt: problem.publishedAt ? new Date(problem.publishedAt) : null,
      })
      console.log(`  ✓ Problem: ${problem.title}`)
    } else {
      console.log(`  ↩ Problem already exists: ${problem.slug}`)
    }
  }

  console.log('✅ Seeding complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})

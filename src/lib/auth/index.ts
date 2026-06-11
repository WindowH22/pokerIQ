import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { db, users } from '@/lib/db'
import { eq } from 'drizzle-orm'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))
        .limit(1)

      if (existing.length === 0) {
        await db.insert(users).values({
          id: crypto.randomUUID(),
          email: user.email,
          username: user.name ?? user.email.split('@')[0],
          image: user.image,
        })
      }

      return true
    },
    async session({ session }) {
      if (session.user?.email) {
        const [dbUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, session.user.email))
          .limit(1)

        if (dbUser) {
          session.user.id = dbUser.id
        }
      }
      return session
    },
  },
})

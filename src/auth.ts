import NextAuth from "next-auth";
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { sql } from '@vercel/postgres'
import bcrypt from "bcrypt";
import { z }from 'zod'


async function getUser(email: string) {
    const data = await sql`SELECT * FROM users WHERE email = ${email}`
    return data.rows[0]
}

const User = {
    email: String,
    password: String,
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z.object({ email: z.string(), password: z.string().min(6) }).safeParse(credentials)
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    const user = await getUser(email)
                    if (!user) return null
                    const passwordMatch = await bcrypt.compareSync(password, user.password)
                    if (passwordMatch) return user
                }
                return null
            }
        })]
});

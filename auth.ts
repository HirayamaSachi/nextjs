import NextAuth from "next-auth";
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { sql } from '@vercel/postgres'

async function getUser(email: string) {
    const data = await sql`SELECT * FROM users WHERE email = ${email}`
    return data.rows[0]
}
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const email = 'hirayama@gmail.com'
                const Users = await getUser(email)
                if (!Users) return null
                return Users
            }
        })]
});

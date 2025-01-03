import NextAuth from "next-auth";
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { sql } from '@vercel/postgres'
import bcrypt from "bcrypt";


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
                const user = await getUser(credentials.email)
                if (!user) return null
                const passwordMatch = await bcrypt.compareSync(credentials.password, user.password)
                if(passwordMatch) return user
                return null
            }
        })]
});

import NextAuth from "next-auth";
import { authConfig } from './auth.config'
import Credentials from './node_modules/next-auth/providers/credentials'
import { sql } from '@vercel/postgres'

async function getUser(email: string) {
    const data = await sql`SELECT * FROM users WHERE ${email}`
    return data.rows[0]
}
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorized(credentials) {
            const email = "hirayama@gmail.com"
            if(credentials.email == email) {
                const Users = getUser(email)
                console.log('success')
                return Users
            }
            return null
        }
    })]
});

'use server'
import { sql } from "../../../../../node_modules/@vercel/postgres/dist/index.cjs"
import { QueryResultRow } from "../../../../../node_modules/@vercel/postgres/dist/index.cjs"
import UserForm from "./form"
export default async function Edit({ params }: { params: Promise<{ user: string }> }) {
    const data = await sql`SELECT * FROM users WHERE id = ${(await params).user}`
    const [UserRow]: QueryResultRow[] = data.rows
    return (
        <UserForm user={UserRow} />
    )
}
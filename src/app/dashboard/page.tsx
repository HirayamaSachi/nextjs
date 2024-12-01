export const dynamic = 'force-dynamic'
import { sql } from "../../../node_modules/@vercel/postgres/dist/index.cjs"
import { QueryResultRow } from "../../../node_modules/@vercel/postgres/dist/index.cjs"

export default async function Page() {
    const data = await sql`SELECT * FROM users;`
    const { rows: users }: {rows: QueryResultRow[]} = data
    return (
        <main>
            <p>user一覧</p>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>

        </main>
    )
}
import { sql } from "../../../node_modules/@vercel/postgres/dist/index.cjs"
export default async function Index() {
    const data = await sql`SELECT * FROM users`
    const { rows: users } = data
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
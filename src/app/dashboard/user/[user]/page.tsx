export const dynamic = 'force-dynamic'
import Link from "../../../../../node_modules/next/link.js"
import { sql } from "../../../../../node_modules/@vercel/postgres/dist/index.cjs"
import { QueryResultRow } from "../../../../../node_modules/@vercel/postgres/dist/index.cjs"
export default async function Detail({params, }: {params: Promise<{ user : string}>}) {
    const data = await sql`SELECT * FROM users WHERE id = ${(await params).user}`
    const { rows: users } : { rows : QueryResultRow[] } = data
    return (
        <main>
            <p>user詳細</p>
            <div className="p-1">
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{users[0].id}</td>
                            <td>{users[0].name}</td>
                            <td>{users[0].email}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Link href="/dashboard">一覧に戻る</Link>
        </main>
    )
}
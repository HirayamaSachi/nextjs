export const dynamic = 'force-dynamic'
import Link from "../../../../../node_modules/next/link.js"
import { sql } from "../../../../../node_modules/@vercel/postgres/dist/index.cjs"
import { QueryResultRow } from "../../../../../node_modules/@vercel/postgres/dist/index.cjs"
export default async function Detail({params, }: {params: Promise<{ user : string}>}) {
    const data = await sql`SELECT * FROM users WHERE id = ${(await params).user}`
    const [UserRow]: QueryResultRow[] = data.rows
    if(!UserRow) return <main><p>404 NOT FOUND</p></main>
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
                            <th>edit user</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{UserRow.id}</td>
                            <td>{UserRow.name}</td>
                            <td>{UserRow.email}</td>
                            <td><Link href={`/dashboard/edit/${UserRow.id}`}>編集する</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Link href="/dashboard">一覧に戻る</Link>
        </main>
    )
}
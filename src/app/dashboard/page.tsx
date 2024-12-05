export const dynamic = 'force-dynamic'
import { sql } from "../../../node_modules/@vercel/postgres/dist/index.cjs"
import { QueryResultRow } from "../../../node_modules/@vercel/postgres/dist/index.cjs"
import Link from "../../../node_modules/next/link.js"

export default async function Page() {
    const data = await sql`SELECT * FROM users;`
    const { rows: users }: {rows: QueryResultRow[]} = data
    return (
        <main className="flex flex-col items-center">
            <div>
                <div className="flex justify-between">
                    <h1 className="text-4xl font-extrabold dark:text-white">user一覧</h1>
                    <Link href="/dashboard/create" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Create User</Link>
                </div>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><Link href={`/dashboard/user/${user.id}`}>詳細</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>

        </main>
    )
}
import { UserDetail } from "../../api/UserDetail"
import { Suspense } from 'react'
import Link from "next/link"

export default function Name({ params }: { params: { name: string } }) {
    return (
        <div>
            <Suspense fallback={<p>loading...</p>}>
                <UserDetail name={params.name} />
            </Suspense>
            <Link href="/hackerNews">Topに戻る</Link>
        </div>
    )
}
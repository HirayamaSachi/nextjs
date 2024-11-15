import { Suspense } from 'react'
import { BestNewsDetail } from '../api/BestNewsDetail'
import Link from 'next/link'
export default function BestStories() {
    return (
        <div>
            <Suspense fallback={<p>loading...</p>}>
                <BestNewsDetail />
            </Suspense>
            <Link href="/hackerNews">Topに戻る</Link>
        </div>
    )
}
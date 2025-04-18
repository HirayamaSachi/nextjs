'use client'
import {LatestNewsDetail} from '../api/LatestNewsDetail'
import { Suspense} from 'react'
import Link from 'next/link'

export default function NewStories() {
    return (
        <div>
            <Suspense fallback={<p>loading...</p>}>
                <LatestNewsDetail />
            </Suspense>
            <Link href="/hackerNews">Topに戻る</Link>
        </div>
    )
}
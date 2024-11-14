'use client'
import {TopNewsDetail} from '../api/TopNewsDetail'
import { Suspense} from 'react'
import Link from 'next/link'

export default function NewStories() {
    return (
        <div>
            <Suspense>
                <TopNewsDetail />
            </Suspense>
            <Link href="/hackerNews">Topに戻る</Link>
        </div>
    )
}
'use client'
import {TopNewsDetail} from './api/TopNewsDetail'
import { Suspense} from 'react'
import Link from 'next/link'

export default function App() {
    return (
        <div>
            <h1>Hacker NEWS!</h1>
            <div className='flex'>
                <Link href="/hackerNews/top">Top Stories</Link>
                <Link href="/hackerNews/new">New Stories</Link>
                <Link href="/hackerNews/best">Best Stories</Link>
            </div>
            <Suspense fallback={<p>loading...</p>}>
                <TopNewsDetail />
            </Suspense>
        </div>
    )

}

'use client'
import {TopNewsDetail} from './api/TopNewsDetail'
import { Suspense} from 'react'


export default function App() {
    return (
        <div>
            <h1>Hacker NEWS!</h1>
            <div className='flex'>
                
            </div>
            <Suspense fallback={<p>loading...</p>}>
                <TopNewsDetail />
            </Suspense>
        </div>
    )

}

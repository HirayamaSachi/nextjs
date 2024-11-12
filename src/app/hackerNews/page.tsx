'use client'
import {TopNewsDetail} from './api/dataFetcher'
import { Suspense} from 'react'


export default function App() {
    return (
        <div>
            <h1>Hacker NEWS!</h1>
            <div className='flex'>
                
            </div>
            <Suspense>
                <TopNewsDetail />
            </Suspense>
        </div>
    )

}

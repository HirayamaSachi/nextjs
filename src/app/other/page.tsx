'use client'
import Link from 'next/link'
import { readData } from '../server-action'
import {useState, useEffect} from 'react'

export default function Home() {
    const [data, setData] = useState('nodata')
    useEffect(() => {
        readData().then(res=>{
            setData(res)
        })
    }, [])
    return (
        <main>
            <h2 className="title">other page</h2>
            <p className="msg">メッセージを保存しました</p>
            <ol>
                <pre className="m-5 p-2 border">{data}</pre>
            </ol>
            <div>
                <Link href="/">go back!</Link>
            </div>
        </main>
    )
}
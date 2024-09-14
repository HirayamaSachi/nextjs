'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
    return (
        <main>
            <h2 className="title">other page</h2>
            <p className="msg">this is other page</p>
            <div>
                <Image src="/sample.png" width={200} height={200}/>
            </div>
            <div>
                <Link href="/">go back!</Link>
            </div>
        </main>
    )
}
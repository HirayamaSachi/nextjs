'use client'
import { useSearchParams } from "../../node_modules/next/navigation"

export default async function Home() {
  const searchParams = useSearchParams()
  return (
    <main>
      <h1 className="title">index page</h1>
      <ul>パラメータ
        <li>{searchParams.get('id')}</li>
        <li>{searchParams.get('pass')}</li>
      </ul>
    </main>
  )
}
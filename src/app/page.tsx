'use server'

import { SWRProvider } from './swr-provider'
import GetData from './GetData'

export default async function Home() {
  return (
    <main>
      <h1 className="title">index page</h1>
      <p className="msg font-bold">SWRでデータを取得します</p>
      <SWRProvider>
        <GetData />
      </SWRProvider>
    </main>
  )
}
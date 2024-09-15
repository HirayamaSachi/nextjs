'use client'

import {useState} from 'react'

const url = 'http://localhost:3000/sample.json'

async function getSampleData() {
  const resp = await fetch(
    url,
    {cache: 'no-store'}
  )
  const result = resp.json()
  return result
}

export default function Home() {
  const [msg, setMsg] = useState("dummy message")
  const doAction = () =>{
    getSampleData().then(resp => {
      setMsg(resp.message)
    })
  }

  return (
    <main>
      <h1 className="title">Index page</h1>
      <p className="msg">{msg}</p>
      <div className="form">
        <button className="btn" onClick={doAction}>Click</button>
      </div>

    </main>
  )
}
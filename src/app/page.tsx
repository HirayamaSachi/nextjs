'use client'
import Image from "next/image";

import { useState } from "react";
export default function Home() {
  const [input, setInput] = useState("")
  const [message, setMessage] = useState("your name: ")

  const doChange = (event)=> {
    setInput(event.target.value)
  }
  const onClick = ()=>{
    setMessage("Hello!! " + input + "!")
  }
  return (
    <main>
      <h1 className="title">Next.js sample</h1>
      <p className="msg">{message}</p>
      <input type="text" onChange={doChange} value={input} className="input"/>
      <button onClick={onClick} className="btn">Click</button>
    </main>
  );
}

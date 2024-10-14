'use client'
import { useState } from "react"
export default function Name ()  {
    const [input, setInput] = useState("")
    const [message, setMessage] = useState("お名前は？")

    const inputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const changeMessage = () => {
        setMessage(`こんにちは！${input} さん!`)
    }
    return (
        <main>
            <p>{message}</p>
            <div>
                <input type="text" className="m-2 p-2 border-2" onChange={inputName}/>
                <button onClick={changeMessage}>click</button>
            </div>
        </main>
    )
}
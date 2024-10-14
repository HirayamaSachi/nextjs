'use client'
import { setUncaughtExceptionCaptureCallback } from "process"
import React, { useEffect, useState } from "react"
export default function OddEvenNumber () {
    const [input, setInput] = useState(0)
    const [message, setMessage] = useState("数字を入力してください")
    const changeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(Number(e.target.value))
    }

    useEffect(() => {
        if(input == 0) {
            return
        }
        if(input % 2 == 0) {
            setMessage('偶数です')
        } else {
            setMessage('奇数です')
        }
    }, [input])

    return (
        <main>
            <div>
                <p>{message}</p>
                <input type="text" onChange={changeNumber}/>
            </div>
        </main>
    )
}
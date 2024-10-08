'use client'
import { useEffect, useState } from 'react'
import { readTodo } from '@/app/server-action'
import { QueryResultRow } from '../../../../node_modules/@vercel/postgres/dist/index.cjs'

export default function Todo()  {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        readTodo().then(res => setTodos(res))
        setLoading(false)
    }, [])

    return (
        <div>
            {
                loading ?
                "取得中" : 
                todos.map((todo) => 
                <div key={todo.id}>
                    <p>{todo.finished ? '[x]' : '[ ]'}{todo.name}</p>
                </div>
                )
            }
        </div>
    )

}
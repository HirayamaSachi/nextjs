'use client'
import { useEffect, useState } from 'react'
import { readTodo } from '@/app/server-action'
import { QueryResultRow } from '../../../../node_modules/@vercel/postgres/dist/index.cjs'
import Link from '../../../../node_modules/next/link.js'

export default function Todo()  {
    const [todos, setTodos] = useState<QueryResultRow[]>([])
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
                    <p>
                        {todo.finished ? '[x]' : '[ ]'}{todo.name}
                        <Link href={"/todo/detail/" + `${todo.id}`}>詳細</Link>
                    </p>
                </div>
                )
            }
        </div>
    )

}
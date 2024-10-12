'use client'
import { useEffect, useState } from 'react'
import { readTodo } from '@/app/server-action'
import { QueryResultRow } from '../../../../node_modules/@vercel/postgres/dist/index.cjs'
import Link from '../../../../node_modules/next/link.js'
import { Suspense } from 'react'
import SearchBar from './searchBar'

export default function Todo({searchParams} : {searchParams? : { query?: string}})  {
    const [todos, setTodos] = useState<QueryResultRow[]>([])
    console.log(searchParams)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const page = searchParams ? Number(searchParams?.query) : 0
        readTodo(page).then(res => { 
            setTodos(res) 
            setLoading(false)
        })
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
            <Suspense><SearchBar/></Suspense>
        </div>
    )
}
'use client'
import { useEffect, useState } from 'react'
import { readTodo } from '@/app/server-action'


export default function Todo()  {
    const [todos, setTodos] = useState([])
    useEffect(()=>{
        readTodo().then(res => setTodos(res))

    }, [])

    return (
        <div>
            {
                todos.map((todo) => 
                <div key={todo.id}>
                    <p>{todo.finished ? '[x]' : '[ ]'}{todo.name}</p>
                    <label>{}</label>
                </div>
                )
            }
        </div>
    )

}
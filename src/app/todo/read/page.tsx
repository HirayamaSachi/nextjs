'use client'
import { useEffect, useState } from 'react';
import useSWR from 'swr'


export default function Todo()  {
    const [todos, setTodos] = useState([])
    useEffect(()=>{
        const fetchTodos = async () => {
            try {
                const res = await fetch('/todos.js')
                console.log(res)
                // const data = await res.json()
                // setTodos(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchTodos()
    }, [])

    return (
        <div>
            {
                todos.map((todo) => 
                <div key={todo.id}>
                    <input type="checkbox" name="finished" id={todo.id} defaultChecked={todo.finished ? true : false}/>
                    <label>{todo.name}</label>
                </div>
                )
            }
        </div>
    )

}
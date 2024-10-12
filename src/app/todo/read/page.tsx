'use client'
import { useEffect, useState } from 'react'
import { readTodo } from '@/app/server-action'
import { QueryResultRow } from '../../../../node_modules/@vercel/postgres/dist/index.cjs'
import Link from '../../../../node_modules/next/link.js'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export default function Todo()  {
    const [todos, setTodos] = useState<QueryResultRow[]>([])
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathName = usePathname();
    const { replace } = useRouter();
    function handleSearch (term: string) {
        if(term) {
            params.set('query', term)
        }else {
            params.delete('query')
        }
        replace(`${pathName}?${params.toString()}`)
    }
    useEffect(()=>{
        const page:number = searchParams.get('query') ? Number(searchParams.get('query')) : 0
        readTodo(page).then(res => setTodos(res))
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
            <input 
            className='className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"'
            onChange={(e) => {
                handleSearch(e.target.value)
            }}
            defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    )

}
import { getTodoById } from '../../../server-action'
interface Params{
    id: number
}

export default async function Id({params}: {params:Params}) {
    const todoArray = await getTodoById(params.id)
    const todo = todoArray[0]

    
    
    return (
            <main>
                <p>{todo.id}</p>
                <p>{todo.name}</p>
                <p>{todo.finished ? '完了' : '未完了'}</p>
            </main>
            
    ) 
}
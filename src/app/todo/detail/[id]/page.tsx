import { QueryResult } from '../../../../../node_modules/@vercel/postgres/dist/index.cjs'
import { getTodoById, updateTodo, deleteTodo} from '../../../server-action'
interface Params{
    id: string
}

type Todo = {
    id: number,
    name: string,
    finished: boolean
}

export default async function Id({params}: {params:Params}) {
    const todoArray: QueryResultRow[] = await getTodoById(params.id)
    const todo: Todo = todoArray[0]

    return (
            <main>
                {
                    (todo.length === 0) ?
                    '不正なidです' : 
                    <div className="flex">
                    <form className='form' action={updateTodo}>
                        <input type="hidden" name="id" value={todo.id} />
                        <input className='input' type="text" name="name" defaultValue={todo.name}/>
                        <label htmlFor="finished">finished</label>
                        <input type="checkbox" name="finished" defaultChecked={todo.finished}/>
                        <button className="btn">update</button>
                    </form>
                    <form className='form' action={deleteTodo}>
                        <input type="hidden" name="id" value={todo.id} />
                        <button className='deleteBtn'>delete</button>
                    </form>
                </div>
                }
            </main>
            
    ) 
}
import { getTodoById, updateTodo, deleteTodo} from '../../../server-action'
interface Params{
    id: string
}


export default async function Id({params}: {params:Params}) {
    const todoArray = await getTodoById(params.id)
    const todo = todoArray.length === 0 ? [] : todoArray[0]

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
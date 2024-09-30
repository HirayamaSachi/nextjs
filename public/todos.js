import { readTodo} from '../src/app/server-action'

export default function handler(req,res) {
    try {
        const todos = await readTodo()
        return new Response(JSON.stringify(todos), {
            status:200,
            headers: {'Content-Type': 'application/json'}
        })
    } catch(error) {
        res.status(500).json({error:'failed'})
    }
}
import { createTodo, serverAction } from "../../server-action";

export default function Create() {
    return (
        <main>
            <h1>Create Todo</h1>
            <form action={createTodo}>
                <input className="input" type="text" name="name" />
                <button className="btn" type="submit">add</button>
            </form>
        </main>
    )
}

import { readTodo } from '../../server-action'

export default async function Todo()  {
    // todo:読み込み
    const {rows} = await readTodo()
    if (!rows) {
        return <div>No todos available</div>; // エラーハンドリング
    }

    return (
        <div>
            {
                rows.map((row) => 
                    <p>{row.finished ? '[x]': '[ ]'}:{row.name}</p>
                )
            }
        </div>
    )

}
'use client'
import { deleteUser } from "../action";

export function DeleteButton(props : {userId : number})
{
    const handleDelete = async () => {
        await deleteUser(props.userId)
    }
    return (
        <button onClick={handleDelete}>Delete</button>
    )
}
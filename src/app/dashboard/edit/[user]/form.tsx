'use client'
import { editUser } from "../../action"
import { useFormState, useFormStatus } from "react-dom"
import { QueryResultRow } from "../../../../../node_modules/@vercel/postgres/dist/index.cjs"
const initialState = {
    name: "",
    email: "",
    password: ""
}

export default function UserForm(props: { user : QueryResultRow}) {
    const [state, formAction] = useFormState(editUser, initialState)
    return (
        <div className='p-10'>
            <h1 className='text-center mb-4 text-4xl font-extrabold leading-none tracking-tighter text-gray-900'>EDIT USER</h1>
            <form action={formAction} className="flex flex-col items-center">
                <div className='p-1'>
                    <label htmlFor="name" className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>名前</label>
                    <input type="text" name="name" id="name" className='block w-96 p-1 border focus:border-blue-500 border-gray-950' defaultValue={props.user.name} />
                    <p className='text-red-500 text-sm' aria-live='polite'>{state?.name}</p>
                </div>
                <div className='p-1'>
                    <label htmlFor="email" className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>メールアドレス</label>
                    <input type="text" name="email" id="email" className='block w-96 p-1 border focus:border-blue-500 border-gray-950' defaultValue={props.user.email} />
                    <p className='text-red-500 text-sm' aria-live='polite'>{state?.email}</p>
                </div>
                <div className='p-1'>
                    <label htmlFor="password" className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>パスワード</label>
                    <input type="password" name="password" id="password" className='block w-96 p-1 border focus:border-blue-500 border-gray-950' defaultValue={props.user.password} />
                    <p className='text-red-500 text-sm' aria-live='polite'>{state?.password}</p>
                </div>
                <input type="hidden" name="id" value={props.user.id} />
                <SubmitButton />
            </form>
        </div>
    )
}

export function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button disabled={pending}>更新</button>
    )
}
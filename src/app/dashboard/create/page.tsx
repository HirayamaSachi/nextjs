'use client'

import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { createUser } from '@/app/dashboard/action'
const initialState = {
    name: '',
    email: '',
    password: '',
}

export default function Create() {
    const [state, formAction] = useFormState(createUser, initialState);
    return (
        <div>
            <h1>CREATE USER</h1>
            <form action={formAction}>
                <div className='p-1'>
                    <label htmlFor="name">名前</label>
                    <input type="text" name="name" id="name" />
                    <p className='text-red-500' aria-live='polite'>{state?.name}</p>
                </div>
                <div className='p-1'>
                    <label htmlFor="email">メールアドレス</label>
                    <input type="text" name="email" id="email" />
                    <p className='text-red-500' aria-live='polite'>{state?.email}</p>
                </div>
                <div className='p-1'>
                    <label htmlFor="password">パスワード</label>
                    <input type="text" name="password" id="password" />
                    <p className='text-red-500' aria-live='polite'>{state?.password}</p>
                </div>
                <SubmitButton />
            </form>
        </div>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" aria-disabled={pending}>追加</button>
    )
} 
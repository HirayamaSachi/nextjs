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
        <main>
            <div className='p-10'>
                <h1 className='text-center mb-4 text-4xl font-extrabold leading-none tracking-tighter text-gray-900'>CREATE USER</h1>
                <form action={formAction} className="flex flex-col items-center">
                    <div className='p-1'>
                        <label htmlFor="name" className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>名前</label>
                        <input type="text" name="name" id="name" className='block w-96 p-1 border focus:border-blue-500 border-gray-950' />
                        <p className='text-red-500 text-sm' aria-live='polite'>{state?.name}</p>
                    </div>
                    <div className='p-1'>
                        <label htmlFor="email" className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>メールアドレス</label>
                        <input type="text" name="email" id="email" className='block w-96 p-1 border focus:border-blue-500 border-gray-950' />
                        <p className='text-red-500 text-sm' aria-live='polite'>{state?.email}</p>
                    </div>
                    <div className='p-1'>
                        <label htmlFor="password" className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>パスワード</label>
                        <input type="text" name="password" id="password" className='block w-96 p-1 border focus:border-blue-500 border-gray-950' />
                        <p className='text-red-500 text-sm' aria-live='polite'>{state?.password}</p>
                    </div>
                    <SubmitButton />
                </form>
            </div>

        </main>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        // <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Dark</button>

        <button type="submit" aria-disabled={pending} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">追加</button>
    )
} 
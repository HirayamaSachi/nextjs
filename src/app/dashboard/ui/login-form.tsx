'use client'

import { useFormState, useFormStatus } from "react-dom"
import {authenticate} from '../action'
export default function LoginForm() {
    const [state, formAction] = useFormState(authenticate, undefined)
    const {pending} = useFormStatus()
    return (
        <div className='p-10'>
            <h1 className='text-center mb-4 text-4xl font-extrabold leading-none tracking-tighter text-gray-900'>login</h1>
            <form action={formAction} className="flex flex-col items-center">
                <div className='p-1'>
                    <label htmlFor="email" className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>メールアドレス</label>
                    <input type="text" name="email" id="email" className='block w-96 p-1 border focus:border-blue-500 border-gray-950' />
                    <p className='text-red-500 text-sm' aria-live='polite'></p>
                </div>
                <div className='p-1'>
                    <label htmlFor="password" className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>パスワード</label>
                    <input type="text" name="password" id="password" className='block w-96 p-1 border focus:border-blue-500 border-gray-950' />
                    <p className='text-red-500 text-sm' aria-live='polite'></p>
                </div>
                <button aria-disabled={pending}>
                    Log In
                </button>
            </form>
        </div>
    )
}
'use client'

import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { createUser } from '@/app/dashboard/action'
const initialState = {
    message : ''
}

export default function Create() {
    const [state, formAction] = useFormState(createUser, initialState);
    return (
        <div>
            <h1>CREATE USER</h1>
            <form action={formAction}>
                <input type="text" name="name" />
                <input type="text" name="email" />
                <input type="text" name="password" />
                <p aria-live='polite'>{state?.message}</p>
                <SubmitButton />
            </form>
        </div>
    )
}

function SubmitButton () {
    const { pending } = useFormStatus();
    return (
        <button type="submit" aria-disabled={pending}>追加</button>
    )
}
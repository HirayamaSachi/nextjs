'use client'

const initialState = {
    email: '',
    password: '',
}
import { useFormState, useFormStatus } from "react-dom"
import {authenticate} from '../action'
export default function LoginForm() {
    const [state, formAction] = useFormState(authenticate, initialState)
    const {pending} = useFormStatus()
    return (
        <form action={formAction}>
            <button aria-disabled={pending}>
                Log In
            </button>
        </form>
    )
}
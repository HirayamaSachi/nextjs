'use server'
import { redirect } from 'next/navigation'
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { signIn } from '@/auth'
import bcrypt from "bcrypt"
export type FormState = {
    name?: string,
    email?: string,
    password?: string,
}
import { signOut } from "@/auth";
import { format } from 'path'

export async function createUser(prevState: FormState, formData: FormData) {
    const schema = z.object({
        name: z.string().min(1, "nameの入力は必須です"),
        email: z.string().min(1, "emailの入力は必須です").email("メールアドレスを入力してください"),
        password: z.string().min(8, "8文字以上で入力してください")
    })
    const parse = schema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    })
    if (!parse.success) {
        const formatted = parse.error.format()
        return {
            name: formatted.name?._errors.join(", "),
            email: formatted.email?._errors.join(", "),
            password: formatted.password?._errors.join(", "),
        };
    }
    const data = parse.data;
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(data.password, salt)
        await sql`INSERT INTO users (name, email, password, salt) VALUES (${data.name}, ${data.email}, ${hash}, ${salt})`;

    } catch (e) {
        throw new Error(`br>Failed to create User: ${e}`)
    }
    revalidatePath('/dashboard')
    redirect('/dashboard')
}

type EditFormState = {
    id?: number,
    name?: string,
    email?: string,
}
export async function editUser(prevState: EditFormState, formData: FormData) {
    const rawFormData : EditFormState = Object.fromEntries(formData);
    
    const schema = z.object({
        name: z.string().min(1, "nameの入力は必須です"),
        email: z.string().min(1, "emailの入力は必須です").email("メールアドレスを入力してください"),
    })
    const result = schema.safeParse({
        name: rawFormData.name,
        email: rawFormData.email,
    })
    if(!result.success) {
        const formatted = result.error.format()
        return {
            name: formatted.name?._errors.join(", "),
            email: formatted.email?._errors.join(", "),
        }
    }
    const data = result.data;
    try {
        await sql`UPDATE users SET name = ${data.name}, email = ${data.email} WHERE id = ${rawFormData.id}`
    } catch (e) {
        throw new Error(`Failed to update User: ${e}`);
    }
    revalidatePath('/dashboard')
    revalidatePath(`/dashboard/user/${rawFormData.id}`)
    revalidatePath(`/dashboard/edit/${rawFormData.id}`)
    redirect('/dashboard')
    return {
        name: "",
        email: "",
    }

}

type CreateFormState = {
    email?: string,
    password?: string
}

export async function authenticate(_prevState: CreateFormState, formData: FormData)
{
    const result = z.object({
        email: z.string().min(6, "emailの入力は必須です"),
        password: z.string().min(6, "passwordの入力は必須です") 
    }).safeParse({email: formData.get('email'), password: formData.get('password')})
    if(!result.success) {
        const formatted = result.error.format()
        return {
            email: formatted.email?._errors.join(", "),
            password: formatted.password?._errors.join(", ")
        }
    }
    try {
        await signIn('credentials', {email:formData.get('email'), password: formData.get('password'), callbackUrl: "/dashboard"})
    } catch (error) {
        return {
            email: "メールアドレスかパスワードが正しくありません",
            password: ""
        }
    }
    return {
        email: "",
        password: ""
    }
}

export async function logout() {
    await signOut({redirectTo:"/dashboard/login"});
}
export async function deleteUser(userId: number) {
    await sql`UPDATE users SET valid = false where id = ${userId}`
    revalidatePath('/dashboard')
    revalidatePath(`/dashboard/user/${userId}`)
    revalidatePath(`/dashboard/edit/${userId}`)
    redirect('/dashboard')
}
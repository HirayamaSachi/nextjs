'use server'
import { redirect } from 'next/navigation'
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache";
import { z } from "zod"
export type FormState = {
    name?: string,
    email?: string,
    password?: string,
}

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
        await sql`INSERT INTO users (name, email, password) VALUES (${data.name}, ${data.email}, ${data.password})`;

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
    password?: string,
}
export async function editUser(prevState: FormState, formData: FormData) {
    const rawFormData : EditFormState = Object.fromEntries(formData);
    
    const schema = z.object({
        name: z.string().min(1, "nameの入力は必須です"),
        email: z.string().min(1, "emailの入力は必須です").email("メールアドレスを入力してください"),
        password: z.string().min(8, "8文字以上で入力してください")
    })
    const result = schema.safeParse({
        name: rawFormData.name,
        email: rawFormData.email,
        password: rawFormData.password
    })
    if(!result.success) {
        const formatted = result.error.format()
        return {
            name: formatted.name?._errors.join(", "),
            email: formatted.email?._errors.join(", "),
            password: formatted.password?._errors.join(", "),
        }
    }
    const data = result.data;
    try {
        await sql`UPDATE users SET name = ${data.name}, email = ${data.email}, password = ${data.password} WHERE id = ${rawFormData.id}`
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
        password: ""
    }

}
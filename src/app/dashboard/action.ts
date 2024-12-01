'use server'
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache";
import { z } from "zod"

export async function createUser(prevState: {message: string}, formData: FormData) {
    const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    })
    const parse = schema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    })
    if(!parse.success) {
        return { message: `validation error`};
    }
    const data = parse.data;
    try {
        await sql`INSERT INTO users (name, email, password) VALUES (${data.name}, ${data.email}, ${data.password})`;

        revalidatePath("dashboard/users")
        return { message: `success`};
    } catch (e){
        throw new Error( `br>Failed to create User: ${e}` )

    }
}
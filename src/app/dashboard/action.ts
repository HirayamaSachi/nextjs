'use server'
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache";

export async function createUser(prevState, formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
        await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password})`;
    } catch (e){
        throw new Error( `Failed to create User: ${e}` )
    }
    revalidatePath("/dashboard/users")
}
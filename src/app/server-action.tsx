"use server"
import { redirect } from 'next/navigation'
import fs from 'fs'
import { sql } from '@vercel/postgres'
import { z } from 'zod'
import internal from 'stream'
import { revalidatePath } from '../../node_modules/next/cache'


const fname = './data.txt'

export async function serverAction(form: FormData) {
    const input = form.get('input')
    fs.appendFileSync(fname, input + '\n')
    redirect('/other')
}

export async function readData() {
    return fs.readFileSync(fname, 'utf-8')
}

const TodoFormSchema = z.object({
    name: z.string()
})


export async function createTodo (form: FormData) {
    const { name } = TodoFormSchema.parse({
        name: form.get('name')
    })
    const finished = 0
    await sql`INSERT INTO todo (name, finished) VALUES (${ name }, ${ finished })`
    redirect('/todo/read')
}

export async function readTodo () {
    // todo:paginatorつける
    const data = await sql`SELECT * FROM todo`
    return data.rows

}

export async function getTodoById (id: string) {
    const todoId = id
    const data = await sql`SELECT * FROM todo WHERE id = ${todoId}`
    return data.rows
}


// todo:updateをつける
export async function updateTodo (form:FormData) {
    const finished = form.get('finished') ?? false
    const name = form.get('name')
    const id = form.get('id')
    await sql`UPDATE todo SET name = ${name}, finished = ${finished} WHERE id = ${id}`
    revalidatePath(`/todo/detail/${form.get('id')}`)
    redirect(`/todo/detail/${form.get('id')}`)
}



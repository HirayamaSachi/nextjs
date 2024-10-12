"use server"
import { redirect } from 'next/navigation'
import fs from 'fs'
import { sql } from '@vercel/postgres'
import { z } from 'zod'
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
    id: z.string(),
    name: z.string(),
    finished: z.boolean()
})

const CreateTodo = TodoFormSchema.pick({name: true})
export async function createTodo (form: FormData) {
    const { name } = CreateTodo.parse({
        name: form.get('name')
    })
    const finished = 0
    await sql`INSERT INTO todo (name, finished) VALUES (${ name }, ${ finished })`
    redirect('/todo/read')
}

export async function readTodo (page? : number) {
    // todo:paginatorつける
    const offset = (page && page > 0) ? (page - 1) * 5 : 0
    const data = await sql`SELECT * FROM todo LIMIT 5 OFFSET ${offset}`
    // const data = await sql`SELECT * FROM todo`
    return data.rows

}

export async function getTodoById (id: string) {
    const todoId = id
    const data = await sql`SELECT * FROM todo WHERE id = ${todoId}`
    return data.rows
}


export async function updateTodo (form:FormData) {
    const UpdateTodo = TodoFormSchema.pick({id:true, name:true, finished:true})
    const {id, name, finished} = UpdateTodo.parse({
        id: form.get('id'),
        name: form.get('name'),
        finished: form.get('finished') ? true : false
    })
    await sql`UPDATE todo SET name = ${name}, finished = ${finished} WHERE id = ${id}`
    revalidatePath(`/todo/detail/${form.get('id')}`)
    redirect(`/todo/detail/${form.get('id')}`)
}

export async function deleteTodo (form: FormData) {
    const DeleteTodo = TodoFormSchema.pick({id:true})
    const {id} = DeleteTodo.parse({
        id: form.get('id')
    })
    await sql`DELETE FROM todo WHERE id = ${id}`
    revalidatePath(`/todo/detail/${id}`)
    redirect('/todo/read')
}


"use server"
import { redirect } from 'next/navigation'
import fs from 'fs'
import { sql } from '@vercel/postgres'
import { z } from 'zod'


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
    return await sql`SELECT * FROM todo`
}

// todo:updateをつける


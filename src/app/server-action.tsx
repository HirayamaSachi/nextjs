"use server"
import { redirect } from 'next/navigation'
import fs from 'fs'

const fname = './data.txt'

export async function serverAction(form) {
    const input = form.get('input')
    fs.appendFileSync(fname, input + '\n')
    redirect('/other')
}

export async function readData() {
    return fs.readFileSync(fname, 'utf-8')
}

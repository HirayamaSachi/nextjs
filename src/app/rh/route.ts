"use server"

export async function GET(_request: Request) {
    const res = {content:'Hello, this is API content!'}
    return new Response(JSON.stringify(res), {
        status:200,
        headers:{'Content-Type' : 'application/json'}
    })
}
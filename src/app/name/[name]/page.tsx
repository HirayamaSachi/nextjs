'use server'

const paths = [
    {name:"taro"},
    {name:"hanako"},
    {name:"sachi"},
]

export async function generateStaticParams() {
    return paths
}
// https://nextjs.org/docs/app/building-your-application/upgrading/version-15#params--searchparams
type Params = Promise<{name:string}>
export default async function Name({params}:{params: Params}) {
    const { name } = await params
    console.log(params)
    const result = paths.some(path=>path.name === name)
    return (
        <main>
            {result ?
            <>
                <h1 className="title">&quot;{name}&quot;</h1>
                <p className="msg">{name}さんこんにちは!</p>
            </>
            :
            <>
                <h1 className="title">&quot;{name}&quot;</h1>
                <p className="msg">{name}は使えません</p>
            </>
            }
        </main>
    );
}
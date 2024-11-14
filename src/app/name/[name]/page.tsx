'use server'

const paths = [
    {name:"taro"},
    {name:"hanako"},
    {name:"sachi"},
]

export async function generateStaticParams() {
    return paths
}
export default async function Name({params}:{params:{name:string}}) {
    const result = paths.some(path=>path.name === params.name)
    return (
        <main>
            {result ?
            <>
                <h1 className="title">&quot;{params.name}&quot;</h1>
                <p className="msg">{params.name}さんこんにちは!</p>
            </>
            :
            <>
                <h1 className="title">&quot;{params.name}&quot;</h1>
                <p className="msg">{params.name}は使えません</p>
            </>
            }
        </main>
    );
}
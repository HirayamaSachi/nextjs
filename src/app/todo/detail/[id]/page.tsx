interface Params{
    id: int
}

export default function Id({params}: {params:Params}) {
    return (
        <main>
            <p>{params.id}</p>
        </main>
    ) 
}
export default function Name({params}:{params:{name:string}}) {
    return (
        <main>
            <h1 className="title">Name page</h1>
            <p className="msg">あなたは「{params.name}」ですね</p>
            <div><a href="/">go back!</a></div>
        </main>
    );
}
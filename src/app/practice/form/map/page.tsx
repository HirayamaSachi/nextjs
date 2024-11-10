export default function App() {
    const data = [
        {name: "Taro", email: "Taro@gmail.com"},
        {name: "Sachi", email: "Sachi@gmail.com"},
        {name: "Hime", email: "Hime@gmail.com"},
        {name: "Ihika", email: "Ihika@gmail.com"},
    ]

    return (
        <div className="App">
            <ul>
                {
                    data.map((item, key) => {
                        return (
                            <li key={key}>{item.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
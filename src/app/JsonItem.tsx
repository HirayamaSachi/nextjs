"use client"

interface SampleData { 
    message: string,
    data: { 
        name: string,
        mail: string,
        age: number
    }
}

export default function JsonItem(props: SampleData) {
    return (
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.mail}</td>
            <td>{props.data.age}</td>
        </tr>
    )
}
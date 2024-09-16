"use client"

export default function JsonItem(props) {
    return (
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.mail}</td>
            <td>{props.data.age}</td>
        </tr>
    )
}
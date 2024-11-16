'use client'
import { fetcher, BASE_API_URL } from "./data_fetcher"
import useSWR from 'swr'

interface Props {
    name: string
}


export function UserDetail(props: Props) {
    const { data, error, isLoading } = useSWR(BASE_API_URL + `user/${props.name}.json?print=pretty`, fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    if (!data) {
        return <div>newsData loading...</div>
    }
    const dateTime = new Date(data.created * 1000)
    return (
        <div>
            <div className="p-1">
                <h1 className="font-semibold">{data.id}</h1>
                {data.about ? <p className="p-0.5">about: {data.about}</p> : ''}
                <p className="p-0.5">karma:{data.karma}</p>
                <p className="p-0.5">created at:{dateTime.toLocaleDateString()}</p>
            </div>
        </div>
    )
}
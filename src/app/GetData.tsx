'use client'
import useSWR from 'swr'

const url = '/sample.json'
const fetcher = (url: string)=>fetch(url).then(res=>res.json())

export default function GetData() {
    const {data, error, isLoading} = useSWR(url,fetcher)
    return (
        data ?
        <p className="msg border p-2">{data.message}</p>
        : <p className="msg border p-2">nodata</p>
    )
}
'use client'
import { allFetcher, BASE_API_URL } from "./data_fetcher"
import useSWR from 'swr'
import DOMPurify from "dompurify";

interface Props {
    ids: Array<number>
}


export function CommentDetail(props: Props) {
    const urls = props.ids.map((id: number, _:number) => {return BASE_API_URL + `item/${id}.json?print=pretty`})
    const { data, error, isLoading } = useSWR(urls, allFetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    if (!data) {
        return <div>comment loading...</div>
    }
    if (!Array.isArray(data)) return <div>failed to load</div>
    return (
        data.map((item,key) => {
            const dateTime = new Date(item.time * 1000)
            const safeHTML = DOMPurify.sanitize(item.text)
            return (
                <div key={key}>
                    <div className="p-1 text-xs">
                        <p className="p-0.5 font-bold" dangerouslySetInnerHTML={{__html: safeHTML}} />
                        <div className="flex">
                            <p className="p-0.5">{item.by}</p>
                            <p className="p-0.5">/</p>
                            <p className="p-0.5">created at:{dateTime.toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            )
        })

    )
}
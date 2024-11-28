'use client'
import { fetcher, allFetcher, BASE_API_URL } from './data_fetcher'
import {CommentDetail} from './CommentDetail'
import useSWR from 'swr'
import { useState } from 'react'


interface Props {
    url: string
}
export function NewsDetail(props : Props) {
    const [openIds, setOpenIds] = useState<number[]>([])
    let latestOpenIds = openIds
    const toggleItem = (changeId: number) => {
        if (openIds.includes(changeId)) {
            // setOpenIdsを使用した時点でopenIdsが新しいデータに反映されるわけではないようなのでlatestOpenIdsに代入
            // setOpenIdsは再レンダリングを呼ぶだけなので、更新後の値は次のレンダリングでのみ使用できる
            latestOpenIds = openIds.filter(id => id !== changeId)
            setOpenIds(latestOpenIds)
        } else {
            latestOpenIds = [...openIds, changeId]
            setOpenIds(latestOpenIds)
        }
    }
    const { data: newsIds, error: idsError, isLoading: idsIsLoading } = useSWR(BASE_API_URL + props.url, fetcher)
    const dataUrls = newsIds ? newsIds.slice(0, 5).map((item: number, _: number) => { return BASE_API_URL + `item/${item}.json?print=pretty` }) : ''
    const { data: newsData, error: dataError } = useSWR(dataUrls, allFetcher)
    if (idsError || dataError) return <div>failed to load</div>
    if (idsIsLoading) return <div>loading...</div>
    if (!Array.isArray(newsIds)) {
        return <div>newsIds is loading...</div>
    }
    if (!newsData) {
        return <div>newsData loading...</div>
    }
    if (Array.isArray(newsData)) return (
        <div>
            {newsData.map((item, key) => {
                const dateTime = new Date(item.time * 1000)
                const commentCnt = Array.isArray(item.kids) ? item.kids.length : 0
                return (
                    <div className='p-1' key={key}>
                        <h1><a href={item.url}>{item.title}</a></h1>
                        <div className='flex'>
                            <p className='p-0.5'><a href={`/hackerNews/user/${item.by}`}>By {item.by}</a></p>
                            <p className='p-0.5'>/</p>
                            <p className='p-0.5'>{dateTime.toLocaleDateString()}</p>
                            <p className='p-0.5'>/</p>
                            <p className='p-0.5'>{commentCnt} comments</p>
                            <button onClick={() => toggleItem(key)}>+ comment</button>
                        </div>
                        {latestOpenIds.includes(key) && (<div className='p-3'><CommentDetail ids={item.kids ? item.kids : []} /></div>)}
                    </div>
                )
            })}
        </div>
    )
}
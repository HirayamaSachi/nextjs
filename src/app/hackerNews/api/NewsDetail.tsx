'use client'
import { fetcher, allFetcher, BASE_API_URL } from './data_fetcher'
import useSWR from 'swr'


interface Props {
    url: string
}
export function NewsDetail(props : Props) {
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
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
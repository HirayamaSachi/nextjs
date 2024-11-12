'use client'
import useSWR from 'swr'

const BASE_API_URL = 'https://hacker-news.firebaseio.com/v0/'
function allFetcher(...urls: string[][]) {
    const f = (url: string) => fetch(url).then(r => r.json())
    if (!Array.isArray(urls)) return undefined
    return Promise.all(urls[0].map(f))
}

function fetcher(...urls: [string]) {
    return fetch(...urls).then(res => res.json())
}

export function TopNewsDetail() {
    // apiの取得
    const { data: newsIds, error: idsError, isLoading: idsIsLoading } = useSWR(BASE_API_URL + 'topstories.json?print=pretty', fetcher)
    const dataUrls = newsIds ? newsIds.slice(0,5).map((id : number, _ :number) => {return BASE_API_URL + `item/${id}.json?print=pretty`}) : []
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
                        <h1>{item.title}</h1>
                        <div className='flex'>
                            <p className='p-0.5'>By {item.by}</p>
                            <p className='p-0.5'>{dateTime.toLocaleDateString()}</p>
                            <p className='p-0.5'>{commentCnt} comments</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )

}
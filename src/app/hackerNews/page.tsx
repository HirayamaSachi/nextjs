'use client'
import { GetTopNewsIds, GetNewsDetail} from './api/dataFetcher'


export default function App() {
    const {data : newsIds, error: idsError, isLoading: idsIsLoading} = GetTopNewsIds()
    const {data : newsData, error: dataError} = GetNewsDetail(Array.isArray(newsIds) ? newsIds : [])
    if(idsError || dataError) return <div>failed to load</div>
    if(idsIsLoading) return <div>loading...</div>
    if(!Array.isArray(newsIds)) {
        return <div>newsIds is loading...</div>
    }
    if(!newsData) {
        return <div>newsData loading...</div>
    }
    if(Array.isArray(newsData)) return (
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
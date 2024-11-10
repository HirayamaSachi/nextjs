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
            <h1>{newsData.map((item, key) => (
                <p key={key}>{item.title}</p>
            ))}</h1>
        </div>
    )
}
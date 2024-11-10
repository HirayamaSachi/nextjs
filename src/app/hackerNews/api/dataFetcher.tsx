'use client'
import useSWR from 'swr'

const BASE_API_URL = 'https://hacker-news.firebaseio.com/v0/'
function AllFetcher(...urls: string[][]) {
    const f = (url: string) => fetch(url).then(r => r.json())
    if (!Array.isArray(urls)) return undefined
    return Promise.all(urls[0].map(f))
}

function Fetcher(...urls: [string]) {
    return fetch(...urls).then(res => res.json())
}

export function GetTopNewsIds() {
    const { data, error, isLoading } = useSWR(BASE_API_URL + 'topstories.json?print=pretty', Fetcher)
    return {
        data: data ? data : [],
        error: error ? error : false,
        isLoading: isLoading ? isLoading : false,
    }
}

export function GetNewsDetail(ids : string[]) {
    const dataUrls = ids.slice(0,5).map((id, _) => {return BASE_API_URL + `item/${id}.json?print=pretty`}) 
    const { data, error } = useSWR(dataUrls, AllFetcher)
    return {
        data: data ? data : [],
        error: error ? error : false,
    }
}

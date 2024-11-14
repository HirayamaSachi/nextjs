export const BASE_API_URL = 'https://hacker-news.firebaseio.com/v0/'
export function allFetcher(...urls: string[][]) {
    const f = (url: string) => fetch(url).then(r => r.json())
    if (!Array.isArray(urls)) return undefined
    return Promise.all(urls[0].map(f))
}

export function fetcher(...urls: [string]) {
    return fetch(...urls).then(res => res.json())
}

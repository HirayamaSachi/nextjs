import { usePathname, useSearchParams, useRouter } from 'next/navigation'
export default function SearchBar() {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathName = usePathname();
    const { replace } = useRouter();
    function handleSearch (term: string) {
        if(term) {
            params.set('query', term)
        }else {
            params.delete('query')
        }
        replace(`${pathName}?${params.toString()}`)
    }
    return (
        <input 
        className='className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"'
        onChange={(e) => {
            handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
        />
    )
}
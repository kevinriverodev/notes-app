import { ReactEventHandler } from 'react'

interface SearchInputProps {
    onSearch: ReactEventHandler;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
    return (
        <div className='w-full mb-6 inline-flex justify-center gap-x-2'>
            <input onKeyUp={onSearch} type='search' className='w-full h-10 m-0 p-5 rounded-4xl bg-[#282A3A] focus:outline-0' placeholder='Find note...' />
        </div>
    )
}
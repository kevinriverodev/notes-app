import { ReactNode } from 'react';

interface MainProps {
    children: ReactNode
}

export default function Main({ children }: MainProps) {
    return (
        <main className="flex-4/5 w-full h-auto p-5 bg-[#1E202D] overflow-auto">
            {children}
        </main>
    )
}
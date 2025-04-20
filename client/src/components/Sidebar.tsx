import { ReactNode } from 'react'

interface SidebarProps {
    children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
    return (
        <section className='flex-1/5 min-w-[250px] h-full p-6 text-white bg-[#1A1C28] overflow-auto'>
            {children}
        </section>
    )
}
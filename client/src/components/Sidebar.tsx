import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <section className="hidden md:block flex-1/5 min-w-[250px] h-full p-6 text-[#e2e2e2] bg-[#1A1C28] overflow-auto">
      {children}
    </section>
  )
}
import NotesList from "./NotesList";

export default function Sidebar() {
    return (
        <section className='flex-1/5 min-w-[250px] h-full p-6 text-white bg-[#1A1C28] overflow-auto'>
            <div className='w-full mb-6 inline-flex justify-center gap-x-2'>
                <input type='text' className='w-full h-10 m-0 p-5 rounded-4xl bg-[#282A3A] focus:outline-0' placeholder='Find note...'/>
            </div>
            <NotesList/>
        </section>
    )
}
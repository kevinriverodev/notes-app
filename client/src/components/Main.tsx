import { FaRegEdit } from 'react-icons/fa';

import Note from './Note';
import { NoteObj } from '../Home';

interface MainProps {
    notes: Array<NoteObj>
}

export default function Main({ notes }: MainProps) {
    return (
        <main className='flex-4/5 h-auto p-5 bg-[#1E202D] overflow-auto'>
            <div className='w-auto h-auto flex flex-wrap gap-5 justify-start'>
                {
                    notes.map((note: NoteObj) => (
                        <Note key={note.id} title={note.title} description={note.description} />
                    ))
                }
            </div>
            <button className='inline-flex justify-center align-middle text-center gap-x-3.5 absolute bottom-10 text-lg right-10 w-40 h-15 opacity-95 shadow-lg shadow-[#21A945]/40 text-white font-semibold rounded-lg bg-[#21A945] hover:cursor-pointer hover:bg-[#1BBA45]'>
                <span className='self-center'>Create note</span>
                <FaRegEdit className='self-center' />
            </button>
        </main>
    )
}
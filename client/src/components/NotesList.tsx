import NotesListItem from './NotesListItem';
import { NoteObj } from '../Home';

interface NotesListProps {
    notes: Array<NoteObj>
}

export default function NotesList({ notes }: NotesListProps) {
    return (
        <>
            <h3 className='font-bold'>Notes list</h3>
            <div className='w-full my-2.5 h-[2px] bg-[#282A3A]'></div>
            <ul className='w-full text-left'>
                {
                    notes.map((note: NoteObj) => (
                        <NotesListItem key={note.id} title={note.title} />
                    ))
                }
            </ul>
        </>
    )
}
import Note from './Note';
import { NoteObj } from '../Home';

interface MainProps {
    notes: Array<NoteObj>;
    onToggleModal: (isVisible: boolean) => void;
    onSelectNote: (note: NoteObj) => void;
}

export default function Main({ notes, onToggleModal, onSelectNote }: MainProps) {
    return (
        <main className='flex-4/5 h-auto p-5 bg-[#1E202D] overflow-auto'>
            <div className='w-auto h-auto flex flex-wrap gap-5 justify-start'>
                {
                    notes.map((note: NoteObj) => (
                        <Note onSelectNote={onSelectNote} onTogglemodal={onToggleModal} key={note.id} noteId={note.id} title={note.title} description={note.description} />
                    ))
                }
            </div>
        </main>
    )
}
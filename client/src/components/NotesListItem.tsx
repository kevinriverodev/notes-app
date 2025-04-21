import { NoteObj } from '../pages/Home';

interface NoteListItemProps {
    note: NoteObj;
    onToggleModal: (isVisible: boolean) => void;
    onSelectNote: (note: NoteObj) => void;
}

export default function NoteListItem({ note, onToggleModal, onSelectNote }: NoteListItemProps) {

    function handleFillDetailsForm() {
        onSelectNote(note);
        onToggleModal(true);
    }

    return (
        <li onClick={handleFillDetailsForm} className='w-full p-2 hover:bg-[#282A3A]'><a className='w-full inline-block' href='#'>{note.title}</a></li>
    )
}
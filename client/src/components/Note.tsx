import { NoteObj } from '../Home';

interface NoteProps {
    noteId: number;
    title: string;
    description: string;
    onTogglemodal: (isVisible: boolean) => void;
    onSelectNote: (note: NoteObj) => void;
}

export default function Note({ noteId, title, description, onTogglemodal, onSelectNote }: NoteProps) {

    function handleFillDetailsForm() {
        onSelectNote({ id: noteId, title, description });
        onTogglemodal(true);
    }

    return (
        <div onClick={handleFillDetailsForm} className='w-70 min-h-80 max-h-80 p-6 rounded-4xl flex flex-col text-white bg-[#282A3A] hover:cursor-pointer'>
            <h4 className='w-full mb-2 font-bold flex-1/7 self-center'>{title}</h4>
            <p className='w-full m-0 flex-6/7 overflow-hidden'>{description}</p>
        </div>
    )
}
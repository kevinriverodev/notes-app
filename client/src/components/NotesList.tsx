import NotesListItem from "./NotesListItem";
import { NoteObj } from "../pages/Home";

interface NotesListProps {
  notes: Array<NoteObj>;
  onToggleModal: (isVisible: boolean) => void;
  onSelectNote: (note: NoteObj) => void;
  onToggleBtn: (isVisible: boolean) => void;

}

export default function NotesList({ notes, onToggleModal, onSelectNote, onToggleBtn }: NotesListProps) {
  return (
    <>
      <h3 className="font-bold">Notes list</h3>
      <div className="w-full my-2.5 h-[2px] bg-[#282A3A]"></div>
      <ul className="w-full text-left">
        {
          notes.map((note: NoteObj) => (
            <NotesListItem onToggleBtn={onToggleBtn} onSelectNote={onSelectNote} onToggleModal={onToggleModal} key={note.id} note={note} />
          ))
        }
      </ul>
    </>
  )
}
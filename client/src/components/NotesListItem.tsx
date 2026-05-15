import { Link } from "react-router-dom";
import { NoteObj } from "../pages/Home";

interface NoteListItemProps {
  note: NoteObj;
}

export default function NoteListItem({ note }: NoteListItemProps) {
  return (
    <Link to={`notes/${note.id}`}>
      <li key={note.id} className="w-full p-2 hover:bg-[#282A3A]">{note.title}</li>
    </Link>
  )
}
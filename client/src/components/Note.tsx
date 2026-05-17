import { Link } from "react-router-dom";

interface NoteProps {
  noteId: number
  title: string;
  description: string;
}

export default function Note({ noteId, title, description }: NoteProps) {
  return (
    <Link to={`notes/${noteId}`} className="w-70 min-h-80 max-h-80 p-6 rounded-4xl flex flex-col text-[#e2e2e2] bg-[#282A3A] shadow-xl hover:cursor-pointer">
      <h4 className="w-full mb-2 font-bold flex-1/7 self-center">{title}</h4>
      <p className="w-full m-0 flex-6/7 overflow-hidden">{description}</p>
    </Link>
  )
}
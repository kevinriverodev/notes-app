import { Link, LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";
import { FaFileCirclePlus } from "react-icons/fa6";
import { getNotes, searchNotesByQuery } from "../api/note";
import { handleErrors } from "../helpers/handle-errors";
import Main from "../components/Main";
import MainHeader from "../components/MainHeader"
import Sidebar from "../components/Sidebar"
import NotesList from "../components/NotesList";
import SearchInput from "../components/SearchInput";
import Note from "../components/Note";

export interface NoteObj {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const notes = useLoaderData();

  return (
    <div className="h-dvh flex flex-col justify-center">
      <Outlet/>
      <MainHeader />
      <div className="flex flex-row w-full h-9/10">
        {<Sidebar>
          { <SearchInput /> }
          <NotesList notes={notes} />
        </Sidebar>
        }
        <Main>
          <div className="flex flex-wrap w-full h-auto justify-center gap-5">
            {notes.length > 0 ?
              notes.map((note: NoteObj) => (
                <Note key={note.id} noteId={note.id} title={note.title} description={note.description} />
              ))
              : (
                <p className="text-[#e2e2e2] mt-10 font-bold text-2xl">No notes found</p>
              )
            }
          </div>
        </Main>
      </div>
      <Link to={"notes/new"}>
        <button className="inline-block text-center absolute bottom-10 text-lg right-10 w-40 h-15 opacity-95 shadow-lg shadow-[#1ea53f]/40 text-white font-semibold rounded-lg bg-[#21A945] hover:cursor-pointer hover:bg-[#1d8f3b]">
          <span>Write note <FaFileCirclePlus className="inline-block ml-1.5" /></span>
        </button>
      </Link>
    </div>
  )
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.trim();

    const notes = q ? await searchNotesByQuery(q) : await getNotes();

    return notes?.rows || [];

  } catch (error) {
    handleErrors(error);
    return [];
  }
}
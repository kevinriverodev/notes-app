import { useState, FormEvent } from "react";
import { createNote } from "../api/note";
import Modal from "./Modal";
import { NoteObj } from "../pages/Home";

interface CreateNoteProps {
  isVisible: boolean;
  notes: NoteObj[];
  onToggleModal: (isVisible: boolean) => void;
  onCreateNote: (notes: NoteObj[]) => void;
  onToggleBtn: (isVisible: boolean) => void;
}

export default function CreateNote({ isVisible, notes, onToggleModal, onCreateNote, onToggleBtn }: CreateNoteProps) {

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  //Funcion para manejar el submit del form y crear nota
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const note = await createNote(title, description);

    if (!note) return;

    onCreateNote(
      [
        {
          id: note.id,
          title: note.title,
          description: note.description
        },
        ...notes
      ]
    );

    onToggleModal(false);
    onToggleBtn(true);
    setTitle("");
    setDescription("");
  }

  return (
    <Modal onToggleBtn={onToggleBtn} isVisible={isVisible} onToggleModal={onToggleModal}>
      <form action="#" onSubmit={handleSubmit} className="flex flex-col gap-6 w-full h-auto">
        <fieldset className="flex flex-col text-[#e2e2e2] gap-y-5 mt-5">
          <input onChange={(e) => setTitle(e.currentTarget.value)} className="w-full font-bold text-2xl p-2 md:p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="text" name="title" id="title" value={title} placeholder="Enter a title" required />
          <textarea onChange={(e) => setDescription(e.currentTarget.value)} className="w-full h-90 focus:outline-0 p-2 md:p-5 resize-none bg-[#1E202D] rounded-sm" name="description" id="description" value={description} placeholder="Enter a description" required />
        </fieldset>
        <button type="submit" className="w-15 h-12 ml-auto text-white font-semibold rounded-lg bg-[#21A945] hover:cursor-pointer hover:bg-[#1d8f3b]">
          Save
        </button>
      </form>
    </Modal>
  )
}
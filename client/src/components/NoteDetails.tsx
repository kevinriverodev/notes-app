import { FormEvent, useEffect, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { FaFloppyDisk } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { deleteNote, updateNote } from "../api/note";
import { handleErrors } from "../helpers/handle-errors";
import { showToastMsg } from "../helpers/show-toast-msg";
import { NoteObj } from "../pages/Home";
import Modal from "./Modal"

interface NoteDetailsProps {
  isVisible: boolean;
  note: NoteObj;
  notes: NoteObj[];
  onToggleModal: (isVisible: boolean) => void;
  onChangeNote: (notes: NoteObj[]) => void;
  onToggleBtn: (isVisible: boolean) => void;
}

export default function NoteDetails({ isVisible, note, notes, onChangeNote, onToggleModal, onToggleBtn }: NoteDetailsProps) {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setTitle(note.title);
    setDescription(note.description);
  }, [note]);

  //Funcion para manejar el submit del form y eliminar nota
  async function handleDeleteNote() {
    try {
      const deletedNote = await deleteNote(note.id);

      const filteredNotes = notes.filter((note) => note.id !== deletedNote.id);

      onChangeNote([
        ...filteredNotes
      ]);

      showToastMsg({
        message: "Note successfully deleted",
        type: "success"
      });

      onToggleModal(false);
      onToggleBtn(true);

    } catch (error) {
      handleErrors(error);
    }
  }

  //Funcion para manejar el submit del form y editar nota
  async function handleUpdateNote(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const updatedNote = await updateNote(note.id, title, description);

      const updatedNotes = notes.map(noteobj => {
        if (noteobj.id === note.id) {
          return {
            ...noteobj,
            title: updatedNote.title,
            description: updatedNote.description
          };
        }
        return noteobj;
      });

      showToastMsg({
        message: "Note successfully updated",
        type: "success"
      })

      onChangeNote(updatedNotes);
      setIsReadOnly(true);
      onToggleModal(false);
      onToggleBtn(true);

    } catch (error) {
      handleErrors(error);
    }
  }

  return (
    <Modal onToggleBtn={onToggleBtn} isVisible={isVisible} onToggleModal={onToggleModal} onStopEditing={setIsReadOnly} >
      <form action="#" onSubmit={handleUpdateNote} className="flex flex-col gap-6 w-full h-auto">
        <fieldset key={note.id} className="flex flex-col text-[#e2e2e2] gap-y-5 mt-5">
          <input readOnly={isReadOnly}  onChange={(e) => setTitle(e.currentTarget.value)} className="font-bold text-2xl focus:outline-0 p-5 rounded-sm" type="text" name="title" value={title} required />
          <textarea readOnly={isReadOnly} onChange={(e) => setDescription(e.currentTarget.value)} className="w-full h-90 focus:outline-0 p-5 resize-none rounded-sm" name="description" value={description} required />
        </fieldset>
        <div className="flex flex-row justify-between">
          <button onClick={handleDeleteNote} type="button" className="inline-block justify-center bg-[#686767] w-12 h-12 rounded-lg text-white hover:cursor-pointer hover:bg-[#b4261c]"><FaTrash className="mx-auto text-xl align-middle" /></button>
          <div className="flex flex-row gap-x-3" >
            {
              isReadOnly ? (
                <button type="submit" className="invisible inline-block justify-center bg-[#21A945] w-12 h-12 rounded-lg text-white hover:cursor-pointer hover:bg-[#1d8f3b]"><FaFloppyDisk className="mx-auto text-xl align-middle" /></button>
              ) :
                (
                  <button type="submit" className="visible inline-block justify-center bg-[#21A945] w-12 h-12 rounded-lg text-white hover:cursor-pointer hover:bg-[#1d8f3b]"><FaFloppyDisk className="mx-auto text-xl align-middle" /></button>
                )
            }
            <button onClick={() => { setIsReadOnly(false); setDescription(note.description); setTitle(note.title) }} type="button" className="inline-block justify-center bg-[#2b62c7] w-12 h-12 rounded-lg text-white hover:cursor-pointer hover:bg-[#2655ad]"><FaPenToSquare className="mx-auto text-xl align-middle" /></button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
import { useState } from "react";
import { ActionFunctionArgs, Form, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";
import { FaFloppyDisk } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { deleteNote, getNote, updateNote } from "../api/note";
import { handleErrors } from "../helpers/handle-errors";
import { showToastMsg } from "../helpers/show-toast-msg";
import Modal from "./Modal"

export default function NoteDetails() {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const note = useLoaderData();

  return (
    <Modal>
      <Form method="post" className="flex flex-col gap-6 w-full h-auto">
        <fieldset key={note.id} className="flex flex-col text-[#e2e2e2] gap-y-5 mt-5">
          <input readOnly={isReadOnly} className="font-bold text-2xl focus:outline-0 p-5 rounded-sm" type="text" name="title" defaultValue={note.title} required />
          <textarea readOnly={isReadOnly} className="w-full h-90 focus:outline-0 p-5 resize-none rounded-sm" name="description" defaultValue={note.description} required />
        </fieldset>
        <div className="flex flex-row justify-between">
          <button type="submit" name="intent" value="delete" className="inline-block justify-center bg-[#686767] w-12 h-12 rounded-lg text-white hover:cursor-pointer hover:bg-[#b4261c]"><FaTrash className="mx-auto text-xl align-middle" /></button>
          <div className="flex flex-row gap-x-3" >
            {
              isReadOnly ? (
                <button type="submit" name="intent" value="update" className="invisible inline-block justify-center bg-[#21A945] w-12 h-12 rounded-lg text-white hover:cursor-pointer hover:bg-[#1d8f3b]"><FaFloppyDisk className="mx-auto text-xl align-middle" /></button>
              ) :
                (
                  <button type="submit" name="intent" value="update" className="visible inline-block justify-center bg-[#21A945] w-12 h-12 rounded-lg text-white hover:cursor-pointer hover:bg-[#1d8f3b]"><FaFloppyDisk className="mx-auto text-xl align-middle" /></button>
                )
            }
            <button type="button" onClick={() => setIsReadOnly(false)} className="inline-block justify-center bg-[#2b62c7] w-12 h-12 rounded-lg text-white hover:cursor-pointer hover:bg-[#2655ad]"><FaPenToSquare className="mx-auto text-xl align-middle" /></button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  try {
    if (!id || isNaN(Number(id))) {
      throw Error("Invalid note id");
    }
    
    const note = await getNote(id);

    return note;
  } catch (error) {
    handleErrors(error);

    return [];
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { id } = params;
  const { title, description, intent } = Object.fromEntries(formData) as Record<string, string>;

  try {
    if (!id || isNaN(Number(id))) {
      throw new Error("Invalid note id");
    }

    const noteId = Number(id);

    switch (intent) {
      case "delete": {
        await deleteNote(noteId);
        
        showToastMsg({
          message: "Note successfully deleted",
          type: "success",
        });

        break;
      }
      case "update": {
        await updateNote(noteId, title, description);

        showToastMsg({
          message: "Note successfully updated",
          type: "success"
        });
        
        break;
      }
      default:
        throw new Error("Unknown Action");
    } 

    return redirect("/");
  } catch (error) {
    handleErrors(error);

    return {
      ok: false,
      error: "Error updating note"
    }
  }
}
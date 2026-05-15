import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { createNote } from "../api/note";
import { handleErrors } from "../helpers/handle-errors";
import { showToastMsg } from "../helpers/show-toast-msg";
import Modal from "./Modal";

export default function CreateNote() {
  return (
    <Modal>
      <Form method="post" className="flex flex-col gap-6 w-full h-auto">
        <fieldset className="flex flex-col text-[#e2e2e2] gap-y-5 mt-5">
          <input className="w-full font-bold text-2xl p-2 md:p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="text" name="title" id="title" placeholder="Enter a title" required />
          <textarea className="w-full h-90 focus:outline-0 p-2 md:p-5 resize-none bg-[#1E202D] rounded-sm" name="description" id="description" placeholder="Enter a description" required />
        </fieldset>
        <button type="submit" className="w-15 h-12 ml-auto text-white font-semibold rounded-lg bg-[#21A945] hover:cursor-pointer hover:bg-[#1d8f3b]">
          Save
        </button>
      </Form>
    </Modal>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { title, description } = Object.fromEntries(formData) as Record<string, string>;

  try {
    await createNote(title, description);

    showToastMsg({
      message: "Note successfully created",
      type: "success"
    });

    return redirect("/");
  } catch (error) {
    handleErrors(error);
    
    return {
      ok: false,
      error: "Error creating note"
    }
  }
}
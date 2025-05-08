import { NoteObj } from "../pages/Home";

interface NoteListItemProps {
  note: NoteObj;
  onToggleModal: (isVisible: boolean) => void;
  onSelectNote: (note: NoteObj) => void;
  onToggleBtn: (isVisible: boolean) => void;
}

export default function NoteListItem({ note, onToggleModal, onSelectNote, onToggleBtn }: NoteListItemProps) {

  //Funcion para rellenar el form de editar nota a partir de la nota seleccionada por el usuario
  function handleFillDetailsForm() {
    onSelectNote({ ...note });
    onToggleModal(true);
    onToggleBtn(false);
  }

  return (
    <li onClick={handleFillDetailsForm} className="w-full p-2 hover:bg-[#282A3A]"><a className="w-full inline-block" href="#">{note.title}</a></li>
  )
}
import { ReactNode } from "react";
import { FaXmark } from "react-icons/fa6";

interface ModalProps {
  children: ReactNode;
  isVisible: boolean | null;
  onToggleModal: (isVisible: boolean) => void;
  onStopEditing?: (isReadOnly: boolean) => void;
  onToggleBtn: (isVisible: boolean) => void;
}

export default function Modal({ children, isVisible, onToggleModal, onStopEditing, onToggleBtn }: ModalProps) {

  function handleCloseModal() {
    onToggleModal(false);
    onToggleBtn(true);
    if (onStopEditing) onStopEditing(true);
  }

  return (
    <>
      {isVisible && (
        <div onClick={handleCloseModal} className="absolute w-full h-dvh bg-black opacity-40"></div>
      )}
      <dialog open={isVisible ? true : false} className="w-4/5 md:w-xl mx-auto p-5 bg-[#1A1C28] rounded-sm">
        <button onClick={handleCloseModal} className="flex ml-auto w-10 h-10 justify-center bg-[#1A1C28] text-xl text-white hover:cursor-pointer hover:text-gray-300">
          <FaXmark className="self-center" />
        </button>
        {children}
      </dialog>
    </>
  )
}
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return (
    <>
      <Link to={"/"} className="absolute w-full h-dvh bg-black opacity-40"></Link>
      <dialog open className="w-4/5 md:w-xl mx-auto p-5 bg-[#1A1C28] rounded-sm">
        <Link to={"/"} className="flex ml-auto w-10 h-10 justify-center bg-[#1A1C28] text-xl text-white hover:cursor-pointer hover:text-gray-300">
          <FaXmark className="self-center" />
        </Link>
        { children }
      </dialog>
    </>
  )
}
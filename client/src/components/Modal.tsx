import { ReactNode } from 'react'
import { FaXmark } from 'react-icons/fa6';

interface ModalProps {
    children: ReactNode;
    isVisible: boolean | null;
    onToggleModal: (isVisible: boolean) => void;
    onStopEditing?: (isReadOnly: boolean) => void;
}

export default function Modal({ children, isVisible, onToggleModal, onStopEditing }: ModalProps) {

    function handleCloseModal() {
        onToggleModal(false);
        if (onStopEditing) onStopEditing(true);
    }

    return (
        <>
            {isVisible && (
                <div onClick={handleCloseModal} className='absolute w-full h-dvh bg-black opacity-40'></div>
            )}
            <dialog open={isVisible ? true : false} className='w-150 h-150 mx-auto p-5 self-center bg-[#1A1C28]'>
                <button onClick={handleCloseModal} className='w-10 h-10 bg-[#1A1C28] flex justify-center text-xl ml-auto text-white hover:cursor-pointer hover:text-gray-300'>
                    <FaXmark className='self-center' />
                </button>
                {children}
            </dialog>
        </>
    )
}
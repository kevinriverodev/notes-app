import { useState } from 'react';
import axios from 'axios';
import { FaPenToSquare } from 'react-icons/fa6';
import { FaFloppyDisk } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa6';

import { NoteObj } from '../Home';
import Modal from './Modal'

interface NoteDetailsProps {
    isVisible: boolean;
    onToggleModal: (isVisible: boolean) => void;
    note: NoteObj;
    notes: NoteObj[];
    onDeleteNote: (notes: NoteObj[]) => void;
}

export default function NoteDetails({ isVisible, onToggleModal, note, notes, onDeleteNote }: NoteDetailsProps) {

    const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

    async function handleDeleteNote() {
        try {
            const response = await axios.delete(`http://localhost:8080/api/notes/${note.id}`, {
                headers: {
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTc0NTEyMTM1OCwiZXhwIjoxNzQ1NzI2MTU4fQ.V2JDzuwU9BN43Saoar4bXRgENc98NMGT8MonQOXR9xo'
                }
            });

            const { data } = JSON.parse(JSON.stringify(response));

            const filteredNotes = notes.filter((note) => note.id !== data?.id);

            onDeleteNote([
                ...filteredNotes
            ]);

            onToggleModal(false);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal isVisible={isVisible} onToggleModal={onToggleModal} onStopEditing={setIsReadOnly} >
            <form action='#' className='flex flex-col gap-6 w-full h-auto'>
                <fieldset className='flex flex-col text-white gap-y-5 mt-5'>
                    <input className='font-bold text-2xl focus:outline-0' type='text' name='title' value={note ? note.title : 'Unknown title'} readOnly={isReadOnly ? true : false} />
                    <textarea className='w-full h-90 focus:outline-0 resize-none' name='description' value={note ? note.description : 'Unknown description'} readOnly={isReadOnly ? true : false} />
                </fieldset>
                <div className='flex flex-row justify-between'>
                    <button onClick={handleDeleteNote} type='button' className='inline-block justify-center bg-[#686767] w-12 h-12 rounded-lg text-white hover:cursor-pointer hover:bg-[#b4261c]'><FaTrash className='mx-auto text-xl align-middle' /></button>
                    <div className='flex flex-row gap-x-3' >
                        {
                            isReadOnly ? (
                                <button type='button' className='invisible inline-block justify-center bg-[#21A945] w-12 h-12 rounded-lg text-white hover:cursor-pointer hover:bg-[#1d8f3b]'><FaFloppyDisk className='mx-auto text-xl align-middle' /></button>
                            ) :
                                (
                                    <button type='button' className='visible inline-block justify-center bg-[#21A945] w-12 h-12 rounded-lg text-white hover:cursor-pointer hover:bg-[#1d8f3b]'><FaFloppyDisk className='mx-auto text-xl align-middle' /></button>
                                )
                        }
                        <button onClick={() => setIsReadOnly(false)} type='button' className='inline-block justify-center bg-[#2b62c7] w-12 h-12 rounded-lg text-white hover:cursor-pointer hover:bg-[#2655ad]'><FaPenToSquare className='mx-auto text-xl align-middle' /></button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
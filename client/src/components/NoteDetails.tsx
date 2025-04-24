import { FormEvent, useState } from 'react';
import axios from 'axios';
import { FaPenToSquare } from 'react-icons/fa6';
import { FaFloppyDisk } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa6';

import { ToastMsgProps } from '../helpers/show-toast-msg';
import { NoteObj } from '../pages/Home';
import Modal from './Modal'

interface NoteDetailsProps {
    isVisible: boolean;
    note: NoteObj;
    notes: NoteObj[];
    onToggleModal: (isVisible: boolean) => void;
    onChangeNote: (notes: NoteObj[]) => void;
    onShowMsg: (options: ToastMsgProps) => void;
    onToggleBtn: (isVisible: boolean) => void;
}

export default function NoteDetails({ isVisible, note, notes, onChangeNote, onToggleModal, onShowMsg, onToggleBtn }: NoteDetailsProps) {

    const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    async function handleDeleteNote() {
        try {
            const response = await axios.delete(`http://localhost:8080/api/notes/${note.id}`, {
                withCredentials: true
            });

            const { data, status } = JSON.parse(JSON.stringify(response));

            if (status >= 400) {
                console.log(data, status);
                return;
            }

            const filteredNotes = notes.filter((note) => note.id !== data?.id);

            onChangeNote([
                ...filteredNotes
            ]);

            onToggleModal(false);
            onToggleBtn(true);
            onShowMsg({ msg: 'Note successfully deleted', type: 'success', position: 'bottom-left', autoClose: 4000 });

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { errors } = error.response.data;

                errors.forEach((error: { msg: string }) => {
                    onShowMsg({ msg: error.msg, type: 'error', position: 'bottom-left', autoClose: 8000 });
                });

            } else {
                console.log(error);
            }
        }
    }

    async function handleUpdateNote(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/api/notes/${note.id}`, {
                title,
                description
            }, {
                withCredentials: true
            });

            const { data } = JSON.parse(JSON.stringify(response));

            const updatedNotes = notes.map(noteobj => {
                if (noteobj.id === note.id) {
                    return {
                        ...noteobj,
                        title: data.title,
                        description: data.description
                    };
                } else {
                    return noteobj;
                }
            });

            onChangeNote(updatedNotes);
            setIsReadOnly(true);
            onToggleModal(false);
            onToggleBtn(true);
            onShowMsg({ msg: 'Note successfully updated', type: 'success', position: 'bottom-left', autoClose: 4000 });

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { errors } = error.response.data;

                errors.forEach((error: { msg: string }) => {
                    onShowMsg({ msg: error.msg, type: 'error', position: 'bottom-left', autoClose: 8000 });
                });

            } else {
                console.log(error);
            }
        }
    }

    return (
        <Modal onToggleBtn={onToggleBtn} isVisible={isVisible} onToggleModal={onToggleModal} onStopEditing={setIsReadOnly} >
            <form action="#" onSubmit={handleUpdateNote} className="flex flex-col gap-6 w-full h-auto">
                <fieldset className="flex flex-col text-[#e2e2e2] gap-y-5 mt-5">
                    <input onChange={(e) => setTitle(e.currentTarget.value)} className="font-bold text-2xl focus:outline-0 p-5 rounded-sm" type="text" name="title" defaultValue={note ? note.title : "Unknown title"} readOnly={isReadOnly} required />
                    <textarea onChange={(e) => setDescription(e.currentTarget.value)} className="w-full h-90 focus:outline-0 p-5 resize-none rounded-sm" name="description" defaultValue={note ? note.description : "Unknown description"} readOnly={isReadOnly} required />
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
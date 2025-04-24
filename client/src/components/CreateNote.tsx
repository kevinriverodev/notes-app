import { useState, FormEvent } from 'react';
import axios from 'axios';

import { ToastMsgProps } from '../helpers/show-toast-msg';
import Modal from './Modal';
import { NoteObj } from '../pages/Home';

interface CreateNoteProps {
    isVisible: boolean;
    notes: NoteObj[];
    onToggleModal: (isVisible: boolean) => void;
    onCreateNote: (notes: NoteObj[]) => void;
    onShowMsg: (option: ToastMsgProps) => void;
    onToggleBtn: (isVisible: boolean) => void;
}

export default function CreateNote({ isVisible, notes, onToggleModal, onCreateNote, onShowMsg, onToggleBtn }: CreateNoteProps) {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/notes/', {
                title,
                description
            }, {
                withCredentials: true
            });

            const { data, status } = JSON.parse(JSON.stringify(response));

            if (status >= 400) {
                console.log(data, status);
                return;
            }

            onCreateNote(
                [
                    {
                        id: data.id,
                        title: data.title,
                        description: data.description
                    },
                    ...notes
                ]
            );

            onToggleModal(false);
            onToggleBtn(true);
            onShowMsg({ msg: 'Note successfully created', type: 'success', position: 'bottom-left', autoClose: 4000 });
            setTitle('');
            setDescription('');

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
        <Modal onToggleBtn={onToggleBtn} isVisible={isVisible} onToggleModal={onToggleModal}>
            <form action="#" onSubmit={handleSubmit} className="flex flex-col gap-6 w-full h-auto">
                <fieldset className="flex flex-col text-[#e2e2e2] gap-y-5 mt-5">
                    <input onChange={(e) => setTitle(e.currentTarget.value)} className="font-bold text-2xl p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="text" name="title" id="title" value={title} placeholder="Enter a title" required />
                    <textarea onChange={(e) => setDescription(e.currentTarget.value)} className="w-full h-90 focus:outline-0 p-5 resize-none bg-[#1E202D] rounded-sm" name="description" id="description" value={description} placeholder="Enter a description" required />
                </fieldset>
                <button type="submit" className="w-15 h-12 ml-auto text-white font-semibold rounded-lg bg-[#21A945] hover:cursor-pointer hover:bg-[#1d8f3b]">
                    Save
                </button>
            </form>
        </Modal>
    )
}
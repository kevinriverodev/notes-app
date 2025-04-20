import { useState, FormEvent } from 'react';
import axios from 'axios';

import Modal from './Modal';
import { NoteObj } from '../Home';

interface CreateNoteProps {
    isVisible: boolean;
    onToggleModal: (isVisible: boolean) => void;
    onCreateNote: (notes: NoteObj[]) => void;
    notes: NoteObj[];
}

export default function CreateNote({ isVisible, onToggleModal, onCreateNote, notes }: CreateNoteProps) {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/notes/', {
                title,
                description
            }, {
                headers: {
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTc0NTEyMTM1OCwiZXhwIjoxNzQ1NzI2MTU4fQ.V2JDzuwU9BN43Saoar4bXRgENc98NMGT8MonQOXR9xo'
                }
            });

            const { data } = JSON.parse(JSON.stringify(response));

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
            setTitle('');
            setDescription('');

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Modal isVisible={isVisible} onToggleModal={onToggleModal}>
            <form action='#' onSubmit={handleSubmit} className='flex flex-col gap-6 w-full h-auto'>
                <fieldset className='flex flex-col text-white gap-y-5 mt-5'>
                    <input onChange={(e) => setTitle(e.currentTarget.value)} className='font-bold text-2xl focus:outline-0' type='text' name='title' id='title' value={title} placeholder='Enter a title' />
                    <textarea onChange={(e) => setDescription(e.currentTarget.value)} className='w-full h-90 focus:outline-0 resize-none' name='description' id='description' value={description} placeholder='Enter a description' />
                </fieldset>
                <div className='flex flex-row gap-x-3 justify-end'>
                    <button type='submit' className='inline-flex justify-center align-middle text-center gap-x-2 bottom-10 text-lg right-10 w-15 h-12 opacity-95 text-white font-semibold rounded-lg bg-[#21A945] hover:cursor-pointer hover:bg-[#1d8f3b]'>
                        <span className='self-center'>Save</span>
                    </button>
                </div>
            </form>
        </Modal>
    )
}
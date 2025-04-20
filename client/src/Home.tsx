import { useEffect, useState, KeyboardEvent } from 'react';
import axios from 'axios';
import { FaFileCirclePlus } from 'react-icons/fa6';

import Main from './components/Main'
import MainHeader from './components/MainHeader'
import Sidebar from './components/Sidebar'
import NotesList from './components/NotesList';
import SearchInput from './components/SearchInput';
import CreateNote from './components/CreateNote';
import NoteDetails from './components/NoteDetails';
import './Home.css'

export interface NoteObj {
    id: number;
    title: string;
    description: string;
}

export default function Home() {

    const [notes, setNotes] = useState<Array<NoteObj>>([]);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false); // state para mostrar o ocultar modal de crear nota
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState<boolean>(false); // state para mostrar o ocultar modal de detalles de nota
    const [noteSelected, setNoteSelected] = useState<NoteObj>({ id: 0, title: '', description: '' }); // state para guardar nota seleccionada para ver detalles y editar

    //Obtener notas del usuario
    useEffect(() => {
        async function fetchNotes() {
            try {
                const response = await axios.get('http://localhost:8080/api/notes', {
                    headers: { 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTc0NDk1MzExNCwiZXhwIjoxNzQ3NTQ1MTE0fQ.Ov1ZGf4rV-IQowuzBlLs94DQrJiggan82o8jAeBy7TU' }
                });

                const { data } = JSON.parse(JSON.stringify(response));

                setNotes([
                    ...data.rows.map((note: NoteObj) => ({ id: note.id, title: note.title, description: note.description }))
                ]);

            } catch (error) {
                console.log(error);
            }
        }
        fetchNotes();
    }, []);

    //Buscar notas por titulo o descripcion
    async function searchNotes(event: KeyboardEvent<HTMLInputElement>) {
        const query = event.currentTarget.value;

        try {
            const response = await axios.get(`http://localhost:8080/api/notes?query=${query}`, {
                headers: {
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTc0NTEyMTM1OCwiZXhwIjoxNzQ1NzI2MTU4fQ.V2JDzuwU9BN43Saoar4bXRgENc98NMGT8MonQOXR9xo'
                }
            });

            const { data } = JSON.parse(JSON.stringify(response));

            setNotes([
                ...data.rows.map((note: NoteObj) => ({ id: note.id, title: note.title, description: note.description }))
            ]);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='h-dvh flex flex-col justify-center'>

            <CreateNote notes={notes} onCreateNote={setNotes} onToggleModal={setIsCreateModalVisible} isVisible={isCreateModalVisible} />
            <NoteDetails notes={notes} onDeleteNote={setNotes} note={noteSelected} onToggleModal={setIsDetailsModalVisible} isVisible={isDetailsModalVisible} />

            <MainHeader />

            <div className='flex w-full flex-row h-9/10'>

                <Sidebar>
                    <SearchInput onSearch={searchNotes} />
                    <NotesList onSelectNote={setNoteSelected} onToggleModal={setIsDetailsModalVisible} notes={notes} />
                </Sidebar>

                <Main onSelectNote={setNoteSelected} onToggleModal={setIsDetailsModalVisible} notes={notes} />

            </div>

            <button onClick={() => setIsCreateModalVisible(true)} className='inline-flex justify-center align-middle text-center gap-x-3.5 absolute bottom-10 text-lg right-10 w-40 h-15 opacity-95 shadow-lg shadow-[#1ea53f]/40 text-white font-semibold rounded-lg bg-[#21A945] hover:cursor-pointer hover:bg-[#1d8f3b]'>
                <span className='self-center'>Create note</span>
                <FaFileCirclePlus className='self-center' />
            </button>

        </div>
    )
}
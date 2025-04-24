import { useEffect, useState, KeyboardEvent } from 'react';
import axios from 'axios';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { handleErrors } from '../helpers/handle-errors';
import { showToastMsg } from '../helpers/show-toast-msg';
import Main from '../components/Main'
import MainHeader from '../components/MainHeader'
import Sidebar from '../components/Sidebar'
import NotesList from '../components/NotesList';
import SearchInput from '../components/SearchInput';
import CreateNote from '../components/CreateNote';
import NoteDetails from '../components/NoteDetails';
import Note from '../components/Note';
import { useAuth } from '../context/AuthContext';

import './Home.css';

export interface NoteObj {
    id: number;
    title: string;
    description: string;
}

export default function Home() {

    const [notes, setNotes] = useState<Array<NoteObj>>([]);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState<boolean>(false); // state para mostrar u ocultar modal de crear nota
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState<boolean>(false); // state para mostrar u ocultar modal de detalles de nota
    const [noteSelected, setNoteSelected] = useState<NoteObj>({ id: 0, title: '', description: '' }); // state para guardar nota seleccionada para ver detalles y editar
    const [isCreateBtnVisible, setIsCreateBtnVisible] = useState<boolean>(true); // state para mostrar u ocultar btn de crear nota

    const { isAuthenticated } = useAuth();

    //Obtener notas del usuario
    useEffect(() => {
        async function fetchNotes() {

            if (!isAuthenticated) return;

            try {
                const response = await axios.get('http://localhost:8080/api/notes', {
                    withCredentials: true
                });

                const { data, status } = response;

                if (status >= 400) {
                    console.log(data, status);
                    return;
                }

                setNotes([
                    ...data.rows.map((note: NoteObj) => ({ id: note.id, title: note.title, description: note.description }))
                ]);

            } catch (error) {
                handleErrors(error);
            }
        }
        fetchNotes();
    }, [isAuthenticated]);

    //Buscar notas por titulo o descripcion
    async function searchNotes(event: KeyboardEvent<HTMLInputElement>) {
        const query = event.currentTarget.value;

        try {
            const response = await axios.get(`http://localhost:8080/api/notes?query=${query}`, {
                withCredentials: true
            });

            const { data } = response;

            setNotes([
                ...data.rows.map((note: NoteObj) => ({ id: note.id, title: note.title, description: note.description }))
            ]);

        } catch (error) {
            handleErrors(error);
        }
    }

    return (
        <div className="h-dvh flex flex-col justify-center">
            <CreateNote onToggleBtn={setIsCreateBtnVisible} onShowMsg={showToastMsg} notes={notes} onCreateNote={setNotes} onToggleModal={setIsCreateModalVisible} isVisible={isCreateModalVisible} />
            <NoteDetails onToggleBtn={setIsCreateBtnVisible} onShowMsg={showToastMsg} notes={notes} onChangeNote={setNotes} note={noteSelected} onToggleModal={setIsDetailsModalVisible} isVisible={isDetailsModalVisible} />
            <MainHeader />
            <div className="flex flex-row w-full h-9/10">
                <Sidebar>
                    <SearchInput onSearch={searchNotes} />
                    <NotesList onToggleBtn={setIsCreateBtnVisible} onSelectNote={setNoteSelected} onToggleModal={setIsDetailsModalVisible} notes={notes} />
                </Sidebar>
                <Main>
                    <div className="flex flex-wrap w-full h-auto justify-center gap-5">
                        {notes.length > 0 ?
                            notes.map((note: NoteObj) => (
                                <Note onToggleBtn={setIsCreateBtnVisible} onSelectNote={setNoteSelected} onTogglemodal={setIsDetailsModalVisible} key={note.id} noteId={note.id} title={note.title} description={note.description} />
                            ))
                        :   (
                                <p className="text-[#e2e2e2] mt-10 font-bold text-2xl">No notes found</p>
                            )
                        }
                    </div>
                </Main>
            </div>
            {isCreateBtnVisible &&
                (
                    <button onClick={() => { setIsCreateModalVisible(true); setIsCreateBtnVisible(false); }} className="inline-block text-center absolute bottom-10 text-lg right-10 w-40 h-15 opacity-95 shadow-lg shadow-[#1ea53f]/40 text-white font-semibold rounded-lg bg-[#21A945] hover:cursor-pointer hover:bg-[#1d8f3b]">
                        <span>Write note <FaFileCirclePlus className="inline-block ml-1.5" /></span>
                    </button>
                )
            }
        </div>
    )
}
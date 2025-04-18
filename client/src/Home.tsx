import { useEffect, useState, KeyboardEvent } from 'react';
import axios from 'axios';

import Main from './components/Main'
import MainHeader from './components/MainHeader'
import Sidebar from './components/Sidebar'
import NotesList from './components/NotesList';
import SearchInput from './components/SearchInput';
import './Home.css'

export interface NoteObj {
    id: number,
    title: string,
    description: string
}

export default function Home() {
    const [notes, setNotes] = useState<Array<NoteObj>>([]);

    //Obtener notas del usuario
    useEffect(() => {
        async function fetchNotes() {
            const response = await axios.get('http://localhost:8080/api/notes', {
                headers: { 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTc0NDk1MzExNCwiZXhwIjoxNzQ3NTQ1MTE0fQ.Ov1ZGf4rV-IQowuzBlLs94DQrJiggan82o8jAeBy7TU' }
            });

            const { data } = JSON.parse(JSON.stringify(response));

            setNotes(
                data.rows.map((note: NoteObj) => ({ id: note.id, title: note.title, description: note.description }))
            );
        }
        fetchNotes();
    }, []);

    //Buscar notas por titulo o descripcion
    async function findNotes(event: KeyboardEvent<HTMLInputElement>) {
        const query = (event.target as HTMLInputElement).value;

        const response = await axios.get(`http://localhost:8080/api/notes?query=${query}`, {
            headers: { 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTc0NDk1MzExNCwiZXhwIjoxNzQ3NTQ1MTE0fQ.Ov1ZGf4rV-IQowuzBlLs94DQrJiggan82o8jAeBy7TU' }
        });

        const { data } = JSON.parse(JSON.stringify(response));

        setNotes(
            data.rows.map((note: NoteObj) => ({ id: note.id, title: note.title, description: note.description }))
        );
    }

    return (
        <div className='h-dvh'>
            <MainHeader />
            <div className='flex flex-row h-9/10'>
                <Sidebar>
                    <SearchInput onFind={findNotes} />
                    <NotesList notes={notes} />
                </Sidebar>
                <Main notes={notes} />
            </div>
        </div>
    )
}
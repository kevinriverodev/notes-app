import NotesListItem from "./NotesListItem";

export default function NoteList() {
    return (
        <>
            <h3 className='font-bold'>Notes list</h3>
            <div className='w-full my-2.5 h-[2px] bg-[#282A3A]'></div>
            <ul className='w-full text-left'>
                <NotesListItem title="Titulo de prueba numero 1"/>
                <NotesListItem title="Titulo de prueba numero 2"/>
                <NotesListItem title="Titulo de prueba numero 3"/>
                <NotesListItem title="Titulo de prueba numero 4"/>
                <NotesListItem title="Titulo de prueba numero 5"/>
                <NotesListItem title="Titulo de prueba numero 6"/>
                <NotesListItem title="Titulo de prueba numero 7"/>
                <NotesListItem title="Titulo de prueba numero 8"/>
            </ul>
        </>
    )
}
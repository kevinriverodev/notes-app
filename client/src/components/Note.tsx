interface NoteProps {
    title: string;
    description: string;
}

export default function Note({ title, description }: NoteProps) {
    return (
        <div className='w-70 min-h-80 max-h-80 p-6 rounded-4xl flex flex-col text-white bg-[#282A3A] hover:cursor-pointer'>
            <h4 className='w-full m-0 font-bold flex-1/7 overflow-hidden'>{ title }</h4>
            <p className='w-full m-0 flex-6/7 overflow-hidden'>{ description }</p>
        </div>
    )
}
interface NoteListItemProps {
    title: string;
}

export default function NoteListItem({ title }: NoteListItemProps) {
    return (
        <li className='w-full p-2 hover:bg-[#282A3A]'><a className='w-full inline-block' href="">{title}</a></li>
    )
}
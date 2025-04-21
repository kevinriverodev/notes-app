import { Link } from 'react-router-dom';
import HeaderMenu from './HeaderMenu';

export default function MainHeader() {
    return (
        <header className='flex flex-row justify-between w-full h-1/10 p-10 bg-[#161821] text-[#e2e2e2]'>
            <h1 className='text-4xl font-extrabold self-center'><Link to='/'>Notes App</Link></h1>
            <HeaderMenu />
        </header>
    )
};
import HeaderMenu from './HeaderMenu';

export default function MainHeader() {
    return (
        <header className='flex flex-row justify-between w-full h-1/10 p-10 bg-[#161821] text-white'>
            <h1 className='text-4xl font-extrabold self-center'>Notes App</h1>
            <HeaderMenu />
        </header>
    )
};
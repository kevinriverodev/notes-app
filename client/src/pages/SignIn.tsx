import { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function SignIn() {

    const { authSignIn, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    //Hook para verificar si ya el usuario esta autenticado antes de entrar al login
    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);

    //Funcion para manejar el submit del form y validar el login
    async function handleSignIn(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const { username, password } = event.currentTarget;
        await authSignIn(username.value, password.value);
    }

    return (
        <div className="h-dvh w-full flex flex-row justify-center text-center text-[#e2e2e2] bg-[#1E202D]">
            <div className="flex flex-col justify-center self-center mt-[-50px] gap-y-5 h-auto w-1/4 min-w-80">
                <h1 className="font-extrabold text-4xl">Sign in</h1>
                <form action="#" onSubmit={handleSignIn} className="flex flex-col p-7 gap-5 rounded-md bg-[#1A1C28]">
                    <fieldset className="flex flex-col text-[#e2e2e2] gap-y-3">
                        <label className="self-start" htmlFor="</div>username">Username/Email</label>
                        <input className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="text" name="username" id="username" placeholder="Enter username/email" required />
                        <label className="self-start" htmlFor="password">Password</label>
                        <input className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="password" name="password" id="password" placeholder="Enter password" required />
                    </fieldset>
                    <button type="submit" className="mx-auto justify-center w-20 h-12 text-white font-semibold rounded-lg bg-[#21A945] hover:cursor-pointer hover:bg-[#1d8f3b]">
                        <span className="align-middle">Sign in</span>
                    </button>
                    <Link className="ml-auto underline" to="/signup">Create an account</Link>
                </form>
            </div>
        </div>
    )
}
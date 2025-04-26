import { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToastMsg } from '../helpers/show-toast-msg';

export default function SignUp() {
    const { authSignUp, isAuthenticated } = useAuth();
    const navigate = useNavigate();
        
    //Hook para verificar si ya el usuario esta autenticado antes de entrar al login
    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);

    // Funcion para manejar el submit del form y registrar usuario
    async function handleSignUp(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const { username, firstName, lastName, email, password, confirmPassword } = event.currentTarget;

        if (password.value.trim() !== confirmPassword.value.trim() || !password.value.trim() || !confirmPassword.value.trim()) {
            showToastMsg({ msg:'Passwords dont\'t match', type: 'error', position: 'bottom-left', autoClose: 8000 });
            return;
        }

        await authSignUp( username.value, firstName.value, lastName.value, email.value, password.value );
    }

    return (
        <div className="h-dvh w-full flex flex-row justify-center text-center text-[#e2e2e2] bg-[#1E202D]">
            <div className="flex flex-col justify-center self-center gap-y-5 mt-[-50px] h-auto w-1/4 min-w-80">
                <h1 className="font-extrabold text-4xl">Sign up</h1>
                <form action="#" onSubmit={handleSignUp} className="flex flex-col p-7 gap-5 rounded-md bg-[#1A1C28]">
                    <fieldset className="flex flex-col text-[#e2e2e2] gap-y-3">
                        <label className="self-start" htmlFor="username">Username</label>
                        <input className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="text" name="username" id="username" placeholder="Username/email" required />
                        <label className="self-start" htmlFor="firstName">First name</label>
                        <input className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="text" name="firstName" id="firstName" placeholder="First name" required />
                        <label className="self-start" htmlFor="username">Last name</label>
                        <input className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="text" name="lastName" id="lastName" placeholder="Last name" required />
                        <label className="self-start" htmlFor="email">Email</label>
                        <input className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="email" name="email" id="email" placeholder="Email" required />
                        <label className="self-start" htmlFor="password">Password</label>
                        <input className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="password" name="password" id="password" placeholder="Password" required />
                        <label className="self-start" htmlFor="ConfirmPassword">Confirm password</label>
                        <input className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" required />
                    </fieldset>
                    <button type="submit" className="mx-auto justify-center w-20 h-12 text-white font-semibold rounded-lg bg-[#21A945] hover:cursor-pointer hover:bg-[#1d8f3b]">
                        <span className="align-middle">Sign up</span>
                    </button>
                    <Link className="ml-auto underline" to="/signin">Already have an account? Sign in</Link>
                </form>
            </div>
        </div>
    )
}
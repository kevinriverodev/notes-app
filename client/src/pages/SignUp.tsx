import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {

    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const { authSignUp, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);

    async function handleSignUp(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords don\'t match')
            return;
        }

        const response = await authSignUp({ username, firstName, lastName, email, password });

        console.log(response);
    }

    return (
        <div className="h-dvh w-full flex flex-row justify-center text-center text-[#e2e2e2] bg-[#1E202D]">
            <div className="flex flex-col justify-center self-center gap-y-5 mt-[-50px] h-auto w-1/4 min-w-80">
                <h1 className="font-extrabold text-4xl">Sign up</h1>
                <form action="#" onSubmit={handleSignUp} className="flex flex-col p-7 gap-5 rounded-md bg-[#1A1C28]">
                    <fieldset className="flex flex-col text-[#e2e2e2] gap-y-3">
                        <label className="self-start" htmlFor="username">Username/Email</label>
                        <input onChange={(e) => setUsername(e.currentTarget.value)} className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="text" name="username" id="username" placeholder="Username/email" required />
                        <label className="self-start" htmlFor="firstName">First name</label>
                        <input onChange={(e) => setFirstName(e.currentTarget.value)} className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="text" name="firstName" id="firstName" placeholder="First name" required />
                        <label className="self-start" htmlFor="username">Last name</label>
                        <input onChange={(e) => setLastName(e.currentTarget.value)} className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="text" name="lastName" id="lastName" placeholder="Last name" required />
                        <label className="self-start" htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.currentTarget.value)} className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="email" name="email" id="email" placeholder="Email" required />
                        <label className="self-start" htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.currentTarget.value)} className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="password" name="password" id="password" placeholder="Password" required />
                        <label className="self-start" htmlFor="ConfirmPassword">Confirm password</label>
                        <input onChange={(e) => setConfirmPassword(e.currentTarget.value)} className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" required />
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
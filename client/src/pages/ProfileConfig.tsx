import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import MainHeader from '../components/MainHeader';
import { updateUser } from '../api/user';

export default function ProfileConfig() {
    const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);
    const { currentUser, setCurrentUser } = useAuth();

    // Function para manejar el submit del form y actualizar datos del usuario
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const { username, firstName, lastName, email, password, confirmPassword } = event.currentTarget;

        const user = await updateUser(username.value, firstName.value, lastName.value, email.value, password.value, confirmPassword.value);

        if (!user) return;

        setIsBtnDisabled(true);
        setCurrentUser(user);
    }

    return (
        <div className="h-dvh flex flex-col">
            <MainHeader />
            <div className="flex flex-row w-full h-9/10 p-5 justify-center bg-[#1E202D] overflow-auto">
                <div className="flex flex-col justify-center self-center gap-y-5 mt-[-50px] h-auto w-2/4 min-w-150">
                    <h1 className="font-extrabold text-4xl self-center text-[#e2e2e2]">Account settings</h1>
                    <form action="#" onSubmit={handleSubmit} className="inline-flex p-7 gap-x-10 rounded-md bg-[#1A1C28]">
                        <div className="flex flex-col w-1/2 text-[#e2e2e2] gap-y-3">
                            <h2 className="font-bold text-2xl">Personal info</h2>
                            <div className="w-full h-[2px] bg-[#282A3A]"></div>
                            <fieldset className="flex flex-col gap-y-3">
                                <label onChange={() => setIsBtnDisabled(false)} className="self-start" htmlFor="username">Username/Email</label>
                                <input onChange={() => setIsBtnDisabled(false)} className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="text" name="username" id="username" placeholder="Username/email" defaultValue={currentUser?.username} required />
                                <label onChange={() => setIsBtnDisabled(false)} className="self-start" htmlFor="firstName">First name</label>
                                <input onChange={() => setIsBtnDisabled(false)} className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="text" name="firstName" id="firstName" placeholder="First name" defaultValue={currentUser?.firstName} required />
                                <label onChange={() => setIsBtnDisabled(false)} className="self-start" htmlFor="username">Last name</label>
                                <input onChange={() => setIsBtnDisabled(false)} className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="text" name="lastName" id="lastName" placeholder="Last name" defaultValue={currentUser?.lastName} required />
                                <label onChange={() => setIsBtnDisabled(false)} className="self-start" htmlFor="email">Email</label>
                                <input onChange={() => setIsBtnDisabled(false)} className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="email" name="email" id="email" placeholder="Email" defaultValue={currentUser?.email} required />
                            </fieldset>
                        </div>
                        <div className="flex flex-col w-1/2 text-[#e2e2e2] gap-y-3">
                            <h2 className="font-bold text-2xl">Security</h2>
                            <div className="w-full h-[2px] bg-[#282A3A]"></div>
                            <fieldset className="flex flex-col gap-y-3">
                                <label className="self-start" htmlFor="password">New password</label>
                                <input onChange={() => setIsBtnDisabled(false)} className="w-full h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="password" name="password" id="password" placeholder="Password" />
                                <label className="self-start" htmlFor="ConfirmPassword">Confirm password</label>
                                <input onChange={() => setIsBtnDisabled(false)} className="w-full mt-auto h-13 p-5 focus:outline-0 bg-[#1E202D] rounded-sm" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" />
                            </fieldset>
                            {isBtnDisabled ?
                                (
                                    <button type="submit" className="self-end mt-auto justify-center w-20 h-12 text-white font-semibold rounded-lg bg-[#21A945] opacity-40" disabled>
                                        <span className="align-middle">Save</span>
                                    </button>
                                ) :
                                (
                                    <button type="submit" className="self-end mt-auto justify-center w-20 h-12 text-white font-semibold rounded-lg bg-[#21A945] hover:cursor-pointer hover:bg-[#1d8f3b]">
                                        <span className="align-middle">Save</span>
                                    </button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
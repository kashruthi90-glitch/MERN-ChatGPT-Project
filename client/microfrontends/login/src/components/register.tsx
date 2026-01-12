import { Link } from "react-router-dom";
import type { FormEvent } from 'react';
import { useRef } from 'react';
import { useRegister } from '../hooks/useApi';

export default function Register() {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { registerUser } = useRegister();

    function handleSubmit(evt: FormEvent) {
        evt.preventDefault();
        if (nameRef.current && emailRef.current && passwordRef.current) {
            registerUser({
                username: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="w-1/2 h-1/2 border rounded-sx border-black dark:border-white flex justify-center items-center flex-col">
                    <h2 className="text-xl font-bold"> Sign up </h2>
                    <div className="my-3">
                        <label htmlFor="username"> Name </label>
                        <input type="text" id="username" ref={nameRef}
                        className="ml-18 border rounded-xs border-black dark:border-white outline-none focus:ring-1 focus:border-black dark:focus:border-white"
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="email"> Email </label>
                        <input type="email" id="email" ref={emailRef} 
                        className="ml-18 border rounded-xs border-black dark:border-white outline-none focus:ring-1 focus:border-black dark:focus:border-white"/>
                    </div>
                    <div className="my-3">
                        <label htmlFor="password"> Password </label>
                        <input type="password" id="password" ref={passwordRef} 
                        className="ml-10 border rounded-xs border-black dark:border-white outline-none focus:ring-1 focus:border-black dark:focus:border-white"/>
                    </div>
                    <div className="my-3"> Already have an account? <Link to="/auth/login" className="outline-none focus:ring-1 focus:border-black dark:focus:border-white"> click here </Link> </div>
                    <button type="submit" className="my-3 outline-none focus:ring-1 focus:border-black dark:focus:border-white"> Create Account </button>
                </div>
            </div>
        </form>
    );
}
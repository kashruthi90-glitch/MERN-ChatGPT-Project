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
            <h3> user Sign up </h3>
            <div>
                <label htmlFor="username"> Name </label>
                <input type="text" id="username" ref={nameRef} />
            </div>
            <div>
                <label htmlFor="email"> Email </label>
                <input type="email" id="email" ref={emailRef} />
            </div>
            <div>
                <label htmlFor="password"> Password </label>
                <input type="password" id="password" ref={passwordRef} />
            </div>
            <div> Already have an account? <Link to="/auth/login"> click here </Link> </div>
            <button type="submit"> Create Account </button>
        </form>
    );
}
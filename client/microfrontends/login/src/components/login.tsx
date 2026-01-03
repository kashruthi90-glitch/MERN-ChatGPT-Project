import type { FormEvent } from 'react';
import { useRef } from 'react';
import { useLogin } from '../hooks/useApi';
import { Link } from 'react-router-dom';

export default function LoginUser() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { performLogin } = useLogin();

    function handleSubmit(evt: FormEvent) {
        evt.preventDefault();
        if (usernameRef?.current && passwordRef.current) {
            performLogin({username: usernameRef.current.value, password: passwordRef.current.value})
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="auth-container">
                <h2> User Login </h2>
                <div>
                    <label htmlFor="username"> Username </label>
                    <input type="text" id="username" ref={usernameRef}/>
                </div>

                <div>
                    <label htmlFor="password"> Password </label>
                    <input type="password" id="password" ref={passwordRef}/>
                </div>

                <div>
                    Create an account? <Link to="/auth/register"> Click here </Link>
                </div>

                <button type="submit"> Login </button>
            </div>

        </form>
    )
}
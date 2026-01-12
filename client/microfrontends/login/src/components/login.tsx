import type { FormEvent } from 'react';
import { useRef } from 'react';
import { useLogin } from '../hooks/useApi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function LoginUser() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const nav = useNavigate();

    const { performLogin } = useLogin({nav});

    function handleSubmit(evt: FormEvent) {
        evt.preventDefault();
        if (usernameRef?.current && passwordRef.current) {
            performLogin({username: usernameRef.current.value, password: passwordRef.current.value})
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="w-80 h-80 border rounded-xs border-black dark:border-white flex justify-center items-center flex-col">
                    <h2> User Login my </h2>
                    <div className="my-5">
                        <label htmlFor="username"> Username </label>
                        {/* The blue border onfocus is applied by the browser and not by css. So to override the browser we should use outline-none. 
                            But, if we remove the border color we should add different border color or make changes to border width to indicate that focus is on that element.
                            use taikwind ring to add thickness to border and to add subtel shadow
                        */}
                        <input type="text" id="username" ref={usernameRef} 
                        className="border rounded-xs border-black dark:border-white mx-5 outline-none
                        focus:ring-1 focus:ring-black dark:focus:ring-white"/>
                    </div>

                    <div className="my-5">
                        <label htmlFor="password"> Password </label>
                        <input type="password" id="password" ref={passwordRef}
                        className="border rounded-xs border-black dark:border-white mx-5 outline-none
                        focus:ring-1 focus:ring-black dark:focus:ring-white"/>
                    </div>

                    <div className="my-5">
                        Create an account? <Link to="/auth/register" className="outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"> Click here </Link>
                    </div>

                    <button type="submit" className="outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"> Login </button>
                </div>
            </div>
        </form>
    )
}
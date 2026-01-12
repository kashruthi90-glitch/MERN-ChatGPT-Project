import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BACKEND_URL = '/api/v1/login'

export function useLogin({nav}: {nav: any}) {
    const { mutate, isPending, isError } = useMutation({
        mutationFn: async ({username, password}: {username: string, password: string}) => {
            const response = await axios.post(BACKEND_URL, {
                name: username,
                password
            }, {
                withCredentials: true
            });

            return response.data;
        },
        onSuccess: () => {
            console.log('navigate');
            nav("/chats/");
        },
        onError: () => {
            console.log('invalid username or password');
        }
    });

    return {
        performLogin: mutate,
        isPending,
        isError
    }
}

export function useRegister() {
    const { mutate, isPending, isError } = useMutation({
        mutationFn: async ({username, email, password}: {username: string, password: string, email: string}) => {
            const response = await axios.post(BACKEND_URL, {
                username,
                password,
                email
            });

            return response.data;
        }
    });

    return {
        registerUser: mutate,
        isPending,
        isError
    }
}
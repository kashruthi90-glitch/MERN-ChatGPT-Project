import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000/'

export function useLogin() {
    const { mutate, isPending, isError } = useMutation({
        mutationFn: async ({username, password}: {username: string, password: string}) => {
            const response = await axios.post(BACKEND_URL, {
                username,
                password
            });

            return response.data;
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
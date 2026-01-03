import { useQuery, useMutation } from '@tanstack/react-query';
import axios from '../axiosInterceptor';

export function useGetAllChats() {
    const { data, refetch, isFetching } = useQuery({
        queryKey: ["all-chats"],
        queryFn: async () => {
            const response = await axios.get('/allChats');
            return response.data;
        }
    });

    return {
        data,
        refetch,
        isFetching
    }
}

export function usePerfomChat() {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async ({chatId, prompt, isImage}: {chatId: string, prompt: string, isImage: boolean}) => {
           const response = await axios.post('/chat', {
            chatId,
            prompt,
            isImage
           });

           return response.data;
        }
    });

    return {
        performChat: mutateAsync,
        isPending
    }
}

export function useNewChat() {
    const {mutateAsync, isPending} = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/newChat');
            return response.data;
        }
    });

    return {
        createNewChat: mutateAsync,
        isPending
    }
}

export function useDeleteChat() {
    const {mutateAsync, isPending} = useMutation({
        mutationFn: async (chatId: string) => {
            await axios.delete('/chat', {
                data: {
                    chatId
                }
            });
        }
    });

    return {
        deleteChat: mutateAsync,
        isPending
    }
}
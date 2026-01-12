import type { Chat } from '../common.types';
import type { ChangeEvent } from 'react';
import { useState, useRef, useEffect } from 'react';
import { usePerfomChat } from '../hooks/useApi';
import Loading from './loading';

export default function ContentPanel({selectedChat}: {selectedChat: Chat | null}) {
    const [type, setType] = useState('text');
    const [chatData, setChatData] = useState<Chat | null>(selectedChat);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setChatData(selectedChat);
        setType('text');
    }, [selectedChat]);

    const { performChat, isPending } = usePerfomChat();

    function handleSelectChange(evt: ChangeEvent<HTMLSelectElement>) {
        setType(evt.target.value);
    }

    async function onSubmit() {
        if (selectedChat && inputRef.current) {
            try {
                const response = await performChat({
                    chatId: selectedChat._id,
                    prompt: inputRef.current.value,
                    isImage: type !== 'text'
                });
                setChatData({...selectedChat, message: [...selectedChat.message, response]});
            } catch(err) {
                console.log('error performing chat');
            }
            
        }
    }

    if (!chatData) {
        return <div> Ask me anything </div>;
    }

    return (
        <div className="w-full h-full p-2">
            <div>
                {
                    chatData?.message?.map((msg) => {
                        // const date = new Date(msg.updatedAt).toLocaleString();
                        return (
                            <div>
                                <div>
                                    {msg.prompt} 
                                </div>
                                <div>
                                    {msg.content}
                                    {/* {date} */}
                                </div>
                            </div>
                        );
                    })
                }
                {isPending && <Loading /> }
            </div>
            <div className="flex justify-center absolute inset-x-0 bottom-5">
                <select onChange={handleSelectChange} value={type} className="bg-white dark:bg-gray-500">
                    <option value="text"> Text </option>
                    <option value="image"> Image </option>
                </select>
                <input type="text" id="promptInput" name="promptInput" ref={inputRef} 
                className="h-10 w-1/3" />
                <button onClick={onSubmit}> submit </button>
            </div>
        </div>

    )
}
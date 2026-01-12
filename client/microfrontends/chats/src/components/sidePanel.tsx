import type { Chat } from '../common.types';
import { useNewChat } from '../hooks/useApi';
import { useState, useEffect } from 'react';

export default function SidePanel({chats, onChatSelect, onChatDelete}: {
  chats: Chat[], onChatSelect: (chat: Chat) => void, onChatDelete: (id: string) => void}) {
  const [allChats, setAllChats] = useState(chats);

  const { createNewChat } = useNewChat();

  useEffect(() => {
    setAllChats(chats);
  }, [chats]);

  async function onNewChat() {
    try {
      const response = await createNewChat();
      setAllChats([...allChats, response]);
    } catch(err) {
      console.log('error creating chat');
    }
  }

  return (
  <div className="border-r-1 border-black dark:border-gray-500 h-screen px-4 w-1/4">
    <div className="h-20 my-2 flex justify-start items-start flex-col">
      <h2 className="my-0"> GPT </h2>
      <h5 className="my-0"> Intelegent AI assistent </h5>
    </div>
    <button onClick={onNewChat} 
      className="h-10 w-full bg-gradient-to-r from-indigo-500 to-purple-500"> 
      + New Chat 
    </button>
    <input type="search" id="searchChat" placeholder="Search conversations"
    className="h-10 w-full my-4"
    />
    <div>
      <h3> Recent chats </h3>
      <div>
        {allChats?.map((chat: Chat) => {
          const msg = chat.message[chat.message.length - 1];
          const dateAndTimeToDisplay = new Date(chat.updatedAt).toLocaleString();
          return (
            <div key={chat._id} className="px-2 py-2 bg-gray-800 flex flex-row justify-between items-center">
              <div onClick={() => onChatSelect(chat)}>
                <div> {msg.prompt} </div>
                <div> {dateAndTimeToDisplay} </div>
              </div>
              <div onClick={() => onChatDelete(chat._id)}> 
                {/* using heroicons by tailwind css */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </div>
  );
}
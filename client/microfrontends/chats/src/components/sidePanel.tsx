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
      <div>
    <div>
      <h2> GPT </h2>
      <h5> Intelegent AI assistent </h5>
    </div>
    <div>
      <button onClick={onNewChat}> + New Chat </button>
    </div>
    <div>
      <input type="search" id="searchChat" placeholder="seatch conversations" />
    </div>
    <div>
      <h3> Recent chats </h3>
      <div>
        {chats.map((chat: Chat) => {
          const msg = chat.message[chat.message.length - 1];
          const dateAndTimeToDisplay = new Date(msg.updatedAt).toLocaleString();
          return (
            <div>
              <div onClick={() => onChatSelect(chat)}>
                <div> {msg.prompt} </div>
                <div> {dateAndTimeToDisplay} </div>
              </div>
              <div> <button onClick={() => onChatDelete(chat._id)}> delete </button> </div>
            </div>
          )
        })}
      </div>
    </div>
  </div>
  );
}
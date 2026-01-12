import { useState } from 'react';
import SidePanel from './components/sidePanel';
import ContentPanel from './components/contentPanel';
import { useGetAllChats, useDeleteChat } from './hooks/useApi';
import type { Chat } from './common.types';
import LoadingDialogue from './components/loadingDialogue';

function App() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  
  const { data: chats, refetch, isFetching } = useGetAllChats();
  const { deleteChat, isPending } = useDeleteChat();

  function onChatSelect(chat: Chat) {
    console.log('chat selected = ', chat);
    setSelectedChat(chat);
  }

  async function onChatDelete(id: string) {
    await deleteChat(id);
    refetch();
  }

  return (
    <div className="bg-white dark:bg-black w-screen h-screen text-black dark:text-white flex flex-row">
      {(isFetching || isPending ) && <LoadingDialogue />}
      <SidePanel chats={chats} onChatSelect={onChatSelect} onChatDelete={onChatDelete} />
      <ContentPanel selectedChat={selectedChat} />
    </div>
  );
}

export default App

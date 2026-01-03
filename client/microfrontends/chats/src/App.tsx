import { useState } from 'react';
import SidePanel from './components/sidepanel';
import ContentPanel from './components/contentPanel';
import { useGetAllChats, useDeleteChat } from './hooks/useApi';
import type { Chat } from './common.types';
import LoadingDialogue from './components/loadingDialogue';

function App() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  
  const { data: chats, refetch, isFetching } = useGetAllChats();
  const { deleteChat, isPending } = useDeleteChat();

  function onChatSelect(chat: Chat) {
    setSelectedChat(chat);
  }

  async function onChatDelete(id: string) {
    await deleteChat(id);
    refetch();
  }

  return (
    <>
      {(isFetching || isPending ) && <LoadingDialogue />}
      <SidePanel chats={chats} onChatSelect={onChatSelect} onChatDelete={onChatDelete} />
      <ContentPanel selectedChat={selectedChat} />
    </>
  );
}

export default App

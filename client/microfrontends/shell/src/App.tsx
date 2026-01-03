import {Routes, Route} from 'react-router-dom';
import LoginMfe from './microfrontends/loginmfe';
import ChatsMfe from './microfrontends/chatsmfe';

function App() {
  return (
      <Routes>
        <Route path="/auth/*" element={<LoginMfe/> } />
        <Route path="/chats/*" element={<ChatsMfe/> } />
      </Routes>
  )  
}

export default App

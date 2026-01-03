import { Routes, Route } from 'react-router-dom';
import LoginUser from './components/login';
import Register from './components/register';

function App() {
  console.log('inside login app');
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginUser />} />
    </Routes>
  );
}

export default App

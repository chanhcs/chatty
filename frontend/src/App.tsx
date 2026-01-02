import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster } from 'sonner'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import ChatApp from './pages/ChatPage'

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

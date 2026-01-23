import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import ChatApp from './pages/ChatPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { useThemeStore } from './stores/useThemeStore'
import { useEffect } from 'react'

function App() {
  const isDark = useThemeStore(state => state.isDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<ChatApp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

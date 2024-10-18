import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './styles/style.scss'
import './assets/scripts'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Footer } from './components/Footer'
import { Login } from './pages/Login'
import { Dashboard } from './components/dashboard/Dashboard'
import { Register } from './pages/Register'

export const userContext = createContext()

function App() {

  const [currentUser, setCurrentUser] = useState(null)


  useEffect(() => {
    if (localStorage.getItem('userData') || sessionStorage.getItem('userData')) {
      const localId = localStorage.getItem('userData') || sessionStorage.getItem('userData')
  
      setCurrentUser(JSON.parse(localId))
    }
  }, [])

  return (
    <userContext.Provider value={{currentUser, setCurrentUser}}>
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={ currentUser ? <Navigate to='/dashboard' /> : <Login replace /> } />
          <Route path='/register' element={ currentUser ? <Navigate to='/dashboard' /> : <Register replace /> } />
          <Route path='/dashboard' element={ currentUser ? <Dashboard /> : <Navigate to='/login' replace /> } />
        </Routes>
      <Footer />
    </BrowserRouter>
    </userContext.Provider>
  )
}

export default App

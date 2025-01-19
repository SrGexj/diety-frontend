import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import './styles/style.scss'
import './assets/scripts'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Footer } from './components/Footer'
import { Login } from './pages/Login'
import { Dashboard } from './components/dashboard/Dashboard'
import { Register } from './pages/Register'
import { AllRecipes } from './components/dashboard/recipes_components/allRecipes'
import { NewRecipe } from './components/dashboard/recipes_components/newRecipe'
import { SingleRecipe } from './components/dashboard/recipes_components/singleRecipe'
import { EditRecipe } from './components/dashboard/recipes_components/editRecipe'
import { MessageProvider } from './components/messages/Messages'
import { IndexDashboard } from './components/dashboard/IndexDashboard'
import { Diets } from './components/dashboard/diet_components/Diets'
import { UserSettings } from './components/dashboard/user_components/userSettings'
import { SavedRecipes } from './components/dashboard/recipes_components/savedRecipes'
import { Recipes } from './pages/Recipes'

export const userContext = createContext()

function App() {

  const location =  useLocation()
  const hideHeaderFooter = ['/login', '/register'].includes(location.pathname) || location.pathname.startsWith('/dashboard')

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('userData') || sessionStorage.getItem('userData')) {
      const localId = localStorage.getItem('userData') || sessionStorage.getItem('userData')
  
      setCurrentUser(JSON.parse(localId))
    }
  }, [])

  return (
    <userContext.Provider value={{currentUser, setCurrentUser}}>
      <MessageProvider>
        {!hideHeaderFooter && <Header />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/login' element={ currentUser ? <Navigate to='/dashboard' /> : <Login replace /> } />
              <Route path='/register' element={ currentUser ? <Navigate to='/dashboard' /> : <Register replace /> } />
              <Route path='/recipes' element={<Recipes />} />
              <Route path='/dashboard/*' element={ currentUser ? <Dashboard /> : <Navigate to='/login' replace /> }>
                <Route index element={<IndexDashboard />} />
                <Route path="my-diets" element={<Diets />} />
                <Route path="my-recipes" element={<AllRecipes />} />
                <Route path="add-recipe" element={<NewRecipe />} />
                <Route path="favourites" element={<SavedRecipes />} />
                <Route path="user-options" element={<UserSettings />} />
                <Route path="recipe/edit/:recipeId" element={<EditRecipe />} />
              </Route>
              <Route path="/receta/:url" element={<SingleRecipe />} />
            </Routes>
          {!hideHeaderFooter && <Footer />}
        </MessageProvider>
    </userContext.Provider>
  )
}

export default App

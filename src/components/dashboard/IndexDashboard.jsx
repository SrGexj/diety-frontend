import { useContext } from "react"
import { userContext } from "../../App"

export const IndexDashboard = () => {

    const { currentUser } = useContext(userContext)

    const { VITE_API } = import.meta.env

    const getLastRecipes = async () => {
        try {
            const response = await fetch(`${VITE_API}/recipes`)
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (  
        <div>
            <h1 className="Dashboard-title">Te damos la bienvenida {currentUser.username}</h1>
            <p className="Dashboard-subtitle">Aquí podrás gestionar tus recetas y dietas</p>

        </div>
    )
}
    


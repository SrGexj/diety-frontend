import { useState, useEffect, useContext } from "react"
import { Navigate ,useNavigate } from "react-router-dom"
import { userContext } from "../../../App"
import '../../../styles/components/recipe-components-styles/_allRecipes.scss'
import { MessageContext } from "../../messages/Messages"

export const AllRecipes = () => {

    const {VITE_API} = import.meta.env

   const { currentUser } = useContext(userContext)

   const { showMessage } = useContext(MessageContext)

    const [recipes, setRecipes] = useState([])
    const [recipeId, setRecipeId] = useState()
    const [recipeImage, setRecipeImage] = useState([])

    const navigate = useNavigate()

    const getUserRecipes = async () => {

        let controller = new AbortController()
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            signal: controller.signal
        }
      
        const response = await fetch(`${VITE_API}/recipes/${currentUser._id}`, options)
        const data = await response.json()
        try {
            if (data.success === true) {
               const userRecipes = data.user.recipes
               setRecipes(userRecipes)
            } else {
                console.log(data.error)
            }
        } catch (error) {
            console.error(error)
        }    
    }

    const handleOpenPopup = (recipeId) => {
       
        const popup = document.querySelector('.AllRecipes-confirmPopUp')
        popup.classList.add('AllRecipes-confirmPopUp--active')   
        // recuperamos el id de la receta
        setRecipeId(recipeId)
    }

    const truncateHtml = (html, maxLength) => {
        const plainText = html.replace(/<[^>]+>/g, ''); // Elimina etiquetas HTML
        return plainText.length > maxLength ? plainText.slice(0, maxLength) + '...' : plainText;
     }

    const handleDeleteRecipe = async (e) => {
        e.preventDefault()
        const popup = document.querySelector('.AllRecipes-confirmPopUp')
        const options = {
            method: 'DELETE',

        }
        const response = await fetch(`${VITE_API}/recipes/${recipeId}`, options)
        const data = await response.json()
        try {
            if (data.success === true) {
                showMessage(data.message)
                popup.classList.remove('AllRecipes-confirmPopUp--active')
            } else {
                showMessage(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }
    const handleOpenEdit = (recipeId) => {
            navigate(`/dashboard/recipe/edit/${recipeId}`)
    }

    const handleClosePopUp = () => {
        const popup = document.querySelector('.AllRecipes-confirmPopUp')
        popup.classList.remove('AllRecipes-confirmPopUp--active')
    }     


    useEffect(() => {
        getUserRecipes()
        recipes.forEach(recipe => {
            setRecipeImage(recipe.main_image)
        })
    }, [recipes, recipeId])

    return (
        <div className="AllRecipes">
            <h2 className="AllRecipes-title Dashboard-title">Todas las recetas</h2>
            <ul className="AllRecipes-list">
                {recipes && recipes.map(recipe => {
                    return (
                        <li key={recipe._id} className="AllRecipes-recipe">
                            <div className="AllRecipes-recipeImageWrapper">
                                <img className="AllRecipes-recipeImage" src={`${recipe.main_image}`} alt="" />
                            </div>
                            <div className="AllRecipes-recipeContent">
                                <h3 className="AllRecipes-recipeTitle">{recipe.title}</h3>
                                <div className="AllRecipes-description" dangerouslySetInnerHTML={{__html: truncateHtml(recipe.description, 100)}}></div>
                                <div className="AllRecipes-buttonWrapper">
                                    <button onClick={() =>{handleOpenEdit(recipe._id)}} className="AllRecipes-button AllRecipes-button--decline">Editar receta</button>
                                    <button onClick={() =>{handleOpenPopup(recipe._id)}} className="AllRecipes-button AllRecipes-button--confirm">Eliminar receta</button>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className="AllRecipes-confirmPopUp">
                <div className="AllRecipes-confirmPopUp-content">
                    <h4 className="AllRecipes-confirmPopUp-title">¿Estás seguro de que quieres eliminar esta receta?</h4>
                    <div className="AllRecipes-confirmPopUp-buttons">
                        <button onClick={handleDeleteRecipe} className="AllRecipes-button AllRecipes-button--confirm">Sí</button>
                        <button onClick={handleClosePopUp} className="AllRecipes-button AllRecipes-button--decline">No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
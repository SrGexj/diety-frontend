import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Recipes = () => {
    
    const { VITE_API } = import.meta.env

    const [recipes, setRecipes] = useState([])

    const getRecipes = async () => {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(`${VITE_API}/recipes`, options)
        const data = await response.json()

        try {
            setRecipes(data)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        getRecipes()
    }, [])

    return (
        <div className="Recipes">
             <div className="Recipes-content">
                    <h1 className="Recipes-title">Inspírate con <span className="Hero-title--bold">nuevas recetas</span></h1>
                    <p className="Recipes-text">
                        Descubre recetas fáciles de preparar que combinan sabor y nutrición, 
                        perfectas para mantener un estilo de vida equilibrado y saludable.
                    </p>
                </div>
            <div className="Recipes-listWrapper">
            {recipes.map((recipe) => (
                    <Link to={`/receta/${recipe.url}`}>
                        <div className="Recipes-recipe">
                            <div className="Recipes-recipeImageWrapper">
                                <ul className="Recipes-optionList">
                                    {/* <li className="Recipes-option">
                                        <a href="" className="Recipes-link">FAV</a>
                                    </li>
                                    <li className="Recipes-option">
                                        <a href="" className="Recipes-link">VER</a>
                                    </li> */}
                                </ul>
                                <div className="Recipes-recipeContent">
                                    <h3 className="Recipes-recipeContentTitle">{recipe.title}</h3>
                                    <p className="Recipes-recipeText" dangerouslySetInnerHTML={{__html: recipe.description}}></p>
                                </div>
                                <img src={recipe.main_image} alt={recipe.title} className="Recipes-recipeImage" />
                            </div>
                            <h3 className="Recipes-recipeTitle">{recipe.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import '../../../styles/components/_singleRecipe.scss'

export const SingleRecipe = () => {
    
    const { url } = useParams()

    const { VITE_API } = import.meta.env

    const [recipe, setRecipe] = useState(null)


    const getRecipe = async () => {

        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }
        try {
            const response = await fetch(`${VITE_API}/receta/${url}`, options)
            const data = await response.json()

            if (data.success) {
                setRecipe(data.recipe)
            } else {
                console.error("No se pudo obtener la receta:", data.error)
            }
        } catch (error) {
            console.error("Error fetching the recipe:", error)
        }
    }
    
    useEffect( () => {
        getRecipe()
    }, [url])

    return (
        <main className="Recipe">
        {recipe ? (
                <div className="Recipe-content" key={recipe._id}> {/* Utiliza _id como key */}
                    <h2 className="Recipe-title">
                        {recipe.title}
                    </h2>
                    <img src={recipe.main_image} alt={recipe.title} />
                    <p className="Recipe-description" dangerouslySetInnerHTML={{__html: recipe.description}}></p>
                    <h3>Ingredientes</h3>
                    <ul>
                      
                        {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
                            recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li> // Asegúrate de usar keys únicas
                            ))
                        ) : (
                            <li>No hay ingredientes disponibles.</li>
                        )}
                    </ul>
                    <h3>Instrucciones</h3>
                    <p>{recipe.instructions}</p>
                </div>
            ) : (
                <p>Cargando receta...</p>
            )}
    </main>
    )
}
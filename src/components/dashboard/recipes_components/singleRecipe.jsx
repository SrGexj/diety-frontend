import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import '../../../styles/components/_singleRecipe.scss'
import DOMPurify from 'dompurify'

export const SingleRecipe = () => {
    
    const { url } = useParams()

    const { VITE_API } = import.meta.env

    const [recipe, setRecipe] = useState(null)
    const [instructions, setInstructions] = useState([])

    const getRecipe = async () => {
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        };
    
        try {
            const response = await fetch(`${VITE_API}/receta/${url}`, options);
            const data = await response.json();
    
            if (data.success) {
                setRecipe(data.recipe);
    
                // Procesar instrucciones
                try {
                    const parsedInstructions = JSON.parse(data.recipe.instructions);
                    if (Array.isArray(parsedInstructions)) {
                        // Extraer solo los títulos
                        setInstructions(parsedInstructions.map((item) => item.title || "Instrucción no válida"));
                    } else {
                        console.error("Las instrucciones no son un array válido:", parsedInstructions);
                        setInstructions([]);
                    }
                } catch (err) {
                    console.error("Error al parsear instrucciones:", err);
                    setInstructions([]);
                }
    
                setIngredients(data.recipe.ingredients);
            } else {
                console.error("No se pudo obtener la receta:", data.error);
            }
        } catch (error) {
            console.error("Error fetching the recipe:", error);
        }
    };
    
    
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
                                <li key={index}>{ 
                                    JSON.parse(ingredient).map((item, index) => (
                                        <span key={index}>{item.name}</span>
                                    ))
                                }</li>
                            ))
                        ) : (
                            <li>No hay ingredientes disponibles.</li>
                        )}
                    </ul>
                    <h3>Instrucciones</h3>
                    <ol>
                        {instructions.length > 0 ? (
                            instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))
                        ) : (
                            <li>No hay instrucciones disponibles.</li>
                        )}
                    </ol>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
    </main>
    )
}
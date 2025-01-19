import { useContext, useEffect, useRef, useState } from 'react'
// import { useQuill } from 'react-quilljs'
// import 'quill/dist/quill.snow.css'
// import DOMPurify from 'dompurify'
import { toolbar } from "./toolbar"
import { userContext } from "../../../App"
import { MessageContext } from "../../messages/Messages"
import { useParams } from 'react-router-dom'

export const EditRecipe = () => {
    const { VITE_API } = import.meta.env
    const { currentUser } = useContext(userContext)
    const { showMessage } = useContext(MessageContext)

    const { quill, quillRef } = useQuill({ modules: { toolbar } })
    const updateRecipeRef = useRef(null)
    const { recipeId } = useParams()
    
    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [recipeData, setRecipeData] = useState(null)
    const [imagePreview, setImagePreview] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])
    const [loadingMessage, setLoadingMessage] = useState("")
    const [hasMoreResults, setHasMoreResults] = useState(false)

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setImagePreview(reader.result)
            reader.readAsDataURL(file)
        }
    }

    const handleStepChange = (index, field, value) => {
        const updatedSteps = [...steps]
        updatedSteps[index][field] = value
        setSteps(updatedSteps)
    }

    const addStep = () => setSteps([...steps, { title: '' }])

    const removeStep = (index) => {
        const updatedSteps = steps.filter((_, i) => i !== index)
        setSteps(updatedSteps)
    }

    const handleSearchChange = (value) => {
        setSearchValue(value)
        setCurrentPage(1)
    }

    const handlePageChange = (direction) => {
        const newPage = currentPage + direction
        setCurrentPage(newPage)
    }
    const handleIngredientSelect = (ingredientName) => {
      const selected = searchResults.find((item) => item.name === ingredientName)
      setIngredients([...ingredients, selected])
    }

    const removeIngredient = (index) => {
        const updatedIngredients = [...ingredients] 
        updatedIngredients.splice(index, 1)
        setIngredients(updatedIngredients)
    }

    const handleUpdateRecipe = async (e) => {
        e.preventDefault()
        const { title, image } = updateRecipeRef.current

        const htmlContent = quill.root.innerHTML
        const sanitizedContent = DOMPurify.sanitize(htmlContent)

        const formData = new FormData()
        formData.append('title', title.value)
        formData.append('description', sanitizedContent)
        formData.append('main_image', image.files[0])
        formData.append('ingredients', ingredients.map(i => i.value))  // Ingredientes seleccionados
        formData.append('instructions', JSON.stringify(steps))
        formData.append('url', encodeURI(title.value))
        formData.append('userId', currentUser._id)

        const options = { 
            method: 'PUT', 
            body: formData
        }

        try {
            const response = await fetch(`${VITE_API}/recipes/edit/${recipeId}`, options)
            const data = await response.json()
            if (data.success) {
                showMessage(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getRecipeData = async () => {
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        }
        const response = await fetch(`${VITE_API}/recipes/edit/${recipeId}`, options)
        const data = await response.json()
        if (data.success) {
            console.log("Recipe data:", data.recipes)
            setRecipeData(data.recipes)
            const recipeIng = data.recipes.ingredients
            setIngredients(JSON.parse(recipeIng))

            setSteps(JSON.parse(data.recipes.instructions))

        }
    }

    useEffect(() => {
        getRecipeData() 
        if (searchValue) {
            const fetchIngredients = async (page) => { // Asegúrate de que recibe 'page' como parámetro
              setLoadingMessage("Buscando ingredientes...")
              try {
                const response = await fetch(
                  `${VITE_API}/ingredients?search=${searchValue}&page=${page}`
                )
        
                if (!response.ok) throw new Error("Error en la búsqueda")
                const data = await response.json()
                setSearchResults(
                  data.ingredients.map((ingredient) => ({
                    id: ingredient._id,
                    name: ingredient.product_name
                  }))
                )
                setHasMoreResults(data.hasMore)
              } catch (error) {
                console.error("Fetch error:", error)
                setLoadingMessage("Error al buscar ingredientes. Intenta nuevamente.")
              } finally {
                setLoadingMessage("")
              }
            }
        
            fetchIngredients(currentPage) // Llama la función con 'currentPage'
          }
        }, [searchValue, currentPage]) 

        useEffect(() => {
            if (quill && recipeData?.description) {
                // Solo intentamos modificar el contenido del Quill si está disponible y recipeData.description existe
                const sanitizedDescription = DOMPurify.sanitize(recipeData.description)
                quill.root.innerHTML = sanitizedDescription
            }
        }, [quill, recipeData]) 

    return (
        <div className="EditRecipe">
            <h2 className="Form-title Dashboard-title">Editar receta</h2>

            <div className="Form-editFull">
                <form ref={updateRecipeRef} className="Form Form-editRecipe">
                    <div className="Form-group">
                        <label className="Form-label" htmlFor="title">Título de la receta</label>
                        <input className="Form-input" required type="text" name="title" id="title" placeholder="Editar el título de tu receta" defaultValue={recipeData?.title || ''} />
                    </div>
                    <div className="Form-group">
                        <h3 className="Form-group--title">Subir imagen</h3>
                        <label htmlFor="image" className="Form-label Form-label--upload" style={{ backgroundImage: `url(${imagePreview})` }}>
                            {imagePreview ? null : ''}
                        </label>
                        <input className="Form-input" type="file" name="image" id="image" accept="image/*" onChange={handleImageChange} />
                    </div>
                    <div className="Form-group">
                        <label className="Form-label">Descripción</label>
                        <div id="editor" className="Form-editor">
                            <div ref={quillRef} />
                        </div>
                    </div>
                    {/* Ingredients */}
                    <div className="Form-group">
                        <label className="Form-label">Ingredientes</label>
                        <div className="Form-ingredientSearch">
                            <input
                            className="Form-input"
                            type="text"
                            placeholder="Buscar ingredientes..."
                            value={searchValue}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            />
                            {searchValue.length > 0 && (
                            <div className="Form-ingredientResults">
                                {loadingMessage && <p>{loadingMessage}</p>}
                                {searchResults.map((ingredient) => (
                                <button
                                    className="Form-ingredientButton"
                                    key={ingredient.id}
                                    type="button"
                                    onClick={() => handleIngredientSelect(ingredient.name)}
                                >
                                    {ingredient.name}
                                </button>
                                ))}
                                <div className="Form-pagination">
                                {currentPage > 1 && (
                                    <button
                                    className="Form-pagination--prev"
                                    type="button"
                                    onClick={() => handlePageChange(-1)}
                                    >
                                    Anterior
                                    </button>
                                )}
                                {hasMoreResults && (
                                    <button
                                    className="Form-pagination--next"
                                    type="button"
                                    onClick={() => handlePageChange(1)}
                                    >
                                    Siguiente
                                    </button>
                                )}
                                </div>
                            </div>
                            )}
                        </div>
                        {ingredients.length > 0 && (
                            <ul className="Form-ingredientList">
                            {ingredients.map((ingredient, index) => (
                            <div key={index} className="ingredient">
                                <span>{ingredient.name}</span>
                                <button type="button" onClick={() => removeIngredient(index)}>Eliminar</button>
                            </div>
                            ))}
                            </ul>
                        )}
                    </div>
                </form>
                <form className="Form Form-editRecipe">
                    <div className="Form-group">
                            <label className="Form-label">Instrucciones de la receta</label>
                            {steps.map((step, index) => (
                                <div key={index} className="Form-step">
                                    <input className="Form-input" type="text" placeholder="Título del paso" value={step.title} onChange={(e) => handleStepChange(index, 'title', e.target.value)} required />
                                    <div className="Form-buttonWrapper">
                                        <button type="button" className="Form-button Form-button--delete" onClick={() => removeStep(index)}>Eliminar paso</button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="Form-addStep" onClick={addStep}>Añadir Paso</button>
                        </div>
                </form>
            </div>
            <input className="Form-button" type="submit" value="Actualizar receta" onClick={handleUpdateRecipe} />
        </div>
    )
}

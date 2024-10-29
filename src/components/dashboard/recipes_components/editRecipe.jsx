import { useEffect, useRef, useState } from 'react'
import 'quill/dist/quill.snow.css'
import { useQuill } from 'react-quilljs'
import { toolbar } from "./toolbar"
import { Link, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'

export const EditRecipe = () => {

    const updateRecipeRef = useRef(null)
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: toolbar
    }})

    
    const [recipeData, setRecipeData] = useState(null)
    const [imagePreview, setImagePreview] = useState(recipeData?.main_image || '')

    const url = useParams()
    
    const handleImageChange = (event) => {
      const file = event.target.files[0]
  
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
      }
    }

    const handleUpdateRecipe = async (e) => {
        e.preventDefault()
        const { recipeName, recipeIngredients, recipeSteps, recipeImage } = updateRecipeRef.current

        // Obtenemos y convertimos la info introducida en el editor de Quill
        const htmlContent = quill.root.innerHTML
    
        // Lo sanitizamos con dompurify para evitar posibles inyecciones de codigo p. ej. 
        const sanitizedContent = DOMPurify.sanitize(htmlContent)
       
        const formData = new FormData()
        formData.append('title', recipeName.value)
        formData.append('description', sanitizedContent)
        formData.append('main_image', recipeImage.files[0])
        formData.append('ingredients', JSON.stringify([])) 
        formData.append('instructions', recipeSteps.value)
        formData.append('url', encodeURI(title.value))
        formData.append('userId', currentUser._id)

        let options = {
            method: 'PUT',
            body: formData
        }

        const response = await fetch(`http://localhost:3000/recipes/edit/${url.recipeId}`, options)
        const data = await response.json()
        try {
            if (data.success === true) {
                console.log(data.message)
            } else {
                console.log(data.error)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getRecipeData = async () => {
        let options = {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        }
        const response = await fetch(`http://localhost:3000/recipes/edit/${url.recipeId}`, options)
        const data = await response.json()
        try {
            if (data.success === true) {
                setRecipeData(data.recipes)
            } else {
                console.log(data.error)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getRecipeData()
    }, [])

    return (
        <div className="EditRecipe">
            <h2 className="EditRecipe-title Dashboard-title">Editar receta</h2>
            <Link to="/dashboard/my-recipes" className='EditRecipe-back'>
            
            Volver atrás
            </Link>
            <form ref={updateRecipeRef} className="EditRecipe-form Form">
                <div className="EditRecipe-formGroup">
                    <label htmlFor="recipeName" className="Form-label">Nombre de la receta</label>
                    <input type="text" id="recipeName" className="Form-input" placeholder={recipeData && recipeData.title ? recipeData.title : '' } />
                </div>
                <div className="EditRecipe-formGroup">
                    <label htmlFor="recipeDescription" className="Form-label">Descripción de la receta</label>
                    <div id="editor">
                        <div ref={quillRef} />
                    </div>
                </div>
              

                <div className="EditRecipe-formGroup">
                    <label htmlFor="recipeIngredients" className="Form-label">Ingredientes</label>
                    
                </div>
                <div className="EditRecipe-formGroup">
                    <h3 className="Form-group--title">Subir imagen</h3>
                    <label htmlFor="recipeImage" className="Form-label Form-label--upload" style={{backgroundImage: imagePreview ? `url(${imagePreview})` : 'none'}}>
                        {!imagePreview && '+'}
                    </label>
                    <input type="file" id="recipeImage" className="Form-input" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className="EditRecipe-formGroup">
                    <button onClick={handleUpdateRecipe} className="Form-button">Guardar cambios</button>
                </div>
            </form>
        </div>
    )
}
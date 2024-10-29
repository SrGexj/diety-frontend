import { useContext, useEffect, useRef, useState } from "react"
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import Select from 'react-select'
import DOMPurify from 'dompurify'
import debounce from 'lodash/debounce'
import { toolbar } from "./toolbar"
import { userContext } from "../../../App"

export const NewRecipe = () => {
    const { currentUser } = useContext(userContext)
    const recipeFormRef = useRef(null)
    const { quill, quillRef } = useQuill({
        modules: { toolbar: toolbar }
    })

    const [ingredients, setIngredients] = useState([])
    const [options, setOptions] = useState([])
    const [imagePreview, setImagePreview] = useState('')
    const [steps, setSteps] = useState([{ title: '' }])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [loadingMessage, setLoadingMessage] = useState("")

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { title, image } = recipeFormRef.current

        const htmlContent = quill.root.innerHTML
        const sanitizedContent = DOMPurify.sanitize(htmlContent)

        const formData = new FormData()
        formData.append('title', title.value)
        formData.append('description', sanitizedContent)
        formData.append('main_image', image.files[0])
        formData.append('ingredients', JSON.stringify(ingredients.map(i => i.value)))
        formData.append('instructions', JSON.stringify(steps))
        formData.append('url', encodeURI(title.value))
        formData.append('userId', currentUser._id)

        try {
            const response = await fetch(`http://localhost:3000/recipes`, { method: 'POST', body: formData })
            const data = await response.json()
            console.log(data.success ? data.message : data.error)
        } catch (error) {
            console.error(error)
        }
    }

    const getIngredients = async (inputValue, page) => {
        const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        const response = await fetch(`http://localhost:3000/ingredients?search=${inputValue}&page=${page}&limit=10`, options)
        const data = await response.json()
        if (data.success) {
            setOptions(prevOptions => [
                ...prevOptions,
                ...data.ingredients.map(ingredient => ({
                    label: ingredient.product_name || ingredient.product_name_es,
                    value: ingredient.id
                }))
            ])
            setHasMore(data.hasMore)
        }
    }

    const debouncedGetIngredients = debounce((inputValue) => {
        setPage(1)
        setOptions([])
        setLoadingMessage("Cargando...")
    
        const timeoutId = setTimeout(() => {
            setLoadingMessage("Estamos tardando más de lo esperado...")
        }, 5000)
    
        getIngredients(inputValue, 1).then(() => clearTimeout(timeoutId))
    }, 300)

    const handleInputChange = (inputValue) => {
        if (inputValue) debouncedGetIngredients(inputValue)
        else setOptions([])
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight
        if (bottom && hasMore) {
            setPage(prevPage => prevPage + 1)
            getIngredients(inputValue, page + 1)
        }
    }

    useEffect(() => {
        const container = document.querySelector('.react-select__menu')
        if (container) container.addEventListener('scroll', handleScroll)
        return () => container?.removeEventListener('scroll', handleScroll)
    }, [hasMore, page])

    return (
        <>
            <h2 className="Form-title Dashboard-title">Añadir una receta</h2>

            <form ref={recipeFormRef} className="Form Form-newRecipe">
                <div className="Form-group">
                    <label className="Form-label" htmlFor="title">Título de la receta</label>
                    <input className="Form-input" required type="text" name="title" id="title" placeholder="Añade el título de tu receta" />
                </div>
                <div className="Form-group">
                    <h3 className="Form-group--title">Subir imagen</h3>
                    <label htmlFor="image" className="Form-label Form-label--upload" style={{ backgroundImage: `url(${imagePreview})` }}>
                        {imagePreview ? null : ''}
                    </label>
                    <input className="Form-input" required type="file" name="image" id="image" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className="Form-group">
                    <label className="Form-label">Descripción</label>
                    <div id="editor" className="Form-editor">
                        <div ref={quillRef} />
                    </div>
                </div>
                <div className="Form-group">
                    <label className="Form-label">Ingredientes</label>
                    <Select 
                        name="ingredients" 
                        options={options}
                        onInputChange={handleInputChange}
                        placeholder={loadingMessage || 'Buscar ingredientes'}
                        onChange={setIngredients}
                        onScroll={handleScroll} 
                        isMulti
                    />
                </div>

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

                <input className="Form-button" type="submit" value="Añadir receta" onClick={handleSubmit} />
            </form>
        </>
    )
}

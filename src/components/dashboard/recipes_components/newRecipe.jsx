import { useEffect, useRef, useState } from "react"
import { Editor } from '@tinymce/tinymce-react'

export const NewRecipe = () => {
    
    const recipeFormRef = useRef(null)
    const editorRef = useRef(null);

    const [recipe, setRecipe] = useState({})

   const handleSubmit = (e) => {
        e.preventDefault()
        const form = recipeFormRef.current
        const formData = new FormData(form)
        const title = formData.get('title')
        const content = editorRef.current.getContent()
        const recipe = {
            title,
            content
        }
        setRecipe(recipe)
    }

    const log = () => {
      if (editorRef.current) {
        const content = editorRef.current.getContent();
        console.log(content);
      }
    };
    return(
        <>

        <h2>Añadir una receta</h2>

            <form ref={recipeFormRef} className="Form Form-newRecipe">
                <input type="text" name="title" required />
                

            {/* <Editor
                className="Form-textEditor"
                tinymceScriptSrc="/tinymce/js/tinymce/tinymce.min.js"
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>Añade la descripción de la receta</p>"
                init={{
                language: 'es',
                menubar: true,
                plugins: [
                    'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace',
                    'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            /> */}
            <input type="submit" value="Añadir receta" onClick={handleSubmit} />
            </form>

               {<div>
                    <h3>{recipe.title}</h3>
                    {/* <div dangerouslySetInnerHTML={{__html: recipe.content}}></div> */}
                </div>
                }

        </>
    )
}
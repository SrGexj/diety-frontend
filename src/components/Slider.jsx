import { createContext, useEffect, useRef, useState } from "react"
import '../styles/components/_slider.scss'

export const Slider = () => {

    const [recipes, setRecipes] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const [slideWidth, setSlideWidth] = useState(0)
    const [showedSlides, setShowedSlides] = useState(3)

    let slidesGap = 50

    const sliderRef = useRef(null);

    const getRecipes = async () => {

        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch('http://localhost:3000/recipes', options)
        const data = await response.json()
        try {
            data.map (recipe => {
                const date = new Date(recipe.createdAt)
                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                recipe.createdAt = formattedDate
            })
            setRecipes(data)
            
        } catch (error) {
            console.error(error)
        }
    }

     const handlePrevSlide = () => {
         setCurrentSlide(currentSlide - 1)
     }

     const handleNextSlide = () => {
         setCurrentSlide(currentSlide + 1)
     }

     useEffect(() => {
        getRecipes()

    }, [])

    useEffect(() => {
        if (sliderRef.current) {
            const uniqueSlideWidth = sliderRef.current.clientWidth
            setSlideWidth(uniqueSlideWidth)
        }

        currentSlide >= recipes.length - 2 ? setCurrentSlide(0) : currentSlide < 0 ? setCurrentSlide(recipes.length) : setCurrentSlide(currentSlide)

       const handleResize = () => {

            if (sliderRef.current) {
                const uniqueSlideWidth = sliderRef.current.clientWidth
                setSlideWidth(uniqueSlideWidth)
            }

           if (window.innerWidth < 768) {
               setShowedSlides(1)
           } else if (window.innerWidth < 1024) {
               setShowedSlides(2)
           } else {
               setShowedSlides(3)
           }
       }

       handleResize()
       window.addEventListener('resize', handleResize)

       return () => {
           window.removeEventListener('resize', handleResize)
       }

     }, [showedSlides, currentSlide, recipes])


  return (

        <section className="Content-section Slider">
        <div className="Slider-wrapper">
            <div className="Slider-controls">
                <button className="Slider-prev" onClick={handlePrevSlide}>
                <svg className="flecha flecha-prev"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285.96 536.33">
                    <path d="M280.11,502.18L46.09,268.16L280.11,34.13c7.8-7.8,7.8-20.49,0-28.29c-7.8-7.79-20.48-7.79-28.28,0
                    L7.39,250.28c-9.85,9.85-9.85,25.89,0,35.75l244.44,244.44c3.78,3.78,8.8,5.86,14.14,5.86s10.36-2.08,14.14-5.86
                    C287.91,522.67,287.91,509.98,280.11,502.18L280.11,502.18z"/>
                </svg>
                </button>
                <button className="Slider-next" onClick={handleNextSlide}>
                    <svg className="flecha flecha-next"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285.96 536.33">
                            <path  d="M5.85,34.15l234.02,234.02L5.85,502.2c-7.8,7.8-7.8,20.49,0,28.29c7.8,7.79,20.48,7.79,28.28,0
                                l244.44-244.44c9.85-9.85,9.85-25.89,0-35.75L34.13,5.86C30.35,2.08,25.33,0,19.99,0S9.63,2.08,5.85,5.86
                                C-1.95,13.66-1.95,26.35,5.85,34.15L5.85,34.15z"/>
                    </svg>
                </button>
            </div>
            <div
                className="Slider-content"
                style={{
                    width: `${recipes.length * 100}%`,
                    gridTemplateColumns: `repeat(calc(${recipes.length} * ${showedSlides}), 1fr)`,
                    transform: `translateX(${-(slideWidth + slidesGap) * currentSlide}px)`,
                    gap: slidesGap + 'px',
                }}
            >
                {recipes.map((slide, index) => (
                    <div key={index} className="Slider-recipe" ref={sliderRef}>
                        <div className="Slider-recipeImageWrapper">
                            <ul className="Slider-optionList">
                                <li className="Slider-option">
                                    <a href="" className="Slider-link">FAV</a>
                                </li>
                                <li className="Slider-option">
                                    <a href="" className="Slider-link">VER</a>
                                </li>
                            </ul> 
                            <div className="Slider-recipeContent">
                                <h3 className="Slider-recipeContentTitle">{slide.title}</h3>
                                <p className="Slider-recipeText">{slide.description}</p>
                            </div>
                            <img src={slide.main_image} alt={slide.title} className="Slider-recipeImage" />
                        </div>
                        <h3 className="Slider-recipeTitle">{slide.title}</h3>

                    </div>
                ))}
            </div>
        </div>
    </section>


)
 }
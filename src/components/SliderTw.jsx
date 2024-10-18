import { createContext, useEffect, useState } from "react"
import '../styles/components/_slider.scss'

export const SliderTw = () => {



    const [recipes, setRecipes] = useState()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [slideWidth, setSlideWidth] = useState(0)
    const [showedSlides, setShowedSlides] = useState(3)

    let slidesGap = 50

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
        
       // const uniqueSlideWidth = document.querySelector('.Slides').clientWidth
       // setSlideWidth(uniqueSlideWidth)

       // currentSlide >= recipes.length ? setCurrentSlide(0) : currentSlide < 0 ? setCurrentSlide(recipes.length - 1) : setCurrentSlide(currentSlide)

       const handleResize = () => {
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

        <section className="Content-section Slider" style={{overflow: 'hidden', padding: '20px 50px' }}>
        {/* <div className="Slider-wrapper" style={{overflow: 'hidden', width: '100%'}}>
            <div className="Slider-controls">
                <button onClick={handlePrevSlide}>
                    Previous
                </button>
                <button onClick={handleNextSlide}>
                    Next
                </button>
            </div>
            <div
                className="Slider-content"
                style={{
                    display: 'grid',
                    width: `${recipes.length * 100}%`,
                    gridTemplateColumns: `repeat(calc(${recipes.length} * ${showedSlides}), 1fr)`,
                    transform: `translateX(${-(slideWidth + slidesGap) * currentSlide}px)`,
                    gap: slidesGap + 'px',
                    transition: 'transform 0.5s'
                }}
            >
                {recipes.map((slide, index) => (
                    <div
                        key={index}
                        className={`Slides`}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: '#f5f5f5',
                        }}
                    >
                        <h2>{slide.title}</h2>
                        <p>{slide.description}</p>
                    </div>
                ))}
            </div>
        </div> */}
    </section>


)
 }
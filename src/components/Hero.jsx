import '../styles/components/_hero.scss'
export const Hero = () => {
    return(
        <section className="Hero">
            <div className="Hero-wrapper">
                <div className="Hero-content">
                    <h1 className="Hero-title">construyendo <span className="Hero-title--bold">grandes hábitos</span></h1>
                    <p className="Hero-description">Organiza, planea y saborea tus comidas para que sean perfectas con DIETY®. 
                        <span className="Hero-subtle">¡La mejor forma de ponerte en forma!</span>
                    </p>
                    <div className="Hero-buttonsWrapper">
                        <a href="/recipes" className="Button Button-find">
                            <span className="Button-icon">
                                <svg width="22" height="23" viewBox="0 0 22 23" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_69_148)">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.52861 18.2706C14.058 18.2706 17.7276 14.5921 17.7276 10.0517C17.7276 5.51131 14.058 1.83279 9.52861 1.83279C4.99919 1.83279 1.32957 5.51131 1.32957 10.0517C1.32957 14.5921 4.99919 18.2706 9.52861 18.2706ZM9.52861 19.6034C14.7893 19.6034 19.0572 15.3251 19.0572 10.0517C19.0572 4.77827 14.7893 0.5 9.52861 0.5C4.26793 0.5 0 4.77827 0 10.0517C0 15.3251 4.26793 19.6034 9.52861 19.6034Z" fill="#138453"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.5383 16.0226C15.7998 15.7605 16.2208 15.7605 16.4778 16.0226L21.805 21.3627C22.0665 21.6248 22.0665 22.0469 21.805 22.3045C21.5435 22.5667 21.1225 22.5667 20.8654 22.3045L15.5383 16.9645C15.2768 16.7024 15.2768 16.2803 15.5383 16.0226Z" fill="#138453"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_69_148">
                                            <rect width="22" height="22" fill="white" transform="translate(0 0.5)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span className='Button-text'>Explorar Recetas</span> 
                        </a>
                        <a href="/register" className="Button Button-startNow">
                            <span className='Button-text'>Empezar ahora</span> 
                            <span className="Button-icon">
                                <svg version="1.1" className="Button-iconArrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 15">
                                    <polygon points="3.1,14.6 0.9,12.4 5.9,7.5 0.9,2.6 3.1,0.4 10.1,7.5 "/>
                                    <polygon points="19.1,14.6 16.9,12.4 21.9,7.5 16.9,2.6 19.1,0.4 26.1,7.5 "/>
                                    <polygon points="34.3,14.6 32.2,12.4 37.1,7.5 32.2,2.6 34.3,0.4 41.3,7.5 "/>
                                </svg>
                            </span>
                        </a>
                    </div>
                    <span className="Hero-loginCta">¡Ya tengo cuenta!<a href="/login" className="Hero-loginCta--link">Iniciar Sesión</a></span>
                </div>
                <div className="Hero-imageWrapper">
                    <img src="/imgs/home-image.png" alt="girl smiling eating salad" className="Hero-image"/>
                </div>
            </div>
        </section>
    )
}
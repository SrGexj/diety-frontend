import '../styles/components/_about.scss'
export const About = () => {
    return (
        <div className="About" id='about'>
            <section className="About-wrapper">
                <h2 className="About-title">¿Qué es <span className="Brand-name">diety®</span>?</h2>
                <p className="About-description">
                <span className="Brand-name">DIETY®</span> es tu compañero ideal para planificar y organizar tus comidas. Con funciones que te ayudan a mantener un estilo de vida saludable, <span className="Brand-name">DIETY®</span> simplifica la gestión de dietas y recetas de forma rápida y sencilla.
                    <span className="About-subtle">¡No más excusas para no comer saludable!</span>
                </p>
                <article className="About-features">
                    <section className="About-feature">
                        <img src="/imgs/feature-1.webp" alt="" className="About-featureImage" />
                        <div className="About-featureContent">
                            <h2 className="About-featureTitle">Organización fácil</h2>
                            <p className="About-featureDescription">Planea tus comidas de manera rápida y sin esfuerzo.</p>
                        </div>
                    </section>
                    <section className="About-feature">
                        <img src="/imgs/feature-2.webp" alt="" className="About-featureImage" />
                        <div className="About-featureContent">
                            <h2 className="About-featureTitle">Progreso al alcance</h2>
                            <p className="About-featureDescription">Lleva un registro de tus logros y mejoras.</p>
                        </div>
                    </section>
                    <section className="About-feature">
                        <img src="/imgs/feature-3.webp" alt="" className="About-featureImage" />
                        <div className="About-featureContent">
                            <h2 className="About-featureTitle">Recetas personalizadas</h2>
                            <p className="About-featureDescription">Encuentra recetas adaptadas a tus objetivos nutricionales.</p>
                        </div>
                    </section>
                </article>
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
            </section>
        </div>
    ) 
}
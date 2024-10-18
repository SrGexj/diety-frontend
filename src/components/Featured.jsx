import { Slider } from "./Slider"
import '../styles/components/_featured.scss'
export const Featured = () => {
    return (
        <section className="Featured">
            <div className="Featured-wrapper">
                <div className="Featured-content">
                    <h2 className="Featured-title">Inspírate con <span className="Hero-title--bold">nuevas recetas</span></h2>
                    <p className="Featured-text">
                        Descubre recetas fáciles de preparar que combinan sabor y nutrición, 
                        perfectas para mantener un estilo de vida equilibrado y saludable.
                    </p>
                </div>
                <Slider />
            </div>
        </section>
    )
}

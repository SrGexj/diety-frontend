import '../styles/components/_footer.scss'
import { useEffect } from "react"

export const Footer = () => {

    useEffect(() => {
        const todayYear = document.querySelector('.todayYear')
        const year = new Date().getFullYear()
        todayYear.textContent = year
    }, [])


    return (
        <footer className="Footer">
            <div className="Footer-wrapper">
                <div className="Footer-content">
                 <div className="Footer-logo">
                    <svg className="logoDiety" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 181">
                        <path className="logoDiety-hojaTwo" d="M17.1,139c5-51.7,30.8-79.9,77.4-84.5
                            C91.1,105,64.6,132.5,17.1,139z"/>
                        <path className="logoDiety-hojaOne" d="M56.5,0C8.9,28.9-5.8,71.8,9.1,121.3
                            C16.3,85.5,35.4,60,68.3,49.1C67.9,34.2,64.1,17.8,56.5,0z"/>
                        <path className="logoDiety-text" d="M2,181v-22.4h7.3c2.4,0,4.5,0.5,6.3,1.4c1.8,1,3.2,2.3,4.1,4c1,1.7,1.5,3.6,1.5,5.8s-0.5,4.1-1.5,5.8c-1,1.7-2.4,3-4.1,4
                            c-1.8,1-3.9,1.4-6.3,1.4H2z M6.6,176.9h2.8c1.5,0,2.7-0.3,3.8-0.9c1.1-0.6,1.9-1.4,2.5-2.5c0.6-1.1,0.9-2.3,0.9-3.8
                            c0-1.5-0.3-2.7-0.9-3.8c-0.6-1.1-1.4-1.9-2.5-2.5c-1.1-0.6-2.3-0.9-3.8-0.9H6.6V176.9z M24.2,181v-22.4h4.6V181H24.2z M32.8,181
                            v-22.4h15v4.1H37.4v5.1h9.8v4.1h-9.8v5.1h10.4v4.1H32.8z M54.5,181v-18.3h-5.7v-4.1h15.9v4.1h-5.6V181H54.5z M72.8,181v-9.8
                            l-7.4-12.6h5.3l5.4,9.5h-1.9l5.4-9.5h5.3l-7.4,12.6v9.8H72.8z M91.4,166.1c-0.9,0-1.6-0.2-2.3-0.6c-0.7-0.4-1.3-1-1.7-1.7
                            c-0.4-0.7-0.6-1.5-0.6-2.3c0-0.9,0.2-1.6,0.6-2.3c0.4-0.7,1-1.2,1.7-1.7c0.7-0.4,1.5-0.6,2.3-0.6c0.6,0,1.2,0.1,1.8,0.4
                            c0.6,0.2,1,0.6,1.5,1s0.8,0.9,1,1.5c0.2,0.6,0.4,1.2,0.4,1.8c0,0.8-0.2,1.6-0.6,2.3c-0.4,0.7-1,1.3-1.7,1.7S92.3,166.1,91.4,166.1z
                            M91.4,164.8c0.6,0,1.1-0.1,1.6-0.4c0.5-0.3,0.9-0.7,1.2-1.2c0.3-0.5,0.5-1.1,0.5-1.7c0-0.6-0.2-1.2-0.5-1.7
                            c-0.3-0.5-0.7-0.9-1.2-1.2c-0.5-0.3-1-0.4-1.6-0.4c-0.6,0-1.2,0.2-1.7,0.4c-0.5,0.3-0.9,0.7-1.2,1.2c-0.3,0.5-0.4,1-0.4,1.6
                            c0,0.6,0.1,1.2,0.4,1.7c0.3,0.5,0.7,0.9,1.2,1.2C90.3,164.6,90.8,164.8,91.4,164.8z M89.4,163.9V159h2.2c0.5,0,1,0.1,1.3,0.4
                            c0.4,0.3,0.5,0.7,0.5,1.3c0,0.4-0.1,0.7-0.3,0.9c-0.2,0.2-0.4,0.4-0.6,0.5l1,1.8H92l-0.9-1.6h-0.3v1.6H89.4z M90.8,161.1h0.8
                            c0.1,0,0.2,0,0.3-0.1c0.1-0.1,0.1-0.2,0.1-0.3c0-0.1,0-0.2-0.1-0.3c-0.1-0.1-0.2-0.1-0.3-0.1h-0.8V161.1z"/>
                    </svg>
                 </div>
                 <nav className="Footer-nav">
                    <ul className="Footer-list">
                        <li className="Footer-item"><a href="/" className="Footer-link">Inicio</a></li>
                        <li className="Footer-item"><a href="/recetas" className="Footer-link">Recetas</a></li>
                        <li className="Footer-item"><a href="/login" className="Footer-link">Mi cuenta</a></li>
                        <li className="Footer-item"><a href="/register" className="Footer-link">Registrarse</a></li>
                    </ul>
                 </nav>
                 <div className="Footer-contact">
                        <h3 className="Footer-contactTitle">Contacto</h3>
                        <a className="Footer-mail" href='mailto:hello@diety.es'>hello@diety.es</a>
                        <a className="Footer-phone" href='tel:+34693301294'>+34 693 30 12 94</a>
                 </div>
                </div>
                <div className="Footer-subFooter">
                    <p className="Footer-disclaimer">© <span className="todayYear"></span> DIETY - GESTION DE DIETAS</p>
                    <ul className="Footer-legalList">
                        <li className="Footer-legalItem"><a href="#" className="Footer-legalLink">Privacidad</a></li>
                        <li className="Footer-legalItem"><a href="#" className="Footer-legalLink">Aviso Legal</a></li>
                        <li className="Footer-legalItem"><a href="#" className="Footer-legalLink">Uso de datos</a></li>
                    </ul>
                    <a className="Footer-creator" href="https://gexj.es">gexj.es</a>
                </div>
            </div>
        </footer>
    )
}
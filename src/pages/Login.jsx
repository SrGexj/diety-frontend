import { useContext, useEffect, useRef, useState } from 'react'
import '../styles/components/_login.scss'
import { userContext } from '../App'
export const Login = () => {

    const { setCurrentUser } = useContext(userContext)

    const loginRef = useRef(null)

    const [userData, setUserData] = useState([])
    const [checked, setChecked] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()

        const { email, password } = loginRef.current

        const formData = {
            email: email.value,
            password: password.value
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch('http://localhost:3000/login', options)
        const data = await response.json()
        try {
           if (data.success === true) {
               setCurrentUser(data.user)
             
                 if (checked === true) {
                     localStorage.setItem('userData', JSON.stringify(data.user))
                 } else {
                     sessionStorage.setItem('userData', JSON.stringify(data.user))
                 }
           } else {
               console.log(data.error)
           }
        } catch (error) {
            console.error(error)
        }

    }
    const handleChecked = () => {

        setChecked(true)

        if (checked === true) {
            setChecked(false)
        } else {
            setChecked(true)
        }

    }

    useEffect(() => {
    }, [checked, userData])

    return (
        <section className="Login">
            <div className="Login-wrapper">
                <div className="Login-logo">
                    <a href="/" className="Login-link" title='Ir a inicio'>
                        <svg className="Login-logoSvg" width="177" height="70" viewBox="0 0 177 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_4_411)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.5187 69.5C16.0022 43.8206 28.7633 29.8427 51.8021 27.5636C50.125 52.6255 37.0253 66.2659 13.5187 69.5Z" fill="#138453"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M32.9913 0.5C9.45368 14.8469 2.19703 36.1408 9.55446 60.6977C13.1389 42.9571 22.5689 30.2927 38.8576 24.8816C38.6482 17.4818 36.7669 9.32844 32.9913 0.5Z" fill="#1FDE70"/>
                            </g>
                                <path d="M73.7821 46V23.65H81.0721C83.4921 23.65 85.5921 24.13 87.3721 25.09C89.1521 26.05 90.5321 27.37 91.5121 29.05C92.4921 30.73 92.9821 32.65 92.9821 34.81C92.9821 36.97 92.4921 38.9 91.5121 40.6C90.5321 42.28 89.1521 43.6 87.3721 44.56C85.5921 45.52 83.4921 46 81.0721 46H73.7821ZM78.4321 41.95H81.1921C82.6521 41.95 83.9121 41.66 84.9721 41.08C86.0321 40.48 86.8521 39.65 87.4321 38.59C88.0321 37.51 88.3321 36.25 88.3321 34.81C88.3321 33.35 88.0321 32.09 87.4321 31.03C86.8521 29.97 86.0321 29.15 84.9721 28.57C83.9121 27.99 82.6521 27.7 81.1921 27.7H78.4321V41.95ZM95.9599 46V23.65H100.61V46H95.9599ZM104.573 46V23.65H119.603V27.7H109.223V32.77H119.003V36.82H109.223V41.95H119.603V46H104.573ZM126.259 46V27.7H120.589V23.65H136.489V27.7H130.909V46H126.259ZM144.582 46V36.25L137.142 23.65H142.452L147.852 33.13H145.962L151.332 23.65H156.642L149.232 36.22V46H144.582ZM163.232 31.122C162.38 31.122 161.6 30.912 160.892 30.492C160.196 30.072 159.638 29.514 159.218 28.818C158.81 28.11 158.606 27.336 158.606 26.496C158.606 25.632 158.81 24.852 159.218 24.156C159.638 23.46 160.196 22.908 160.892 22.5C161.6 22.092 162.38 21.888 163.232 21.888C163.868 21.888 164.462 22.008 165.014 22.248C165.566 22.476 166.052 22.8 166.472 23.22C166.892 23.64 167.222 24.132 167.462 24.696C167.702 25.248 167.822 25.848 167.822 26.496C167.822 27.336 167.618 28.11 167.21 28.818C166.802 29.514 166.25 30.072 165.554 30.492C164.858 30.912 164.084 31.122 163.232 31.122ZM163.232 29.772C163.832 29.772 164.378 29.628 164.87 29.34C165.362 29.04 165.752 28.644 166.04 28.152C166.34 27.648 166.49 27.096 166.49 26.496C166.49 25.884 166.34 25.332 166.04 24.84C165.74 24.336 165.344 23.94 164.852 23.652C164.36 23.352 163.82 23.202 163.232 23.202C162.62 23.202 162.062 23.352 161.558 23.652C161.066 23.952 160.67 24.354 160.37 24.858C160.082 25.35 159.938 25.896 159.938 26.496C159.938 27.108 160.082 27.666 160.37 28.17C160.67 28.662 161.072 29.052 161.576 29.34C162.08 29.628 162.632 29.772 163.232 29.772ZM161.198 28.944V24.048H163.412C163.94 24.048 164.378 24.18 164.726 24.444C165.086 24.696 165.266 25.116 165.266 25.704C165.266 26.1 165.17 26.412 164.978 26.64C164.798 26.868 164.582 27.048 164.33 27.18L165.32 28.944H163.808L162.908 27.306H162.638V28.944H161.198ZM162.638 26.118H163.448C163.58 26.118 163.682 26.076 163.754 25.992C163.838 25.908 163.88 25.806 163.88 25.686C163.88 25.554 163.838 25.452 163.754 25.38C163.682 25.296 163.58 25.254 163.448 25.254H162.638V26.118Z" fill="black"/>
                            <defs>
                                <clipPath id="clip0_4_411">
                                    <rect width="45" height="69" fill="white" transform="translate(6.80212 0.5)"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </div>
                <div className="Login-content">
                    <div className="Login-contentWrapper">
                        <h2 className="Login-title">Nos alegra verte de nuevo</h2>
                        <p className="Login-text">Introduce tus datos para acceder a tu cuenta</p>
                    </div>
                    <form ref={loginRef} className="Login-form">
                        <div className="Login-formGroup">
                            <label htmlFor="email" className="Login-label">Correo electrónico</label>
                            <input type="email" name="email" id='email' className="Login-input" />
                        </div>
                        <div className="Login-formGroup">
                            <label htmlFor="password" className="Login-label">Contraseña</label>
                            <input type="password" name="password" id='password' className="Login-input Login-inputPassword" />
                        </div>
                        <div className="Login-extras">
                            <div className="Login-checkbox">
                            <label className="container">Recuérdame
                            <input type="checkbox" onClick={handleChecked} />
                            <span className="checkmark"></span>
                            </label>
                            </div>
                            <a href="/forgot-password" className="Login-link">He olvidado mi contraseña</a>
                        </div>
                        <button onClick={handleLogin} className="Login-button">Iniciar Sesión</button>
                    </form>
                </div>
                <p className="Login-newAccount">
                    ¿Aún no tienes una cuenta? <a href="/register" className="Login-register">Regístrate ahora</a>
                </p>
            </div>
            <div className="Login-image">
            </div>
        </section>
    )
}
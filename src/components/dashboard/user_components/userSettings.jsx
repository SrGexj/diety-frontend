import { useContext, useRef } from "react"
import { userContext } from "../../../App"
import { MessageContext } from "../../messages/Messages"

export const UserSettings = () => {

    const updateUserRef = useRef(null)

    const { showMessage } = useContext(MessageContext)

    const { currentUser } = useContext(userContext)

    const { VITE_API } = import.meta.env


    const updateUser = async (e) => {
        e.preventDefault()
        const { username, email, password, passwordConfirm } = updateUserRef.current

        if (password.value !== passwordConfirm.value) {
            showMessage('Las contraseñas no coinciden', 'error')
            return 
        }
        if (password.value === '') {
            showMessage('La contraseña no puede estar vacía', 'error')
            return
        }

            const updatedUserData = {
                username: username.value,
                password: password.value
            }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUserData)
        }
        console.log(`${VITE_API}/users/${currentUser._id}`)

        const response = await fetch(`${VITE_API}/users/${currentUser._id}`, options)
        const data = await response.json()

        if (data.success === true) {
            showMessage(data.message)
            console.log('Usuario actualizado')
        } else {
            showMessage(data.message, 'error')
        }
        if (data.status === 404) {
            showMessage(data.message, 'error')
        }
    }

    return (
        <>
            <h2 className="Dashboard-title">Configuración de usuario</h2>
            <p className="Dashboard-subtitle">En esta sección puedes modificar tus datos personales</p>
            <form ref={updateUserRef} className="Form Form">
                <div className="Form-group">
                    <label className="Form-label" htmlFor="username">Nombre de usuario</label>
                    <input className="Form-input" type="text" id="username" name="username" placeholder={currentUser.username} />
                </div>
                <div className="Form-group">
                    <label className="Form-label" htmlFor="email">Correo electrónico
                        <span className="Form-info">
                            Si deseas cambiar tu correo electrónico, por favor contacta al administrador
                        </span>
                    </label>
                    <input className="Form-input" type="email" id="email" name="email" value={currentUser.email} disabled />
                </div>
                <div className="Form-group">
                    <label className="Form-label" htmlFor="password">Contraseña</label>
                    <input className="Form-input" type="password" id="password" name="password" />
                </div>
                <div className="Form-group">
                    <label className="Form-label" htmlFor="password-confirm">Confirmar contraseña</label>
                    <input className="Form-input" type="password" id="password-confirm" name="passwordConfirm" />
                </div>
                <button onClick={updateUser} className="Form-button">Guardar cambios</button>
            </form>

        </>
    )
}
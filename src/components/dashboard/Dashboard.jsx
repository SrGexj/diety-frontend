
import { useEffect, useState } from "react"


export const Dashboard = () => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getParsedUserData = JSON.parse(localStorage.getItem('userData')) || JSON.parse(sessionStorage.getItem('userData'))
        setUserData(getParsedUserData)
    }, [])
    
    return(
            <div className="Dashboard">
                <aside className="Dashboard-menu">
                    <div className="Dashboard-logo"></div>
                    <nav className="Dashboard-nav">
                        <ul className="Dashboard-list">
                            <li className="Dashboard-item">
                                <a href="#" className="Dashboard-link">General</a>
                            </li>
                            <li className="Dashboard-item">
                                <a href="#" className="Dashboard-link">Mis dietas</a>
                            </li>
                            <li className="Dashboard-item">
                                <a href="#" className="Dashboard-link">Mis recetas</a>
                            </li>
                            <li className="Dashboard-item">
                                <a href="#" className="Dashboard-link">Añadir recetas</a>
                            </li>
                            <li className="Dashboard-item">
                                <a href="#" className="Dashboard-link">Guardado</a>
                            </li>
                            <li className="Dashboard-item">
                                <a href="#" className="Dashboard-link">Ajustes de la cuenta</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="Dashboard-user">
                    { userData &&
                        <div className="Dashboard-userContent">
                            <div className="Dashboard-userAvatar"></div>
                            <p className="Dashboard-userName">{userData.username}</p>
                            <p className="Dashboard-userEmail">{userData.email}</p>
                        </div>
                    }
                    </div>
                </aside>
            </div>
    )
}
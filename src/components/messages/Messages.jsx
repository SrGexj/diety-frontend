import React, { createContext, useContext, useState, useEffect } from 'react'

// Contexto para manejar mensajes
export const MessageContext = createContext()

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([])

    const showMessage = (msg, type = 'success') => {
        const id = Date.now()
        const newMessage = { id, msg, type, isActive: false }
        setMessages(prev => [...prev, newMessage])

        // Activar animación después de renderizar
        setTimeout(() => {
            setMessages(prev => prev.map(m => m.id === id ? { ...m, isActive: true } : m))
        }, 100)

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            setMessages(prev => prev.map(m => m.id === id ? { ...m, isActive: false } : m))
        }, 5000)

        // Eliminar mensaje tras completar la animación de salida
        setTimeout(() => {
            setMessages(prev => prev.filter(m => m.id !== id))
        }, 5500)
    }
    
    // Detectamos el ancho de los mensajes y creamos una variable de CSS para usarla en el archivo de estilos
    useEffect(() => {
        const messageContainer = document.querySelector('.message-container')
        if (messageContainer) {
            document.documentElement.style.setProperty('--message-width', `${messageContainer.offsetWidth}px`)
        }
    }, [messages])

    return (
        // Proporcionar el contexto y la función showMessage a los componentes hijos
        <MessageContext.Provider value={{ showMessage }}>
            {children}
            <MessageDisplay messages={messages} />
        </MessageContext.Provider>
    )
    
}
// Componente para mostrar mensajes 
const MessageDisplay = ({ messages }) => {
    return (
        <div className="message-container">
            {messages.map(message => (
                <div key={message.id} className={`message message-${message.type} ${message.isActive ? 'active' : ''}`}>
                    <span className={`icon icon-${message.type}`}></span>
                    {message.msg}
                </div>
            ))}
        </div>
    )
}

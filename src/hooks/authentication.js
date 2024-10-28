import React, {createContext, useContext, useEffect, useState} from 'react';


// Creamos el contexto
const AuthContext = createContext();

// Provider del contexto
export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    // Función para actualizar el estado (ej. llamado cuando hay login/logout)
    const login = (name, pass) => {
        setUsername(name);
        setPassword(pass);
        console.log("Username:", username);
        console.log("Password:", password);
        setIsLoggedIn(true);
    };
    const logout = () => setIsLoggedIn(false);

    useEffect(() => {
        // Simulación de una autenticación inicial
        const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(userLoggedIn);
    }, []);

    // Escucha en tiempo real
    useEffect(() => {
        const handleAuthChange = (event) => {
            if (event.key === 'isLoggedIn') {
                setIsLoggedIn(event.newValue === 'true');
            }
        };

        window.addEventListener('storage', handleAuthChange);

        return () => {
            window.removeEventListener('storage', handleAuthChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};

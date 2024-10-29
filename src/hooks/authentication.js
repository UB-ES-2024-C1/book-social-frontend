import React, {createContext, useContext, useEffect, useState} from 'react';
import api from '../services/api';

// Creamos el contexto
const AuthContext = createContext();

// Provider del contexto
export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    // Función para actualizar el estado (ej. llamado cuando hay login/logout)
    const login = async (name, pass) => {
        setUsername(name);
        setPassword(pass);
        // console.log("Username:", username);
        // console.log("Password:", password);
        const response = await api.post('/auth/login', {"username": name, "password": pass});
        console.log("Response:", response);
        if (response.status === 200) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };
    const logout = () => setIsLoggedIn(false);

    const signIn = async (firstName, lastName, username, email, pass, genre, personType) => {
        const response = await api.post('/auth/register', {
            firstName,
            lastName,
            username,
            email,
            password: pass,
            genre,
            personType
        });
        console.log("Response:", response);
        if (response.status === 201) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };

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
        <AuthContext.Provider value={{isLoggedIn, login, logout, signIn}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};
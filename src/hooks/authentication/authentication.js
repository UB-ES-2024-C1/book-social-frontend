import React, {createContext, useContext, useEffect, useState} from 'react';
import api from '../../services/api';

// Creamos el contexto
const AuthContext = createContext();

// Provider del contexto
export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);

    // Función para actualizar el estado (ej. llamado cuando hay login/logout)
    const login = async (name, pass) => {
        try {
            const payload = {
                email: name, password: pass
            };
            //console.log("payload", payload);
            const response = await api.post('/auth/login', {email: name, password: pass});
            if (response.status === 200) {
                const {token} = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('isLoggedIn', 'true');
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                setError(`Error on try to login: ${response.data.message}`);
            }
        } catch (error) {
            if (error.isAxiosError) {
                const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
                setError(`Error on try to login: ${errorMessage}`);
            } else {
                setError('An unexpected error occurred.');
            }
            setIsLoggedIn(false);
        }
    };

    // Maneja el logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    // Maneja el registro de un usuario
    const signIn = async (firstName, username, email, pass, genre, personType) => {
        try {
            const payload = {
                firstName,
                lastName: "lastname",
                username,
                email,
                password: pass,
                genre: genre,
                role: personType
            };
            console.log("payload", payload);
            const response = await api.post('/auth/register', payload);

            if (response.status === 201) {
                setIsLoggedIn(true);
                await login(email, pass);
            } else {
                setError(`Error on try to register: ${response.data.message}`);
            }
        } catch (error) {
            if (error.isAxiosError) {
                const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
                setError(`Error on try to register: ${errorMessage}`);
            } else {
                setError('An unexpected error occurred.');
            }
            setIsLoggedIn(false);
        }
    };

    // Verifica si el usuario está autenticado al cargar la app
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Opcional: Validar token con el backend
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    // Escucha en tiempo real cambios en el almacenamiento local
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        const handleAuthChange = (event) => {
            if (event.key === 'isLoggedIn' && event.newValue !== null) {
                setIsLoggedIn(event.newValue === 'true');
            }
            if (event.key === 'token' && event.newValue === null) {
                setIsLoggedIn(false);
            }
        };

        window.addEventListener('storage', handleAuthChange);

        return () => {
            window.removeEventListener('storage', handleAuthChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, signIn, error}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

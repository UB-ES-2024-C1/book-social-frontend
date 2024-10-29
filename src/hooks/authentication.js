import React, {createContext, useContext, useEffect, useState} from 'react';


// Creamos el contexto
const AuthContext = createContext();

// Provider del contexto
export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setRepeatPassword] = useState('');
    const [genre, setGenre] = useState('');
    const [person, setPerson] = useState('');


    // Función para actualizar el estado (ej. llamado cuando hay login/logout)
    const login = (name, pass) => {
        setUsername(name);
        setPassword(pass);
        console.log("Username:", username);
        console.log("Password:", password);
        setIsLoggedIn(true);
    };

    const signIn = (firstname, user, em, password, pass2, gen, type) => {
        setName(name);
        setUsername(username);
        setEmail(email);
        setPassword(password);
        setRepeatPassword(password2);
        setGenre(genre);
        setPerson(person);
        console.log("Name:", firstname);
        console.log("Email:", em);
        console.log("Username:", user);
        console.log("Password:", password);
        console.log("Repeat password:", pass2)
        console.log("Genre:", gen);
        console.log("Person:", type);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    }

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
        <AuthContext.Provider value={{isLoggedIn, login, signIn, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};

// src/components/ProtectedRoute.js
import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../hooks/authentication';

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace/>; // Goes to the landing page if user is not authenticated
    }

    return children;
};

export default ProtectedRoute;

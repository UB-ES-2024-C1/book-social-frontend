import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://booksocial-dev-development.up.railway.app/'
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Asegúrate de incluir estos encabezados en todas las solicitudes
    config.headers['accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';

    return config;
});

export default api;

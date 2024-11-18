import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://booksocial-dev-development.up.railway.app/'
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

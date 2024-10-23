import axios from 'axios';
import { desencriptar } from './utils.js';
import { API_URL, secretKey } from './config.js';

const api = axios.create({
    baseURL: API_URL,
});

// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Descifra el token
            const decryptedToken = desencriptar(token, secretKey);
            config.headers['x-access-token'] = `${decryptedToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/*
// Funciones de acceso a la base de datos
export const getUser = async(userId) => {
    try {
        const response = await api.get(`user/${userId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getLotesCampo = async(farmId) => {
    try {
        const response = await api.get(`map/getFarm/${farmId}`);

        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

*/
export default api;
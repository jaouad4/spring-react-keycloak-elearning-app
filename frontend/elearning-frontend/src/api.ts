import axios from 'axios';
import { keycloak } from './keycloak';

const api = axios.create({
    baseURL: 'http://localhost:8081'
});

api.interceptors.request.use(async (config) => {
    if (keycloak.authenticated) {
        await keycloak.updateToken(20);

        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
});

export default api;
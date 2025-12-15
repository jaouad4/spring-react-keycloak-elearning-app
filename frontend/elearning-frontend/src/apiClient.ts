import axios from "axios";
import { keycloak } from "./keycloak";

export const apiClient = axios.create({
    baseURL: "http://localhost:8081",
    timeout: 15000,
});

// 1) Avant chaque requête: refresh si besoin + ajoute Authorization
apiClient.interceptors.request.use(async (config) => {
    if (!keycloak.authenticated) {
        // si pas authentifié, on laisse passer: la réponse sera 401 et sera gérée plus bas
        return config;
    }

    // refresh si le token expire bientôt
    await keycloak.updateToken(20);

    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${keycloak.token}`;
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error?.response?.status;

        if (status === 401) {
            // Session expirée ou token invalide: on force la reconnexion
            try {
                keycloak.clearToken();
                await keycloak.login();
            } catch {
                // si login échoue, on laisse remonter
            }
        }

        // 403: pas de login, juste signaler "rôle insuffisant"
        return Promise.reject(error);
    }
);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { keycloak } from './keycloak';
import api from './api';

export async function fetchUserInfo(): Promise<any> {
    const res = await fetch(
        `http://localhost:8080/realms/elearning-realm/protocol/openid-connect/userinfo`,
        { headers: { Authorization: `Bearer ${keycloak.token}` } }
    );
    return res.json();
}

export async function fetchClaims(): Promise<any> {
    const res = await api.get('/courses/me');
    return res.data;
}

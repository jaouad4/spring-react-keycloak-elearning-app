/* eslint-disable @typescript-eslint/no-explicit-any */
export function hasRole(claims: any, role: string): boolean {
    const roles: string[] = claims?.realm_access?.roles ?? [];
    return roles.includes(role);
}

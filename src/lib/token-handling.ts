import { UserData } from '@/types/context';

export function getUserDataFromToken(jwt: string): UserData | undefined {
    const [, payloadStr] = jwt.split('.');
    if (!payloadStr) {
        return;
    }

    try {
        const payloadDecoded = atob(payloadStr);
        const payload = JSON.parse(payloadDecoded);
        const { azp, resource_access } = payload;

        return {
            username: payload.preferred_username,
            roles: resource_access[azp]?.roles || [],
        } as UserData;
    } catch (error) {
        console.error('Ungültiges Token:', error);
        return undefined;
    }
}

export function removeToken(): void {
    sessionStorage.clear();
}

export function getToken(): string | null {
    return sessionStorage.getItem('access_token');
}

export function getUserData(): Partial<UserData> {
    const token = getToken();
    if (!token) {
        return {};
    }

    const userData = getUserDataFromToken(token);
    return userData || {};
}
export function setToken(accessToken: string): void {
    sessionStorage.setItem('access_token', accessToken);
}

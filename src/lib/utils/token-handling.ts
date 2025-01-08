import { UserData } from '@/types/context';

/**
 * Extrahiert Nutzerdaten aus einem JWT.
 * Falls das Extrahieren fehlschlägt wird undefined zurückgegeben.
 *
 * @param jwt Token mit Nutzerdaten
 * @returns Nutzerdaten, oder undefined
 */
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
        console.error('Ungültiges Token: ', error);
        return undefined;
    }
}

/**
 * Entfernt das Access Token
 */
export function removeToken(): void {
    sessionStorage.clear();
}

/**
 * Gibt das Access Token heraus.
 * Falls keins existiert wird null herausgegeben
 *
 * @returns Access Token als string, oder null
 */
export function getToken(): string | null {
    return sessionStorage.getItem('access_token');
}

/**
 * Gibt Nutzerdaten des aktuell angemeldeten Nutzers heraus.
 * Falls kein Nutzer angemeldet ist, wird ein leeres Objekt herausgegeben.
 *
 * @returns Nutzerdaten oder leeres Objekt
 */
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

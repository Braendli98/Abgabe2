import { UserData } from '@/types/context';

export function getUserDataFromToken(jwt: string) {
    const [, payloadStr] = (jwt as string).split('.');
    if (payloadStr === undefined) {
        return;
    }
    const payloadDecoded = atob(payloadStr);
    const payload = JSON.parse(payloadDecoded);
    const { azp, resource_access } = payload;

    return {
        username: payload.preferred_username,
        roles: resource_access[azp].roles,
    } as UserData;
}

export function removeToken() {
    sessionStorage.clear();
}

export function getToken() {
    return sessionStorage.getItem('access_token');
}

export function getUserData() {
    const token = getToken();
    if (token === undefined || token === null) {
        return {};
    }

    const userData = getUserDataFromToken(token);
    if (userData === undefined) {
        return {};
    }

    return userData;
}

export function setToken(accessToken: string) {
    sessionStorage.setItem('access_token', accessToken);
}

// function getExpiryDate(expiresIn: string) {
//     return new Date(
//         Date.now() + Number.parseInt(expiresIn.toString(), 10) * 1000,
//     ).toUTCString();
// }

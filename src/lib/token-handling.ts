import Cookies from 'js-cookie';
import { UserData } from "@/types/context";

export function getUserDataFromToken(jwt: string) {
    const [, payloadStr] = (jwt as string).split('.');
    if (payloadStr === undefined) {
        return;
    }
    const payloadDecoded = atob(payloadStr);
    const payload = JSON.parse(payloadDecoded);
    const { azp, resource_access } = payload;
    console.log(payload);

    return {
        username: payload.preferred_username,
        roles: resource_access[azp].roles,
    } as UserData;
}

export function removeToken() {
    Cookies.remove('access_token');
}

export function getToken() {
    return Cookies.get('access_token');
}

export function getUserData() {
    const token = getToken();
    if(token === undefined) {
        return {};
    }

    const userData = getUserDataFromToken(token);
    if(userData === undefined) {
        return {};
    }
    
    return userData;
}

export function setToken(access_token: string, expires_in: string) {
    Cookies.set('access_token', access_token, { secure: true, expires: getExpiryDate(expires_in)});
}

function getExpiryDate(expires_in: string) {
    return new Date(
            Date.now() +
                Number.parseInt(expires_in.toString(), 10) * 1000,
        );
}

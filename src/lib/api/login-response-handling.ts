import { AlertType, LoginData } from '@/types/login';
import { getUserDataFromToken, setToken } from '../utils/token-handling';

import { AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router';
import { UserData } from '@/types/context';

/**
 * Extrahiert Nutzerdaten aus einem erhaltenen Accesstoken, setzt Token und Nutzerdaten, 
 * cleared nicht mehr benötigte Daten, navigiert zur Callback-URI und erstellt einen Toast mit Nutzernamen.
 * 
 * @param response Antwort vom Backend
 * @param setAlert Funktion die Fehlermeldungstyp für Login setzt
 * @param setUser Funktion die aktuellen Nutzer setzt
 * @param setLogin Funktion die Logindaten setzt
 * @param toast Funktion die einen Toast erstellt
 * @param navigate Funktion die zu einer gegeben URI navigiert
 * @param callback URI für Callback
 */
export function handleSuccess(
    response: AxiosResponse,
    setAlert: React.Dispatch<React.SetStateAction<AlertType>>,
    setUser: React.Dispatch<React.SetStateAction<UserData>>,
    setLogin: React.Dispatch<React.SetStateAction<LoginData>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast: any,
    navigate: NavigateFunction,
    callback: string,
) {
    const userData = getUserDataFromToken(response.data.access_token);
    if (userData === undefined) {
        setAlert('unexpected');
        return;
    }
    setToken(response.data.access_token);
    setUser(userData);
    setLogin({});
    setAlert('none');
    navigate(callback);
    toast({
        variant: 'success',
        description: `Du bist jetzt als ${userData.username} angemeldet.`,
    });
}

/**
 * Funktion die eine Fehlermeldung für den Login anhand vom Fehlertyp erstellt.
 * 
 * @param response Antwort vom Backend
 * @param setAlert Funktion die Fehlermeldungstyp für Login setzt
 */
export function handleFailure(
    response: AxiosResponse,
    setAlert: React.Dispatch<React.SetStateAction<AlertType>>,
) {
    switch (response.status) {
        case 401:
        case 403: {
            setAlert('unauthorized');
            break;
        }
        case 500: {
            setAlert('internal');
            break;
        }
        default: {
            setAlert('unexpected');
        }
    }
}

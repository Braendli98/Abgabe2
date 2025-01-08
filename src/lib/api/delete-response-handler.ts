import { AxiosResponse } from 'axios';
import { Buch } from '@/types/buch';
import { NavigateFunction } from 'react-router';

type ResponseType = 'unauthorized' | 'internal' | 'unexpected';

/**
 * Funktion die einen Toast mit dem Namen des gelöschten Buchs erstellt, und zur Startseite navigiert.
 * 
  * @param toast Funktion die einen Toast erstellt
 * @param navigate Funktion die zu einer gegeben URI navigiert
 * @param book Gelöschtes Buch
 */
export function handleSuccess(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast: any,
    navigate: NavigateFunction,
    book?: Buch,
) {
    toast({
        variant: 'success',
        title: 'Erfolg!',
        description: `Buch ${book?.titel.titel} mit der Id ${book?.id} wurde gelöscht!`,
    });
    navigate('/', { state: { refresh: true } });
}

/**
 * Funktion die einen Toast mit vom Fehlerfall abhängiger Nachricht erstellt.
 * 
 * @param response Antwort vom Backend
 * @param toast Funktion die einen Toast erstellt
 */
export function handleFailure(
    response: AxiosResponse,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast: any,
) {
    const responseType: ResponseType = getResponseType(response.status);

    toast({
        variant: 'failure',
        title: 'Fehler!',
        description: getToastDescription(responseType),
    });
}

// Gibt einen ResponseType abhängig vom Statuscode zurück
function getResponseType(status: number): ResponseType {
    switch (status) {
        case 401:
        case 403:
            return 'unauthorized';
        case 500:
            return 'internal';
        default:
            return 'unexpected';
    }
}

// Gibt zu einem Fehlerfall passende Nachricht zurück
function getToastDescription(
    errorType: ResponseType,
) {
    switch (errorType) {
        case 'unauthorized':
            return 'Sie haben nicht die erforderlichen Berechtigungen!';
        case 'internal':
            return 'Ein interner Serverfehler ist aufgetreten!';
        case 'unexpected':
        default:
            return 'Es ist ein unerwarteter Fehler aufgetreten!';
    }
}

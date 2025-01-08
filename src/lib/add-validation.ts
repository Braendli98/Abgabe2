import { Buch } from '@/types/buch';
import { NavigateFunction } from 'react-router';

export function handleSuccess(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast: any,
    navigate: NavigateFunction,
    book?: Buch,
) {
    toast({
        variant: 'success',
        title: 'Erfolg!',
        description: `Buch ${book?.titel.titel} wurde erfolgreich angelegt!`,
    });
    navigate('/', { state: { refresh: true } });
}

export function handleFailure(
    status: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast: any,
) {
    let responseType: 'unauthorized' | 'internal' | 'unexpected';
    switch (status) {
        case 401:
        case 403:
            responseType = 'unauthorized';
            break;
        case 500:
            responseType = 'internal';
            break;
        default:
            responseType = 'unexpected';
    }

    toast({
        variant: 'failure',
        title: 'Fehler!',
        description: getToastDescription(responseType),
    });
}

function getToastDescription(errorType: 'unauthorized' | 'internal' | 'unexpected') {
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
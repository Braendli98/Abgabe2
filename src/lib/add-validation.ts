import { AxiosResponse } from 'axios';
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
    response: AxiosResponse,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast: any,
) {
    let responseType: 'badRequest' | 'isbn' | 'unauthorized' | 'internal' | 'unexpected';
    switch (response.status) {
        case 400:
            if(response.data.message[0] === 'isbn must be an ISBN') {
                responseType = "isbn";
                break;
            }
            responseType ="badRequest";
            break;
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

    console.log(response);

    toast({
        variant: 'failure',
        title: 'Fehler!',
        description: getToastDescription(responseType),
    });
}

function getToastDescription(
    errorType: 'badRequest' | 'isbn' | 'unauthorized' | 'internal' | 'unexpected',
) {
    switch (errorType) {
        case 'badRequest':
            return 'Ein Eingabefehler ist aufgetreten!';
        case 'isbn':
            return 'Die eingegebene ISBN ist ungültig!';
        case 'unauthorized':
            return 'Sie haben nicht die erforderlichen Berechtigungen!';
        case 'internal':
            return 'Ein interner Serverfehler ist aufgetreten!';
        case 'unexpected':
        default:
            return 'Es ist ein unerwarteter Fehler aufgetreten!';
    }
}


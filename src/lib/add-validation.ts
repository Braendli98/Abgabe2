import { Buch } from '@/types/buch';
import { NavigateFunction } from 'react-router';
import { ResType } from '@/types/details';

export async function handleResponse(
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast: any,
    navigate: NavigateFunction,
    book?: Buch,
) {
    let responseType: ResType;
    switch (response.status) {
        case 201: {
            responseType = 'success';
            break;
        }
        case 401:
        case 403: {
            responseType = 'unauthorized';
            break;
        }
        case 500: {
            responseType = 'internal';
            break;
        }
        default: {
            responseType = 'unexpected';
        }
    }
    toast(getToastProps(responseType, book?.titel.titel));
    if (responseType === 'success') {
        navigate('/', { state: { refresh: true } });
    }
}

function getToastProps(resType?: ResType, title?: string) {
    return {
        variant: resType === 'success' ? 'success' : 'failure',
        title: resType === 'success' ? 'Erfolg!' : 'Fehler!',
        description: getToastDescription(resType, title),
    };
}

function getToastDescription(resType?: ResType, title?: string) {
    switch (resType) {
        case 'success': {
            return `Buch ${title} wurde erfolgreich angelegt!`;
        }
        case 'unauthorized': {
            return 'Sie haben nicht die erforderlichen Berechtigungen!';
        }
        default: {
            return 'Es ist ein unerwarteter Fehler aufgetreten!';
        }
    }
}

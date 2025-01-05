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
        description: `Buch ${book?.titel.titel} mit der Id ${book?.id} wurde gelöscht!`,
    });
    navigate('/', { state: { refresh: true } });
}

export function handleFailure(
    status: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast: any,
) {
    let responseType: string;
    switch (status) {
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
    toast({
        variant: 'failure',
        title: 'Fehler!',
        description: getToastDescription(responseType === 'unauthorized'),
    });
}

function getToastDescription(unauthorized: boolean) {
    return unauthorized
        ? 'Sie haben nicht die erforderlichen Berechtigungen!'
        : 'Es ist ein unerwarteter Fehler aufgetreten!';
}

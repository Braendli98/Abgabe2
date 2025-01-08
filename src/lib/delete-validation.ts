import { Buch } from '@/types/buch';
import { NavigateFunction } from 'react-router';

type ResponseType = 'unauthorized' | 'internal' | 'unexpected';

export function handleSuccess(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast: any,
    navigate: NavigateFunction,
    buch?: Buch,
) {
    toast({
        variant: 'success',
        title: 'Erfolg!',
        description: `Buch ${buch?.titel.titel} mit der Id ${buch?.id} wurde gelöscht!`,
    });
    navigate('/', { state: { refresh: true } });
}

export function handleFailure(
    status: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast: any,
) {
    const responseType: ResponseType = getResponseType(status);

    toast({
        variant: 'failure',
        title: 'Fehler!',
        description: getToastDescription(responseType),
    });
}

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

function getToastDescription(responseType: ResponseType): string {
    const beschreibungen: Record<ResponseType, string> = {
        unauthorized: 'Sie haben nicht die erforderlichen Berechtigungen!',
        internal: 'Ein interner Serverfehler ist aufgetreten!',
        unexpected: 'Es ist ein unerwarteter Fehler aufgetreten!',
    };

    return beschreibungen[responseType];
}

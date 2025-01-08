import { AxiosResponse } from 'axios';
import { Buch } from '@/types/buch';

export function handleSuccess(
    response: AxiosResponse,
    setBooks: React.Dispatch<React.SetStateAction<Buch[]>>,
) {
    setBooks(response.data._embedded?.buecher ?? []);
}

export function handleFailure(
    status: number,
    setBooks: React.Dispatch<React.SetStateAction<Buch[]>>,
    setFailureText: React.Dispatch<React.SetStateAction<string>>,
) {
    setBooks([]);
    switch (status) {
        case 404: {
            setFailureText('Es wurden keine Bücher gefunden.');
            break;
        }
        case 401:
        case 403: {
            setFailureText(
                'Sie haben nicht die erforderlichen Berechtigungen.',
            );
            break;
        }
        default: {
            setFailureText('Ein unerwarteter Fehler ist aufgetreten.');
        }
    }
}

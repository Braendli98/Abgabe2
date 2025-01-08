import { AxiosResponse } from 'axios';
import { Buch } from '@/types/buch';

/**
 * Funktion die vom Backend erhaltene Bücher in den State setzt.
 * 
 * @param response Antwort vom Backend
 * @param setBooks Funktion die Bücher in den State setzt
 */
export function handleSuccess(
    response: AxiosResponse,
    setBooks: React.Dispatch<React.SetStateAction<Buch[]>>,
) {
    setBooks(response.data._embedded?.buecher ?? []);
}

/**
 * Funktion die eine Fehlermeldung für die Übersicht anhand vom Fehlertyp erstellt.
 * 
 * @param response Antwort vom Backend
 * @param setBooks Funktion die Bücher in den State setzt
 * @param setFailureText Funktion die Fehlermeldung für Übersicht setzt
 */
export function handleFailure(
    response: AxiosResponse,
    setBooks: React.Dispatch<React.SetStateAction<Buch[]>>,
    setFailureText: React.Dispatch<React.SetStateAction<string>>,
) {
    setBooks([]);
    switch (response.status) {
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

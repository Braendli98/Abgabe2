import { Alert, AlertDescription, AlertTitle } from '../shadcn-ui/alert';

import { AlertCircle } from 'lucide-react';
import { AlertType } from '@/types/login';

/**
 * Rendert Fehlermeldung, die dem Nutzer bei einem fehlgeschlagenen Login angezeigt wird.
 * Abhängig von der Fehlerursache wird eine andere Fehlermeldung angezeigt.
 * 
 * @param param0 
 * @returns Fehlermeldungs Komponente
 */
export default function LoginAlert({
    alertType,
}: Readonly<{
    alertType: Omit<AlertType, 'none'>;
}>) {
    let message = '';
    switch (alertType) {
        case 'internal':
        case 'unexpected': {
            message = 'Beim Login ist ein unerwarteter Fehler aufgetreten!';
            break;
        }
        case 'unauthorized': {
            message =
                'Username/Password ungültig! Bitte versuchen sie es erneut!';
            break;
        }
    }

    return (
        <Alert variant="destructive" data-cy="login-alert">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Fehler!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}

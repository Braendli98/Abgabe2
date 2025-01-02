import { Alert, AlertDescription, AlertTitle } from '../shadcn-ui/alert';

import { AlertCircle } from 'lucide-react';
import { AlertType } from '@/types/login';

export default function LoginAlert({
    alertType,
}: {
    alertType: Omit<AlertType, 'none'>;
}) {
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

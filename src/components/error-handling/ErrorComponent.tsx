import { Button } from '../shadcn-ui/button';
import { useNavigate } from 'react-router';

interface ApplicationError {
    type: 'notFound' | 'unexpected';
}

/**
 * Rendert eine Fehlerkomponente.
 * Abhängig vom aufgetretenen Fehler wird die Komponente als *Not Found* oder *Internal Error* dargestellt.
 *
 * @param props *ApplicationError* mit `type` für den Fehlertyp
 * @returns Fehlerkomponente
 */
export default function ErrorComponent({ type }: Readonly<ApplicationError>) {
    const navigate = useNavigate();

    const errorMessage =
        type === 'notFound'
            ? 'Die gesuchte Seite konnte leider nicht gefunden werden.'
            : 'Es ist ein unerwarteter Fehler aufgetreten.';

    return (
        <div className="flex justify-center items-center h-screen bg-backgroundColor">
            <div className="grid w-8/12 md:w-full flex-item max-w-sm items-center gap-1.5">
                <strong className="text-9xl text-center mb-10">
                    <span style={{ color: 'red' }}>
                        {type === 'notFound' ? 4 : 5}
                    </span>
                    <span
                        style={{ color: 'red' }}
                        className="display-1 fw-bold"
                    >
                        0
                    </span>
                    <span
                        style={{ color: 'red' }}
                        className="display-1 fw-bold"
                    >
                        {type === 'notFound' ? 4 : 0}
                    </span>
                </strong>
                <span className="text-xl text-center">{errorMessage}</span>
                <Button
                    className="flex-item mt-4 bg-mainColor bg-opacity-60 text-white"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    Zur Startseite
                </Button>
            </div>
        </div>
    );
}

import { apiDelete, apiGet } from '@/lib/api/api-handler';
import { handleFailure, handleSuccess } from '@/lib/api/delete-response-handler';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { AxiosResponse } from 'axios';
import BookCover from '../common/BookCover';
import Breadcrumbs from '../common/Breadcrumbs';
import { Buch } from '@/types/buch';
import { Button } from '../shadcn-ui/button';
import StarRating from '../common/StarRating';
import { Trash2 } from 'lucide-react';
import { getBreadcrumbComponents } from '@/lib/utils/breadcrumb-utils';
import { hasRemoveRights } from '@/lib/utils/role-utils';
import { useAppContext } from '@/hooks/use-context';
import { useToast } from '@/hooks/use-toast';

/**
 * Rendert eine Komponente, die die Daten eines einzelnen Buchs anzeigt.
 * 
 * @returns Buchdetails
 */
export default function Details() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useAppContext();
    const [book, setBook] = useState<Buch | undefined>(undefined);
    const params = useParams();

    // Reacthook um Buchdaten anhand der ID aus Pfadparametern zu laden
    useEffect(() => {
        const fetchData = async () => {
            apiGet(
                `api/rest/${params.bookId}`,
                (response: AxiosResponse) =>
                    setBook({ ...response.data, id: params.bookId }),
                () => {
                    setBook(undefined);
                },
            );
        };
        fetchData();
    }, [params]);

    // Funktion um Buch anhand der ID zu löschen
    const deleteEntry = () => {
        apiDelete(
            `api/rest/${params.bookId}`,
            () => handleSuccess(toast, navigate, book),
            (response: AxiosResponse) => handleFailure(response, toast),
            {
                noCache: false,
                token: true,
            },
        );
    };

    // Fallback falls keine Buchdaten gefunden wurden
    if (book === undefined) {
        return (
            <div className="text-2xl text-center mt-8">
                Keine Buchdaten verfügbar
            </div>
        );
    }
    
    return (
        <div className="content max-w-screen-lg mx-auto">
            <Breadcrumbs path={getBreadcrumbComponents(`details/${book.id}`)} />

            {/* Buchdetails */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 border rounded-lg shadow-lg p-12 bg-white">
                {/* Bild des Buches */}
                <div className="flex justify-center items-start">
                    <BookCover book={book} size="large" />
                </div>

                {/* Buchinformationen */}
                <div className="space-y-6 text-xl">
                    <h2 className="text-5xl font-extrabold">
                        {book?.titel?.titel || 'Unbekannter Titel'}
                    </h2>
                    <p className="text-2xl text-gray-600 font-medium">
                        {book?.titel?.untertitel || 'Kein Untertitel'}
                    </p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <div className="col-span-2 md:col-span-1">
                            <strong>ISBN:</strong>{' '}
                            {book?.isbn || 'Nicht verfügbar'}
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <strong>Art:</strong> {book?.art || 'Unbekannt'}
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <strong>Preis:</strong>{' '}
                            {book?.preis
                                ? `${book.preis} €`
                                : 'Nicht verfügbar'}
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <strong>Lieferbar:</strong>{' '}
                            {book?.lieferbar ? 'Ja' : 'Nein'}
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <strong>Rabatt:</strong>{' '}
                            {book?.rabatt ? (book.rabatt * 100).toFixed(1) : 0}{' '}
                            %
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <strong>Erscheinungsdatum:</strong>{' '}
                            {book?.datum || 'Nicht verfügbar'}
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <strong>Rating:</strong>{' '}
                            {book?.rating ? (
                                <StarRating rating={book.rating} />
                            ) : (
                                'Kein Rating'
                            )}
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <strong>Schlagwörter:</strong>{' '}
                            {book?.schlagwoerter?.join(', ') || 'Keine'}
                        </div>
                    </div>
                    {/* Button zum Löschen des Buches. Wird nur bei vorhandener Nutzerrolle angezeigt */}
                    {hasRemoveRights(user) && (
                        <div className="flex flex-row-reverse">
                            <Button
                                variant="destructive"
                                className="flex-item"
                                onClick={() => {
                                    deleteEntry();
                                }}
                            >
                                <Trash2 />
                                <span className="text-lg md:text-base">
                                    Buch Löschen
                                </span>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

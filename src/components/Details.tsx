import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './ui/breadcrumb';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Buch } from '@/types/buch';
import { Button } from './ui/button';
import { handleResponse } from '@/lib/delete-validation';
import { useAppContext } from './Context';
import { useToast } from '@/hooks/use-toast';

export default function Details() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useAppContext();
    const [book, setBook] = useState<Buch | undefined>(undefined);
    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(params.bookId);
                const response = await fetch(`api/rest/${params.bookId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const book = await response.json();
                // Debugging
                console.log(book);
                setBook({ ...book, id: params.bookId });
            } catch (error) {
                console.error('Fehler beim Laden der Buchdaten:', error);
            }
        };

        fetchData();
    }, [params]);

    const deleteEntry = async () => {
        try {
            console.log(params.bookId);
            const response = await fetch(`api/rest/${params.bookId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'If-Match': `"0"`, // Header für Optimistic Locking
                },
            });
            await handleResponse(response, toast, navigate, book);
        } catch (error) {
            console.error('Fehler beim Löschen der Buchdaten:', error);
        }
    };

    if (book === undefined) {
        return (
            <div className="text-2xl text-center mt-8">
                Keine Buchdaten verfügbar
            </div>
        );
    }

    return (
        <div className="content max-w-screen-lg mx-auto">
            {/* Breadcrumb */}
            <Breadcrumb className="text-4xl mb-6">
                <BreadcrumbList>
                    <BreadcrumbLink href="/">Books</BreadcrumbLink>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Buchdetails */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border rounded-lg shadow-lg p-8 bg-white">
                {/* Bild des Buches */}
                <div className="flex justify-center items-start">
                    <img
                        src={book.coverImage || '/placeholder.jpg'}
                        alt={book?.titel?.titel || 'Kein Titel'}
                        className="border-4 object-contain h-80 w-60 rounded-lg bg-gray-100"
                    />
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
                        <div>
                            <strong>ISBN:</strong>{' '}
                            {book?.isbn || 'Nicht verfügbar'}
                        </div>
                        <div>
                            <strong>Art:</strong> {book?.art || 'Unbekannt'}
                        </div>
                        <div>
                            <strong>Preis:</strong>{' '}
                            {book?.preis
                                ? `${book.preis} €`
                                : 'Nicht verfügbar'}
                        </div>
                        <div>
                            <strong>Lieferbar:</strong>{' '}
                            {book?.lieferbar ? 'Ja' : 'Nein'}
                        </div>
                        <div>
                            <strong>Rabatt:</strong> {book?.rabatt || 0} %
                        </div>
                        <div>
                            <strong>Datum:</strong>{' '}
                            {book?.datum || 'Nicht verfügbar'}
                        </div>
                        <div className="col-span-2">
                            <strong>Schlagwörter:</strong>{' '}
                            {book?.schlagwoerter?.join(', ') || 'Keine'}
                        </div>
                    </div>
                    {user.token && (
                        <div className="flex flex-row-reverse">
                            <Button
                                variant="destructive"
                                className="flex-item"
                                onClick={() => {
                                    deleteEntry();
                                }}
                            >
                                Buch Löschen
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

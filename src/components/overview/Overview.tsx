import {
    handleFailure,
    handleSuccess,
} from '@/lib/api/search-response-handling';
import { useEffect, useState } from 'react';

import AddCard from './AddCard';
import { AxiosResponse } from 'axios';
import BookCard from './BookCard';
import Breadcrumbs from '../common/Breadcrumbs';
import { Buch } from '@/types/buch';
import SearchComponent from './Search';
import { apiGet } from '@/lib/api/api-handler';
import { hasAddRights } from '@/lib/utils/role-utils';
import { useAppContext } from '@/hooks/use-context';
import { useNavigate } from 'react-router';

/**
 * Rendert Übersicht für Bücher mit Suche und Buchdaten als Karten.
 *
 * @returns Übersichtskomponente
 */
export default function Overview() {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Buch[]>([]);
    const [failureText, setFailureText] = useState<string>(
        'Ein unerwarteter Fehler ist aufgetreten.',
    );
    const [searchParams, setSearchParams] = useState<Record<string, string>>(
        {},
    );
    const { user } = useAppContext();

    // Funktion die Bücher vom Backend anfragt.
    // Falls Suchparameter gesetzt sind, werden diese als Query Parameter für die Anfrage gesetzt.
    const fetchBooks = () => {
        const urlParams = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value !== undefined && value != '') {
                urlParams.append(key, value);
            }
        });
        apiGet(
            `/api/rest?${urlParams.toString()}`,
            (response: AxiosResponse) => handleSuccess(response, setBooks),
            (response: AxiosResponse) =>
                handleFailure(response, setBooks, setFailureText),
        );
    };

    // React Hook der Bücher beim ersten Rendern vom Backend anfragt.
    useEffect(() => {
        fetchBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Funktion, die die Suche ausführt
    const handleSearch = () => {
        fetchBooks();
    };

    // Funktion, die beim Drücken von Enter Suche ausführt
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="content p-4">
            <Breadcrumbs path={[{ base: '' }]} />
            <h1 className="text-2xl font-bold mb-4">Bücher</h1>
            {/* Suchkomponente zum Suchen von Büchern */}
            <SearchComponent
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                handleKeyDown={handleKeyDown}
                handleSearch={handleSearch}
            />

            {/* Anzeige der Bücher oder eine Fehlermeldung */}
            {books.length === 0 && (
                <p className="text-center mt-4 text-gray-500">{failureText}</p>
            )}
            <div className="grid grid-cols-6 gap-4">
                {books.length > 0 &&
                    books.map((book) => (
                        <BookCard
                            key={book._links.self.href}
                            className="col-span-6 md:col-span-3 lg:col-span-2"
                            book={book}
                        />
                    ))}
                {/* Karte zum Hinzufügen von Büchern. Wird nur bei vorhandener Nutzerrolle angezeigt */}
                {hasAddRights(user) && (
                    <AddCard
                        className="col-span-6 md:col-span-2 lg:col-span-1 w-full"
                        onClick={(
                            event: React.MouseEvent<HTMLDivElement, MouseEvent>,
                        ) => {
                            event.preventDefault();
                            navigate('/add');
                        }}
                    />
                )}
            </div>
        </div>
    );
}

import { handleFailure, handleSuccess } from '@/lib/search-validation';
import { useEffect, useState } from 'react';

import AddCard from './AddCard';
import { AxiosResponse } from 'axios';
import BookCard from './BookCard';
import Breadcrumbs from '../common/Breadcrumbs';
import { Buch } from '@/types/buch';
import { Button } from '../shadcn-ui/button';
import { Input } from '../shadcn-ui/input';
import { apiGet } from '@/lib/api/api-handler';
import { hasAddRights } from '@/lib/role-utils';
import { useAppContext } from '@/hooks/use-context';
import { useNavigate } from 'react-router';

export default function Overview() {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Buch[]>([]);
    const [failureText, setFailureText] = useState<string>(
        'Ein unerwarteter Fehler ist aufgetreten.',
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const { user } = useAppContext();

    const fetchBooks = (query = '', selectedCategory = '') => {
        const urlParams = new URLSearchParams();
        if (query) urlParams.append('titel', query);
        if (selectedCategory) urlParams.append('art', selectedCategory);
        apiGet(
            `/api/rest?${urlParams.toString()}`,
            (response: AxiosResponse) => handleSuccess(response, setBooks),
            (status: number) => handleFailure(status, setBooks, setFailureText),
        );
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() === '' && category.trim() === '') {
            fetchBooks();
        } else {
            fetchBooks(searchTerm, category);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="content p-4">
            <Breadcrumbs path={[{ base: '' }]} />
            <h1 className="text-2xl font-bold mb-4">Bücher</h1>
            <div className="flex items-center space-x-2 searchbar mb-4">
                {/* Suchfeld */}
                <Input
                    className="flex-item flex-auto p-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mainColor"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nach Buchtiteln suchen..."
                />
                {/* Dropdown für Kategorie */}
                <select
                    className="flex-item p-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mainColor"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Alle Buchkategorien</option>
                    <option value="EPUB">EPUB</option>
                    <option value="HARDCOVER">HARDCOVER</option>
                    <option value="PAPERBACK">PAPERBACK</option>
                </select>
                {/* Suchbutton */}
                <Button
                    variant="custom"
                    className="flex-item px-4 py-2 rounded"
                    onClick={handleSearch}
                >
                    Suchen
                </Button>
            </div>

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
                {/* Zusatzoption für eingeloggte Admins */}
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

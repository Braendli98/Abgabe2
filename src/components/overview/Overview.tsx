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
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const { user } = useAppContext();

    const fetchBooks = (query = '', selectedCategory = '') => {
        const urlParams = new URLSearchParams();
        if (query) urlParams.append('titel', query);
        if (selectedCategory) urlParams.append('art', selectedCategory);

        apiGet(
            `/api/rest?${urlParams.toString()}`,
            (response: AxiosResponse) => {
                console.log('API Response:', response);
                const books = response.data._embedded?.buecher ?? [];
                setBooks(books);
            },
            () => {
                console.error('Fehler bei der API-Anfrage.');
                setBooks([]); 
            },
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
                    className="flex-1 p-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mainColor"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nach Buchtiteln suchen..."
                />
                {/* Dropdown für Kategorie */}
                <select
                    className="p-2 bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mainColor"
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
                    className="bg-mainColor text-white px-4 py-2 rounded shadow hover:bg-opacity-90"
                    onClick={handleSearch}
                >
                    Suchen
                </Button>
            </div>

            {/* Anzeige der Bücher oder eine Fehlermeldung */}
            {books.length === 0 && (
                <p className="text-center mt-4 text-gray-500">
                    {searchTerm.trim() === '' && category.trim() === ''
                        ? 'Bitte geben Sie einen Suchbegriff ein oder wählen Sie eine Kategorie aus.'
                        : 'Keine Bücher gefunden. Bitte versuchen Sie es mit einem anderen Suchbegriff oder einer anderen Kategorie.'}
                </p>
            )}
            <div className="flex flex-wrap">
                {books.length > 0 &&
                    books.map((book) => (
                        <BookCard
                            key={book._links.self.href}
                            className="flex-item"
                            book={book}
                        />
                    ))}
                {/* Zusatzoption für eingeloggte Admins */}
                {hasAddRights(user) && (
                    <AddCard
                        className="flex-item"
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

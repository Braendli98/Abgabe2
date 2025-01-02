import { useEffect, useState } from 'react';
import AddCard from './AddCard';
import BookCard from './BookCard';
import { Buch } from '@/types/buch';
import { useAppContext } from './Context';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function Overview() {
    const [books, setBooks] = useState<Buch[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const { user } = useAppContext();

    const fetchBooks = async (query = '', selectedCategory = '') => {
        try {
            const urlParams = new URLSearchParams();
            if (query) urlParams.append('titel', query);
            if (selectedCategory) urlParams.append('art', selectedCategory);

            const url = `/api/rest?${urlParams.toString()}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                setBooks([]);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const content = await response.json();
            const books = content._embedded?.buecher || [];
            setBooks(books);

            if (books.length === 0) {
                console.warn('Keine Bücher gefunden.');
            }
        } catch (error) {
            console.error('Fehler beim Laden der Buchdaten:', error);
            setBooks([]);
        }
    };

    useEffect(() => {
        fetchBooks(); // Initialer API-Aufruf
    }, []);

    const handleSearch = () => {
        // Wenn weder ein Suchbegriff noch eine Kategorie ausgewählt wurde
        if (searchTerm.trim() === '' && category.trim() === '') {
            fetchBooks(); // Zeige alle Bücher
        } else {
            fetchBooks(searchTerm, category); // Filtere basierend auf Eingabe
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch(); // Starte die Suche auch bei Enter
        }
    };

    return (
        <div className="content p-4">
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
                <Button className="bg-mainColor text-white px-4 py-2 rounded shadow hover:bg-opacity-90" onClick={handleSearch}>
                    Suchen
                </Button>
            </div>
            
            {/* Anzeige der Bücher oder eine Fehlermeldung */}
            {books.length === 0 && (
                <p className="text-center mt-4 text-gray-500">
                    {searchTerm.trim() === '' && category.trim() === ''
                        ? 'Bitte geben Sie einen Suchbegriff ein oder wählen Sie eine Kategorie aus.'
                        : 'Keine Bücher gefunden oder ein Fehler ist aufgetreten.'}
                </p>
            )}
            {books.length > 0 && (
                <div className="flex flex-wrap">
                    {books.map((book) => (
                        <BookCard
                            key={book._links.self.href}
                            className="flex-item"
                            book={book}
                        />
                    ))}
                </div>
            )}

            {/* Zusatzoption für eingeloggte Benutzer */}
            {user.token && <AddCard className="flex-item" />}
        </div>
    );
}

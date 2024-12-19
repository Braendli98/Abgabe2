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
    const [category, setCategory] = useState(''); // State for the dropdown value
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
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const content = await response.json();
            console.log(content);
            const books = content._embedded?.buecher || [];
            setBooks(books);
        } catch (error) {
            console.error('Fehler beim Laden der Buchdaten:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleSearch = () => {
        fetchBooks(searchTerm, category);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="content">
            <h1>Books</h1>
            <div className="flex items-center space-x-2 searchbar mb-4">
                <Input
                    className="flex-item flex-auto bg-mainColor bg-opacity-10"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown} // Trigger search on Enter key
                    placeholder="Search for books..."
                />
                <select
                    className="flex-item bg-mainColor bg-opacity-10 border rounded px-2 py-1"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Filter Buchart</option>
                    <option value="EPUB">EPUB</option>
                    <option value="HARDCOVER">HARDCOVER</option>
                    <option value="PAPERBACK">PAPERBACK</option>
                </select>
                <Button onClick={handleSearch}>Suchen</Button>
            </div>
            <div className="flex flex-wrap">
                {books.map((book) => (
                    <BookCard
                        key={book._links.self.href}
                        className="flex-item"
                        book={book}
                    />
                ))}
                {user.token && <AddCard className="flex-item" />}
            </div>
        </div>
    );
}

import { useEffect } from 'react';
import AddCard from './AddCard';
import BookCard from './BookCard';
import { Buch } from '@/types/buch';
import { useAppContext } from './Context';
import { useNavigate } from 'react-router';

export default function Overview({ books, setBooks }: { books: Buch[]; setBooks: (books: Buch[]) => void; }) {
    const navigate = useNavigate();
    const { user } = useAppContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('api/rest', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const content = await response.json();
                const fetchedBooks = content._embedded?.buecher || [];
                setBooks(fetchedBooks);
            } catch (error) {
                console.error('Fehler beim Laden der Buchdaten:', error);
            }
        };

        fetchData();
    }, [setBooks]);  // Abhängigkeitsarray korrigiert

    return (
        <div className="content">
            <h1>Books</h1>
            <div className="flex flex-wrap">
                {books.map((book) => (
                    <BookCard key={book._links.self.href} className="flex-item" book={book} />
                ))}
                {user.token && (
                    <AddCard
                        className="flex-item"
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            event.preventDefault();  // Optional, verhindert das Standardverhalten
                            navigate('/add'); // Navigiert zur Hinzufügen-Seite
                          }}
                    />
                )}
            </div>
        </div>
    );
}

import { useEffect, useState } from 'react';

import AddCard from './AddCard';
import BookCard from './BookCard';
import { Buch } from '@/types/buch';
import { useAppContext } from './Context';
import { useLocation } from 'react-router';

export default function Overview() {
    const location = useLocation();
    const [books, setBooks] = useState<Buch[]>([]);
    const { user } = useAppContext();

    // TODO: Put this into an abstract object?
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
                // Debugging
                console.log(content);
                const books = content._embedded?.buecher || [];
                setBooks(books);
            } catch (error) {
                console.error('Fehler beim Laden der Buchdaten:', error);
            }
        };

        fetchData();
    }, [location]);

    return (
        <div className="content">
            <h1>Books</h1>
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

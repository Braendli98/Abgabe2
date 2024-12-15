import { useEffect, useState } from 'react';

import AddCard from './AddCard';
import BookCard from './BookCard';
import { Buch } from '@/types/buch';

export default function Overview({
  setPage,
  setSelectedBook,
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<Buch | null>>;
}) {
  const [books, setBooks] = useState<Buch[]>([]);
  
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
        const books = content._embedded?.buecher || [];
        setBooks(books);
      } catch (error) {
        console.error('Fehler beim Laden der Buchdaten:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="content">
      <h1>Books</h1>
      <div className="flex flex-wrap">
        {books.map((book) => (
          <BookCard
            key={book._links.self.href}
            className="flex-item"
            book={book}
            setPage={setPage}
            setSelectedBook={setSelectedBook} // Falls übergeben
          />
        ))}
        <AddCard className="flex-item" />
      </div>
    </div>
  );
}

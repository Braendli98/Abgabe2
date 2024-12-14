import { useEffect, useState } from 'react';

import AddCard from './AddCard';
import BookCard from './BookCard';
import { Buch } from '@/types/buch';

export default function Overview({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [books, setBooks] = useState<Buch[]>([]);

  // TODO: Put this into an abstract object?
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('api/rest', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json().then((content) => {
        const books = (content._embedded.buecher as Buch[]);
        setBooks(books);
      });
    };

    fetchData();
  }, []);

  return (
    <div className="content">
      <h1>Books</h1>
      <div className="flex flex-wrap">
        {
          books.map((book) => <BookCard key={book._links.self.href} className="flex-item" book={book} setPage={setPage}></BookCard> )
        }
        <AddCard className="flex-item"></AddCard>
      </div>
    </div>
  );
}

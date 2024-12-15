import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

import { Buch } from '@/types/buch';

export default function BookCard({
  className,
  book,
  setPage,
  setSelectedBook,
}: {
  className: string;
  book: Buch;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedBook: React.Dispatch<React.SetStateAction<Buch | null>>;
}) {
  const handleClick = () => {
    setSelectedBook(book); // Setzt das ausgewählte Buch in den Zustand
    setPage('details'); // Navigiert zur Details-Seite
  };

  return (
    <Card
      className={`${className} cursor-pointer hover:shadow-lg transition-shadow`}
      style={{ margin: '10px', minWidth: '350px', minHeight: '50px' }}
      onClick={handleClick}
      role="button"
    >
      <table>
        <tbody>
          <tr>
            <td>
              <img
                className="border-2 object-contain h-48 w-36 rounded-lg m-2 bg-gray-100"
                alt="Book Cover"
              />
            </td>
            <td>
              <CardHeader>
                <CardTitle>{book.titel.titel}</CardTitle>
                <CardDescription>{book.titel.untertitel || 'Kein Untertitel'}</CardDescription>
              </CardHeader>
              <CardFooter>
                <p>{book.preis} €</p>
              </CardFooter>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}

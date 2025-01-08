import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../shadcn-ui/card';

import BookCover from '../common/BookCover';
import { Buch } from '@/types/buch';
import { useNavigate } from 'react-router';

/**
 * Rendert eine Karte für die Übersicht, die einige Buchdaten anzeigt.
 * Beim Klick auf ein Buch wird zur Detailseite des Buchs navigiert.
 * 
 * @param props React Props mit `className` und `book`  
 * `className` für zusätzliche CSS Klassen  
 * `book` Buch dessen Daten angezeigt werden.
 * @returns Karte mit Buchdaten
 */
export default function BookCard({
    className,
    book,
}: Readonly<{
    className: string;
    book: Buch;
}>) {
    const navigate = useNavigate();
    const id = getIdFromBook(book);

    // Funktion die zur Detailseite des Buchs navigiert
    const handleClick = () => {
        navigate(`/details/${id}`);
    };

    return (
        <Card
            className={`${className} cursor-pointer hover:shadow-lg transition-shadow`}
            onClick={handleClick}
            role="button"
        >
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>{/* Leerer Tabellenheader */}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <BookCover book={book} size="small" />
                        </td>
                        <td>
                            <CardHeader>
                                <CardTitle>{book.titel.titel}</CardTitle>
                                <CardDescription>
                                    {book.titel.untertitel || 'Kein Untertitel'}
                                </CardDescription>
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

// Fallback um ID des Buchs zu erhalten, da diese nicht in der Server Response vorhanden ist
function getIdFromBook(book: Buch) {
    return book._links.self.href.split('/').reverse()[0];
}

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

export default function BookCard({
    className,
    book,
}: Readonly<{
    className: string;
    book: Buch;
}>) {
    const navigate = useNavigate();
    const id = getIdFromBook(book);

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
                        <th colSpan={2}>Buchdetails</th>
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

// Fallback since the server response does not contain the book id
function getIdFromBook(book: Buch) {
    return book._links.self.href.split('/').reverse()[0];
}

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';
import { Buch } from '@/types/buch';
import { useNavigate } from 'react-router';

export default function BookCard({
    className,
    book,
}: {
    className: string;
    book: Buch;
}) {
    const navigate = useNavigate();
    const id = getIdFromBook(book);

    const handleClick = () => {
        navigate(`/details/${id}`); // Navigiert zur Details-Seite
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
                                className="border-2 object-contain h-48 w-36 m-2 bg-gray-100 object-cover"
                                src={`/covers/${book.isbn}.jpg`}
                                alt={`${book.titel.titel} Cover`}
                                onError={(e) =>
                                    (e.currentTarget.src =
                                        '/covers/default.jpg')
                                }
                            />
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

// TODO: Modify the server so it returns the id with the book
function getIdFromBook(book: Buch) {
    return book._links.self.href.split('/').reverse()[0];
}

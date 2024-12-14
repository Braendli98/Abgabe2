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
}: {
  className: string;
  book: Buch;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Card
      className={`${className} cursor-pointer hover:shadow-lg transition-shadow`}
      style={{ margin: '10px', minWidth: '350px', minHeight: '50px' }}
      onClick={() => setPage('details')}
      role="button"
    >
      <table>
        <tbody>
          <tr>
            <td>
              <img className="border-2 object-contain h-48 w-36 rounded-lg m-2 bg-gray-100"></img>
            </td>
            <td>
              <CardHeader>
                <CardTitle>{book.titel.titel}</CardTitle>
                <CardDescription>{book.titel.untertitel}</CardDescription>
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

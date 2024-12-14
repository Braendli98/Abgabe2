import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

export default function BookCard({
  className,
  setPage,
}: {
  className: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Card
      className={`${className} cursor-pointer hover:shadow-lg transition-shadow`}
      style={{ margin: '10px' }}
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
                <CardTitle>Alpha</CardTitle>
                <CardDescription>Alpha</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Content and such</p>
              </CardContent>
              <CardFooter>
                <p>Buch</p>
              </CardFooter>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}

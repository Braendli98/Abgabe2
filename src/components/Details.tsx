import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';

import { Buch } from '@/types/buch';

export default function Details({ book, setPage }: { book?: Buch; setPage: React.Dispatch<React.SetStateAction<string>>; }) {
  if (!book) {
    return <div className="text-2xl text-center mt-8">Keine Buchdaten verfügbar</div>; // Fallback für fehlende Daten
  }

  return (
    <div className="content max-w-screen-lg mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb className="text-4xl mb-6">
        <BreadcrumbList>
          <BreadcrumbItem className="cursor-pointer hover:text-black" onClick={() => setPage('overview')}>
            Books
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Buchdetails */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border rounded-lg shadow-lg p-8 bg-white">
        {/* Bild des Buches */}
        <div className="flex justify-center items-start">
          <img
            src={book.coverImage || '/placeholder.jpg'}
            alt={book?.titel?.titel || 'Kein Titel'}
            className="border-4 object-contain h-80 w-60 rounded-lg bg-gray-100"
          />
        </div>

        {/* Buchinformationen */}
        <div className="space-y-6 text-xl">
          <h2 className="text-5xl font-extrabold">{book?.titel?.titel || 'Unbekannter Titel'}</h2>
          <p className="text-2xl text-gray-600 font-medium">{book?.titel?.untertitel || 'Kein Untertitel'}</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <strong>ISBN:</strong> {book?.isbn || 'Nicht verfügbar'}
            </div>
            <div>
              <strong>Art:</strong> {book?.art || 'Unbekannt'}
            </div>
            <div>
              <strong>Preis:</strong> {book?.preis ? `${book.preis} €` : 'Nicht verfügbar'}
            </div>
            <div>
              <strong>Lieferbar:</strong> {book?.lieferbar ? 'Ja' : 'Nein'}
            </div>
            <div>
              <strong>Rabatt:</strong> {book?.rabatt || 0} %
            </div>
            <div>
              <strong>Datum:</strong> {book?.datum || 'Nicht verfügbar'}
            </div>
            <div className="col-span-2">
              <strong>Schlagwörter:</strong> {book?.schlagwoerter || 'Keine'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

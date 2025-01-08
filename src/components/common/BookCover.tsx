import { Buch } from '@/types/buch';

const DEFAULT_IMAGE_PATH = '/covers/image-off.svg';

/**
 * Rendert einen Bucheinband für ein Buch als *img*.
 * Wird für ein Buch kein Einband gefunden, wird eine Fallback SVG dargestellt. 
 * 
 * @param props React Props mit den Attributen `book` und `size`  
 * `book` ist das Buch zu welchem der Einband gehört  
 * `size` erlaubt es, die Größe festzulegen
 * @returns Ein HTML *img* für den Bucheinband
 */
export default function BookCover({
    book,
    size,
}: Readonly<{
    book: Buch;
    size: 'large' | 'small';
}>) {
    
    // CSS-Klassen für großen oder kleinen Einband
    const coverClass =
        size === 'large'
            ? 'border-4 h-80 w-60 rounded-lg'
            : 'border-2 h-48 w-36 m-2';

    return (
        <img
            className={`object-contain bg-gray-100 object-cover ${coverClass}`}
            src={`/covers/${book.isbn}.jpg`}
            alt={book.titel?.titel || 'No Title'}
            onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE_PATH)}
        />
    );
}

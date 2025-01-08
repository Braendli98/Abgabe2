import { Buch } from '@/types/buch';

const DEFAULT_IMAGE_PATH = '/covers/image-off.svg';

export default function BookCover({
    book,
    size,
}: Readonly<{
    book: Buch;
    size: 'large' | 'small';
}>) {
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

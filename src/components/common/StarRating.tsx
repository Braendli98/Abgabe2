import { Star } from 'lucide-react';

/**
 * Rendert eine Sternebewertung bestehend aus 5 Sternen.
 * Kann durch eine *onClick* Funktion genutzt werden, um Bewertungen zu erstellen.
 *
 * @param props React Props bestehend aus `rating` und `onClick`
 * `rating` Bewertung, anhand derer Sterne gefüllt dargestellt werden
 * `onClick` Funktion, die beim Klick auf einen Stern ausgeführt wird
 * @returns Sternebewertung
 */
export default function StarRating({
    rating,
    onClick,
}: {
    readonly rating: number;
    readonly onClick?: (rating: number) => void;
}) {
    const totalStars = 5;

    return (
        <div className="flex items-center space-x-1">
            {Array.from({ length: totalStars }, (_, index) => (
                <Star
                    key={index}
                    fill={index < Math.floor(rating) ? 'gold' : 'white'}
                    strokeWidth={1.5}
                    stroke="gold"
                    onClick={() => onClick && onClick(index + 1)}
                />
            ))}
        </div>
    );
}

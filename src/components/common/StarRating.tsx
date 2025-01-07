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
                <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={index < Math.floor(rating) ? 'gold' : 'white'}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="gold"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => onClick && onClick(index + 1)}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.27l5.18 3.73-1.64-6.36L21 9.36l-6.5-.5L12 3l-2.5 5.86-6.5.5 4.46 4.28L6.82 21z"
                    />
                </svg>
            ))}
        </div>
    );
}

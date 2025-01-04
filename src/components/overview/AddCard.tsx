import { Card, CardContent, CardFooter } from '../shadcn-ui/card';

import { Plus } from 'lucide-react';

interface AddCardProps {
    className: string;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function AddCard({ className, onClick }: AddCardProps) {
    return (
        <Card
            className={`flex items-center flex-col w-40 ${className} cursor-pointer hover:shadow-lg transition-shadow`}
            style={{ margin: '10px', minWidth: '150px', minHeight: '200px' }}
            onClick={onClick} // Korrekte onClick-Typisierung
            role="button"
        >
            <CardContent className="flex flex-item grow items-center">
                <Plus className="flex-item grow" size={70} />
            </CardContent>
            <CardFooter className="flex-item">
                <p>Add Book</p>
            </CardFooter>
        </Card>
    );
}

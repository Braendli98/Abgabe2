import { Card, CardContent, CardFooter } from '../shadcn-ui/card';

import { Plus } from 'lucide-react';

interface AddCardProps {
    className: string;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

/**
 * Rendert eine Karte für die Übersicht, die das Hinzufügen von Büchern erlaubt.
 *
 * @param props *AddCardProps* enthält `className` für zusätzliche CSS Klassen,
 * und `onClick` Funktion die beim Klick auf Komponente ausgeführt wird
 * @returns Karte zum Hinzufügen
 */
export default function AddCard({
    className,
    onClick,
}: Readonly<AddCardProps>) {
    return (
        <Card
            className={`flex items-center flex-col ${className} cursor-pointer hover:shadow-lg transition-shadow`}
            onClick={onClick}
            role="button"
        >
            <CardContent className="flex flex-item grow items-center mt-5">
                <Plus className="flex-item grow" size={70} />
            </CardContent>
            <CardFooter className="flex-item">
                <p>Buch Anlegen</p>
            </CardFooter>
        </Card>
    );
}

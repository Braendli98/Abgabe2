import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '../shadcn-ui/dropdown-menu';

import { UserData } from '@/types/context';
import { removeToken } from '@/lib/utils/token-handling';
import { useToast } from '@/hooks/use-toast';

/**
 * Rendert ein Nutzermenü. Das Menü erlaubt das Abmelden des Nutzers.
 *
 * @param props React Props bestehend aus `name` und `setUser`
 * `name` Name des Nutzers
 * `setUser` Setzt State des Nutzers
 * @returns Nutzermenü Komponente
 */
export default function UserMenu({
    name,
    setUser,
}: Readonly<{
    name?: string;
    setUser: React.Dispatch<React.SetStateAction<UserData>>;
}>) {
    const { toast } = useToast();

    return (
        <DropdownMenuContent style={{ marginRight: '20px' }}>
            <DropdownMenuLabel>
                <span>Hallo {name}!</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={() => {
                    setUser({});
                    removeToken();
                    toast({
                        variant: 'success',
                        description: 'Du wurdest erfolgreich abgemeldet.',
                    });
                }}
            >
                <span>Abmelden</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
}

import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '../shadcn-ui/dropdown-menu';

import { UserData } from '@/types/context';
import { useToast } from '@/hooks/use-toast';

export default function UserMenu({
    name,
    setUser,
}: {
    name?: string;
    setUser: React.Dispatch<React.SetStateAction<UserData>>;
}) {
    const { toast } = useToast();

    return (
        <DropdownMenuContent style={{ marginRight: '20px' }}>
            <DropdownMenuLabel>
                <span>Hello {name}!</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={() => {
                    setUser({});
                    toast({
                        variant: 'success',
                        description: 'Du wurdest erfolgreich ausgeloggt.',
                    });
                }}
            >
                <span>Logout</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
}

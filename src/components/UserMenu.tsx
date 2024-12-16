import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from './ui/dropdown-menu';

import { UserData } from '@/types/context';

export default function UserMenu({
    name,
    setUser,
}: {
    name?: string;
    setUser: React.Dispatch<React.SetStateAction<UserData>>;
}) {
    return (
        <DropdownMenuContent style={{ marginRight: '20px' }}>
            <DropdownMenuLabel>
                <span>Hello {name}!</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setUser({})}>
                <span>Logout</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
}

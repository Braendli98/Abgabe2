import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from './ui/dropdown-menu';

export default function UserMenu({
    name,
    setLoggedIn,
}: {
    name: string;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <DropdownMenuContent style={{ marginRight: '20px' }}>
            <DropdownMenuLabel>
                <span>Hello {name}!</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLoggedIn(false)}>
                <span>Logout</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
}

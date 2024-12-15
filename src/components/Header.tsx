import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { User } from 'lucide-react';
import UserMenu from './UserMenu';
import { useAppContext } from './Context';
import { useNavigate } from 'react-router';

export default function Header() {
    const navigate = useNavigate();
    const { user, setUser } = useAppContext();

    return (
        <header className="flex flex-nowrap header justify-between">
            <div className="flex-item flex-none w-20" />
            <Input
                className="flex-item flex-auto searchbar"
                type="string"
                id="password"
                placeholder="Search..."
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button>
                        <User />
                    </Button>
                </DropdownMenuTrigger>
                {user.token ? (
                    <UserMenu name={user.username} setUser={setUser} />
                ) : (
                    <DropdownMenuContent style={{ marginRight: '20px' }}>
                        <DropdownMenuItem onClick={() => navigate('/login')}>
                            <span>To Login</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                )}
            </DropdownMenu>
        </header>
    );
}

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { Button } from './ui/button';
import { User } from 'lucide-react';
import UserMenu from './UserMenu';
import hkaLogo from '../assets/hka.png';
import { useAppContext } from './Context';
import { useNavigate } from 'react-router';

export default function Header() {
    const navigate = useNavigate();
    const { user, setUser } = useAppContext();

    return (
        <header className="flex flex-nowrap header justify-between">
            <div className="flex items-center">
                <img src={hkaLogo} alt="HKA Logo" className="h-11 w-auto mr-4" />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="bg-mainColor text-textGray hover:bg-mainColor hover:bg-opacity-60 bg-opacity-10 border-inputBorder">
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

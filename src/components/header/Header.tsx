import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../shadcn-ui/dropdown-menu';
import { useLocation, useNavigate } from 'react-router';

import { Button } from '../shadcn-ui/button';
import { User } from 'lucide-react';
import UserMenu from './UserMenu';
import hkaLogo from '../../assets/hka.png';
import { useAppContext } from '../common/Context';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useAppContext();

    return (
        <header
            className="flex flex-nowrap header justify-between"
            data-cy="header"
        >
            <div className="flex items-center">
                <img
                    src={hkaLogo}
                    alt="HKA Logo"
                    className="h-11 w-auto mr-4"
                    data-cy="hka-logo"
                />
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
                        <DropdownMenuItem
                            onClick={() =>
                                navigate(`/login?callback=${location.pathname}`)
                            }
                        >
                            <span>To Login</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                )}
            </DropdownMenu>
        </header>
    );
}

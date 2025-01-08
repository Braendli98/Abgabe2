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
import { useAppContext } from '@/hooks/use-context';

/**
 * Rendert einen Header für die Anwendung. Der Header enthält ein Logo, sowie einen Button zum Anzeigen eines Nutzermenüs.
 *
 * @returns Headerkomponente
 */
export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useAppContext();

    return (
        <header
            className="flex flex-nowrap header justify-between sticky bg-white"
            style={{ top: 0 }}
            data-cy="header"
        >
            <div
                className="flex items-center cursor-pointer"
                onClick={() => navigate('/')}
            >
                <img
                    src={hkaLogo}
                    alt="HKA Logo"
                    className="h-11 w-auto mr-4"
                    data-cy="hka-logo"
                />
            </div>
            {/* Dropdown für Nutzermenü */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="custom">
                        <User />
                    </Button>
                </DropdownMenuTrigger>
                {user.username ? (
                    <UserMenu name={user.username} setUser={setUser} />
                ) : (
                    <DropdownMenuContent style={{ marginRight: '20px' }}>
                        <DropdownMenuItem
                            onClick={() =>
                                navigate(`/login?callback=${location.pathname}`)
                            }
                        >
                            <span>Anmelden</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                )}
            </DropdownMenu>
        </header>
    );
}

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
import hkaLogo from '../assets/hka-logo.png';

export default function Header({
  loggedIn,
  setLoggedIn,
  setPage,
}: {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <header className="flex flex-nowrap header justify-between">
      <div className="flex items-center">
        <img src={hkaLogo} alt="HKA Logo" className="h-11 w-auto mr-4" />
      </div>
      <div className="flex-item flex-none w-20" />
      <Input
        className="flex-item flex-auto searchbar bg-mainColor bg-opacity-10"
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
        {loggedIn ? (
          <UserMenu name={'User'} setLoggedIn={setLoggedIn} />
        ) : (
          <DropdownMenuContent style={{ marginRight: '20px' }}>
            <DropdownMenuItem onClick={() => setPage('login')}>
              <span>To Login</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </header>
  );
}

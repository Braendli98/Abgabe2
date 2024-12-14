import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { User } from "lucide-react";

export default function Header({ setLoggedIn }: { setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>}) {
    return (
        <header className="flex flex-nowrap header justify-between">
            <div className="flex-item flex-none w-20"/>
            <Input className="flex-item flex-auto searchbar" type="string" id="password" placeholder="Search..." />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button>
                        <User />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent style={{ marginRight: '20px'}}>
                    <DropdownMenuLabel><span>Hello User!</span></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setLoggedIn(false)}><span>Logout</span></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}
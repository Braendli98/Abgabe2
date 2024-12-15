import Header from './Header';
import { Outlet } from 'react-router';

export default function ContentLayout({
    loggedIn,
    setLoggedIn,
}: {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <Outlet />
        </div>
    );
}

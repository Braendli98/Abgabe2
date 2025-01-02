import Header from '../header/Header';
import { Outlet } from 'react-router';

export default function ContentLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
import Header from '../header/Header';
import { Outlet } from 'react-router';

/**
 * Rendert Layout für Inhalte mit dem Header.
 * 
 * @returns Inhalt mit Header
 */
export default function ContentLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}

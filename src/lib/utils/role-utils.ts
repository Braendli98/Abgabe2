import { UserData } from '@/types/context';

/**
 * Prüft ob Nutzer das Recht zum Hinzufügen von Büchern hat.
 * 
 * @param user Nutzer für Rechteprüfung
 * @returns Boolscher Wert, ob Nutzer Recht hat
 */
export function hasAddRights(user: UserData) {
    return user.roles?.includes('admin') || user.roles?.includes('user');
}

/**
 * Prüft ob Nutzer das Recht zum Löschen von Büchern hat.
 * 
 * @param user Nutzer für Rechteprüfung
 * @returns Boolscher Wert, ob Nutzer Recht hat
 */
export function hasRemoveRights(user: UserData) {
    return user.roles?.includes('admin');
}

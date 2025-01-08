import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Funktion die CSS Klassen zusammenfügt
 * 
 * @param inputs Array aus CSS Klassen
 * @returns zusammengefügte CSS Klassen
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

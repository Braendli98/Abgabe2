import { BreadcrumbComponent } from '@/types/breadcrumb';

/**
 * Erstellt BreadcrumbComponents aus einem URI Pfad.
 * 
 * @param path Pfad für den BreadcrumbComponents erstellt werden
 * @returns Array aus BreadcrumbComponents
 */
export function getBreadcrumbComponents(path: string) {
    const pathArray = stripPrefix(path).split('/', 2);
    const components: BreadcrumbComponent[] = [{ base: '' }];
    if (
        pathArray === undefined ||
        pathArray.length < 2 ||
        pathArray[0] !== 'details'
    ) {
        return components;
    }
    components.push({ base: 'details', param: pathArray[1] });
    return components;
}

// Entfernt '/' Präfix von einem Pfad, falls Pfad mit '/' beginnt
function stripPrefix(path: string) {
    if (path !== '/' && path.startsWith('/')) {
        return path.substring(1);
    }
    return path;
}

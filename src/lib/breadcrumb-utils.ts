import { BreadcrumbComponent } from "@/types/breadcrumb";

export function getBreadcrumbComponents(path: string) {
    const pathArray = stripPrefix(path).split('/', 2);
    const components: BreadcrumbComponent[] = [{ base: '' }];
    if(pathArray === undefined || pathArray.length < 2 || pathArray[0] !== 'details') {
        return components
    }
    components.push({ base: 'details', param: pathArray[1] });
    return components;
}

function stripPrefix(path: string) {
    if( path !== '/' && path.startsWith('/')) {
        return path.substring(1);
    }
    return path;
}

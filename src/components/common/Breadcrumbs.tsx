import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../shadcn-ui/breadcrumb';

import { BreadcrumbComponent } from '@/types/breadcrumb';

const breadcrumbMapping = {
    '': 'Startseite',
    add: 'Neu Anlegen',
    details: 'Details',
    login: 'Login',
};

/**
 * Rendert Breadcrumbs für eine Seite der Anwendung, generiert aus einem *path*.
 *
 * @param props React Props bestehend aus `path`
 * `path` legt Pfadelemente fest, für die Breadcrumbs generiert werden
 * @returns Generierte Breadcrumbs
 */
export default function Breadcrumbs({
    path,
}: Readonly<{ path: BreadcrumbComponent[] }>) {
    return (
        <Breadcrumb className="text-4xl mb-6">
            <BreadcrumbList>{generateBreadcrumbs(path)}</BreadcrumbList>
        </Breadcrumb>
    );
}

/*
 * Generiert BreadcrumbItems und -Links für BreadcrumbComponents.
 * Falls keine BreadcrumbComponents übergeben wurden, wird ein einzelnes Item für die Startseite zurückgegeben.
 */
function generateBreadcrumbs(path: BreadcrumbComponent[]) {
    if (path === undefined || path.length === 0) {
        return (
            <BreadcrumbItem>
                <BreadcrumbPage>Startseite</BreadcrumbPage>
            </BreadcrumbItem>
        );
    }

    // Array für generierte Links und Seperatoren
    const breadcrumbEntries: React.ReactElement[] = [];

    path.filter((_, index) => index !== path.length - 1).forEach((value) => {
        breadcrumbEntries.push(
            <BreadcrumbLink
                href={getRefLink(value)}
                key={value.base}
                className="text-mainColor"
            >
                {mapToName(value)}
            </BreadcrumbLink>,
        );
        breadcrumbEntries.push(
            <BreadcrumbSeparator key={`${value.base}-separator`} />,
        );
    });

    return (
        <>
            {breadcrumbEntries.map((entry) => {
                return entry;
            })}
            <BreadcrumbItem>
                <BreadcrumbPage>
                    {mapToName(path[path.length - 1])}
                </BreadcrumbPage>
            </BreadcrumbItem>
        </>
    );
}

/*
 * Gibt eine relative URI für einen BreadcrumbComponent aus.
 * Die URI wird aus *base* und optionalem *param* als Suffix erstellt.
 */
function getRefLink(component: BreadcrumbComponent) {
    const pathSuffix =
        component.param === undefined ? '' : `/${component.param}`;
    return `/${component.base}${pathSuffix}`;
}

/*
 * Mappt BreadcrumbComponent zu einem Anzeigetext.
 * Als Schlüssel wird der Basispfad *base* der Komponente genutzt.
 * Falls der Schlüssel nicht in der Map vorhanden ist, wird ein leerer String zurückgegeben.
 */
function mapToName(component: BreadcrumbComponent) {
    return breadcrumbMapping[component.base] ?? '';
}

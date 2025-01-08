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

export default function Breadcrumbs({ path }: Readonly<{ path: BreadcrumbComponent[] }>) {
    return (
        <Breadcrumb className="text-4xl mb-6">
            <BreadcrumbList>{generateBreadcrumbs(path)}</BreadcrumbList>
        </Breadcrumb>
    );
}

function generateBreadcrumbs(path: BreadcrumbComponent[]) {
    if (path === undefined || path.length === 0) {
        return (
            <BreadcrumbItem>
                <BreadcrumbPage>Startseite</BreadcrumbPage>
            </BreadcrumbItem>
        );
    }

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

function getRefLink(component: BreadcrumbComponent) {
    const pathSuffix =
        component.param === undefined ? '' : `/${component.param}`;
    return `/${component.base}${pathSuffix}`;
}

function mapToName(component: BreadcrumbComponent) {
    return breadcrumbMapping[component.base];
}

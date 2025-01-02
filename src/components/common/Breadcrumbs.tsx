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

export default function Breadcrumbs({ path }: { path: BreadcrumbComponent[] }) {
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

    console.log(path);

    return (
        <>
            {path
                .filter((_, index) => index !== path.length - 1)
                .map((value) => {
                    return (
                        <>
                            <BreadcrumbLink href={getRefLink(value)}>
                                {mapToName(value)}
                            </BreadcrumbLink>
                            <BreadcrumbSeparator />
                        </>
                    );
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

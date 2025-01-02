import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../shadcn-ui/breadcrumb';

export default function Breadcrumbs({ path }: { path: string[] }) {
    return (
        <Breadcrumb className="text-4xl mb-6">
            <BreadcrumbList>{generateBreadcrumbs(path)}</BreadcrumbList>
        </Breadcrumb>
    );
}

function generateBreadcrumbs(path: string[]) {
    if (path === undefined || path.length === 0) {
        return (
            <BreadcrumbItem>
                <BreadcrumbPage>Startseite</BreadcrumbPage>
            </BreadcrumbItem>
        );
    }

    return (
        <>
            <BreadcrumbLink href="/">Startseite</BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{mapToName(path[0])}</BreadcrumbPage>
            </BreadcrumbItem>
        </>
    );
}

function mapToName(part: string) {
    switch (part) {
        case 'add': {
            return 'Neu Anlegen';
        }
        case 'details': {
            return 'Details';
        }
        case 'login': {
            return 'login';
        }
    }
}

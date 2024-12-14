export declare interface Buch {
    preis: number;
    titel: Titel
    _links: Links;
}

declare interface Titel {
    titel: string;
    untertitel: string;
}

declare interface Links {
    self: Link;
}

declare interface Link {
    href: string;
}
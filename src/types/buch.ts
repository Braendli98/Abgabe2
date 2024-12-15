export declare interface Buch {
    id: string;               // Eindeutige ID des Buches
    titel: Titel;             // Titel und Untertitel des Buches
    isbn: string;             // ISBN-Nummer des Buches
    preis: number;            // Preis des Buches
    rating: number;           // Bewertung des Buches
    art: string;              // Art des Buches (z.B. Hardcover, Paperback, EPUB)
    lieferbar: boolean;       // Verfügbarkeit des Buches
    rabatt: number;           // Rabatt in Prozent
    datum: string;            // Veröffentlichungsdatum des Buches
    schlagwoerter: string;    // Schlagwörter (z.B. Kategorien)
    coverImage: string;       // URL des Coverbildes
    _links: Links;            // Links für zusätzliche API-Ressourcen
  }
  
  declare interface Titel {
    titel: string;            // Titel des Buches
    untertitel: string;       // Untertitel des Buches
  }
  
  declare interface Links {
    self: Link;               // Self-Link der Ressource
  }
  
  declare interface Link {
    href: string;             // URL des Links
  }
  
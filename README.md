# Single Page Application

Vite + React + TailwindCSS + shadcn/ui

## 1. Inhalt

- [1. Inhalt](#1-inhalt)
- [2. Vorbedingungen](#2-vorbedingungen)
- [3. Installation](#3-installation)
- [4. Ausführung](#4-ausführung)
  - [4.1. Entwicklungsmodus](#41-entwicklungsmodus)
  - [4.2. Produktionsmodus](#42-produktionsmodus)
- [5. Linting und Testing](#5-linting-und-testing)
  - [5.1. ESLint](#51-eslint)
  - [5.2. Prettier](#52-prettier)
  - [5.3. Cypress Tests](#53-cypress-tests)
- [6. Projekthandbuch](#6-projekthandbuch)

## 2. Vorbedingungen

Damit die Anwendung korrekt funktioniert, ist es notwendig den Backend Server mitsamt Datenbank und Keycloak zu starten.
Standardmäßig wird das Backend über die URI `https://localhost:3000` aufgerufen, diese kann jedoch in `vite.config.ts` angepasst werden.

## 3. Installation

Die zur Ausführung der Anwendung notwendigen dependencies können mit folgendem Befehl installiert werden:

```powershell
    npm i
```

## 4. Ausführung

### 4.1. Entwicklungsmodus

Zum Ausführen der Anwendung im Entwicklungsmodus reicht es, in der Powershell folgenden Befehl auszuführen:

```powershell
    npm run dev
```

Anschließend kann die Anwendung auf `http://localhost:5173` besucht werden.

### 4.2. Produktionsmodus

Um die Anwendung im Produktionsmodus auszuführen, muss zunächst ein Produktionbuild mit folgendem Befehl gebaut werden:

```powershell
    npm run build
```

Der Produktionbuild kann dann gestartet werden:

```powershell
    npm run preview
```

Die Anwendung ist dann unter `http://localhost:4173` erreichbar.

## 5. Linting und Testing

### 5.1. ESLint

[ESlint](https://eslint.org/) kann mit folgendem Befehl gestartet werden, um alle Dateien in `src` zu überprüfen:

```powershell
    npm run lint
```

### 5.2. Prettier

Verstöße gegen die Formatierungsregeln von [Prettier](https://prettier.io/) können mit folgendem Befehl gefunden werden:

```powershell
    npx prettier . --check
```

Anschließend können alle Dateien automatisch von Prettier formatiert werden:

```powershell
    npx prettier . --write
```

### 5.3. Cypress Tests

Damit die [Cypress](https://docs.cypress.io/app/get-started/why-cypress) Tests ausgeführt werden können, muss die Anwendung im Entwicklungsmodus unter dem Port `5173` laufen.
Zum einfachen Ausführen aller Tests kann folgender Befehl ausgeführt werden:

```powershell
    npx cypress run
```

Alternativ kann die Cypress Benutzeroberfläche gestartet werden:

```powershell
    npm run cy:open
```

Zur Benutzung der Cypress Oberfläche: [Cypress Docs](https://docs.cypress.io/app/get-started/open-the-app)

## 6. Projekthandbuch

Mithilfe von [Asciidoctor](https://asciidoctor.org/) kann ein Projekthandbuch als HTML Seite generiert werden:

```powershell
    npm run asciidoctor
```

Das generierte Handbuch ist dann unter `docs/html` zu finden.

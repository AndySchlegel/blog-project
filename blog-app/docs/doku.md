# Next.js Blog Workshop – Projektdokumentation

## Überblick
Dieses Repository enthält eine vollständig lauffähige Beispielanwendung auf Basis des Next.js App Routers (>=13). Sie dient als Unterrichtsgrundlage für den Abschnitt „Project Structure Deep Dive“ sowie die anschließenden Live-Coding-Übungen. Alle Codebeispiele, Komponenten und Routen sind umgesetzt und können direkt in `npm run dev` demonstriert werden.

## Projektstruktur
```
blog-app/
├── app/
│   ├── layout.js            # Wurzel-Layout (Navigation + Sidebar + Footer)
│   ├── page.js              # Startseite mit Feature-Posts & Styling-Demo
│   ├── globals.css          # Globale Styles & Tailwind-Import
│   ├── not-found.js         # 404-Route
│   ├── about/page.js        # About-Seite mit Team-Grid
│   ├── contact/page.js      # Kontaktformular
│   └── posts/
│       ├── page.js          # Posts-Übersicht mit Pagination
│       ├── loading.js       # Route-spezifisches Loading UI
│       ├── error.js         # Fehlergraceful-Handling (Client Component)
│       └── [id]/page.js     # Dynamische Detailseite inkl. generateStaticParams
├── components
│   ├── Button.module.css    # Styling-Demo für CSS Modules
│   ├── ButtonShowcase.js    # Vergleicht Global CSS / CSS Module / Tailwind
│   ├── Footer.js
│   ├── Navigation.js        # Enthält aktive Link Markierung + Suche
│   ├── NewsletterSignup.js  # Mock-Form (Client Component)
│   ├── Pagination.js
│   ├── PostCard.js
│   ├── PostList.js
│   ├── SearchBar.js         # Client-Suche mit Statusausgabe
│   └── Sidebar.js           # Kategorien + Newsletter
├── lib/
│   └── mockPosts.js         # Mock-Daten, Kategorien & Pagination-Helper
├── public/images/           # SVG-Platzhalter für Postkarten
├── next.config.mjs
├── jsconfig.json            # Alias @/* → Projektwurzel
├── package.json
├── postcss.config.mjs
└── doku.md                  # Diese Dokumentation
```

## App Router vs. Pages Router
- **App Router** (eingesetzt): nutzt Server Components standardmäßig, erlaubt verschachtelte Layouts, Streaming & Segment-basierte Datenfetching-Strategien.
- **Pages Router** (legacy): basiert auf Client Components & `pages/`-Verzeichnis, benötigt manuelle Datenfetching-Lösungen.
- Vorteile des App Routers: bessere Performance durch RSC, klar definierte Konventionen (`layout.js`, `page.js`, `loading.js`, `error.js`, `not-found.js`), vereinfachtes Colocation von UI & Datenlogik.

## Spezielle Dateien & Segmente
- `page.js`: definiert die Route (`app/posts/page.js` → `/posts`).
- `layout.js`: teilt UI zwischen Segmenten; unser RootLayout kapselt Navigation, Sidebar, Footer.
- `loading.js`: Suspense-Fallback während Datenanfragen (`app/posts/loading.js`).
- `error.js`: Fehlergraceful-UI je Segment (Client Component mit `reset`).
- `not-found.js`: globale 404-Behandlung.
- Dynamische Segmente: `[id]/page.js` → `/posts/123`, `generateStaticParams()` liefert IDs für SSG-Demos.

## Routingbeispiele
- `/` → `app/page.js`
- `/about` → `app/about/page.js`
- `/contact` → `app/contact/page.js`
- `/posts` → `app/posts/page.js`
- `/posts/1` → `app/posts/[id]/page.js`

## Live Coding Inhalte (umgesetzt im Code)
### Startseite (`app/page.js`)
- JSX-Struktur genauso wie in der Anleitung gefordert, erweitert um Feature-Posts & Call-to-Actions.
- Tailwind Utility-Klassen demonstrieren schnelle Gestaltung.
- `ButtonShowcase` zeigt drei Stylingvarianten (globale Klasse, CSS Module, Tailwind).

### Erste zusätzliche Route (`app/about/page.js`)
- Datei anlegen genügt → Route sofort verfügbar.
- Veranschaulicht, dass keine manuelle Konfiguration notwendig ist.

## Layout-System (`app/layout.js`)
- Importiert `Navigation`, `Sidebar`, `Footer`.
- `children` prop platziert Seiteninhalt zwischen Navigation & Sidebar.
- Layout bleibt beim Navigieren bestehen → ideale Stelle für Navigation, Footer & persistenten Sidebar-Content.
- Demonstriert verschachtelte Layouts: Unterordner könnten eigene `layout.js` hinzufügen.

## Komponentenarchitektur
- **Navigation**: Client Component mit `usePathname` für aktive Links, `SearchBar` integriert (Mock-Suche + Statusmeldung).
- **Sidebar**: nutzt `categories` aus `lib/mockPosts.js`, enthält `NewsletterSignup` als Client-Komponente für Demo-Formhandling.
- **PostList & PostCard**: serverseitige Komponenten, die `mockPosts` rendern und Best Practices (`key`-Prop, `Link`) zeigen.
- **Pagination**: generiert Vor/Zurück-Links basierend auf Hilfsfunktionen aus `lib/mockPosts.js`.

## Styling-Strategien (Teil 3)
1. **Global CSS**: Klasse `.button-global` in `globals.css` + Einsatz in `ButtonShowcase`.
2. **CSS Modules**: `Button.module.css` kapselt Styles, importiert in `ButtonShowcase`.
3. **Tailwind**: Utility-Button im selben Showcase. Studierende können die Unterschiede live vergleichen.

## Daten & Mocking
- `lib/mockPosts.js` simuliert ein Backend: Posts, Kategorien, `getPaginatedPosts`, `getPostById`.
- SVG-Platzhalterbilder in `public/images` erlauben den Einsatz von `next/image` ohne externe Assets.

## Übungen & Hinweise für die Durchführung
- **Exercise 1 (Layout)**: Navigation, Sidebar, Footer bereits implementiert; ideal, um Code gemeinsam nachzuvollziehen.
- **Exercise 2 (Post Listing)**: `app/posts/page.js` setzt Mapping & Pagination um. Diskussionspunkte: `key`, leere Zustände, Komponentenzerlegung.
- **Exercise 3 (Dynamic Routing)**: `app/posts/[id]/page.js` inkl. `generateStaticParams` und `notFound()` zeigt, wie Parameter funktionieren.
- Erweiterungen für die Hausaufgabe (Dark Mode, Kategorienfilter etc.) lassen sich auf Basis dieser Struktur leicht ergänzen.

## Lokales Arbeiten
1. Abhängigkeiten installieren: `npm install` (bereits ausgeführt).
2. Entwicklung starten: `npm run dev`.
3. Linting: `npm run lint` (läuft fehlerfrei).

Viel Erfolg bei der Durchführung der Schulung!

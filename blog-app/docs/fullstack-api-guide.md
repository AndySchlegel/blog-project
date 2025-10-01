# Fullstack Blog – MongoDB & API Dokumentation

## Gesamtüberblick

Dieses Dokument fasst den aktuellen Stand der Blog-Anwendung zusammen. Es ergänzt die bisherigen Lernmaterialien (`doku.md`, `mongodb-doku.md`, `tag2-tag3-bridge.md`) und dient als zentrale Referenz für Datenmodell, API-Routen, Seeds, Utilities und Frontend-Anbindung.

## 1. Datenbank & Modelle

### 1.1 Verbindung (`lib/mongodb.js`)
- Singleton-Caching (`global._mongooseCached`) verhindert Mehrfachverbindungen.
- `strictQuery` aktiviert, Timeout = 5 Sek. → Fehler tauchen im Dev-Mode schnell auf.
- Erwartet `MONGODB_URI` in `.env.local` (bereits angelegt).

### 1.2 Schemas
| Model | Datei | Besonderheiten |
| --- | --- | --- |
| `User` | `models/User.js` | Validierung, Adresse, Avatar, `lieblingsPosts` |
| `Category` | `models/Category.js` | Slug, optionaler Parent, Sichtbarkeit |
| `Post` | `models/Post.js` | Bezug zu User & Kategorie, Tags, Status, Metrics, Methoden/Virtuals |
| `Comment` | `models/Comment.js` | Parent-Referenzen (Threading), Status, Virtual `replies` |
| `NewsletterSubscriber` | `models/NewsletterSubscriber.js` | Double-Opt-In Felder (`confirmedAt`, `unsubscribedAt`) |

### 1.3 Indizes & Helfer
- `Post`: Indizes auf Slug, Status, Kategorie, Tags → schnellere Filter.
- `Comment`: Indizes auf `post` und `parentComment` für Threads.
- `Category`: Index auf `name` & `slug` (Unique).
- `Post`-Methode `.publish()` setzt Status + Datum.

## 2. API-Routen (Next.js App Router)

### 2.1 Architektur
- Alle Routen nutzen `lib/apiHandler.js` (DB-Verbindung, CORS, Fehlerbehandlung).
- Gemeinsamer `ApiError` für Statuscodes + Detailinfos.
- Validation zentral in `lib/validators.js`.
- Pagination-Helfer in `lib/pagination.js`.

### 2.2 Endpoints
| Route | Methoden | Beschreibung |
| --- | --- | --- |
| `/api/posts` | `GET`, `POST` | Liste + Filter (Status, Kategorie, Tag, Suche, Sort) • Erstellen neuer Posts |
| `/api/posts/[id]` | `GET`, `PUT`, `DELETE` | Einzelpost per ID oder Slug lesen, ändern, löschen |
| `/api/posts/[id]/comments` | `GET`, `POST` | Kommentare nach Parent/Status paginiert • neuen Kommentar anlegen |
| `/api/comments/[id]` | `PATCH`, `DELETE` | Inhalte/Status aktualisieren oder Kommentar entfernen |
| `/api/posts/[id]/like` | `POST` | Like/Unlike-Toggle (zählt `metrics.likes`) |
| `/api/posts/[id]/view` | `POST` | View-Counter hochzählen |
| `/api/categories` | `GET`, `POST` | Kategorien lesen/filtern oder neue Kategorie anlegen |
| `/api/categories/[id]` | `GET`, `PUT`, `DELETE` | Kategorie lesen, bearbeiten, löschen (nur ohne referenzierende Posts) |
| `/api/search` | `GET` | Suche über Posts, Tags, Kategorien (`q`, `type`) |
| `/api/stats` | `GET` | Überblicksstatistiken (Posts, Kommentare, Nutzer, Kategorien) |
| `/api/newsletter` | `GET`, `POST` | Newsletter-Abonnenten listen/anlegen (Reaktivierung bei erneutem POST) |

### 2.3 Typische Fehlerantworten
- `400` → Validierung fehlgeschlagen (siehe `details`).
- `404` → Ressource nicht gefunden.
- `409` → Konflikt (z. B. Kategorie noch verknüpft, Subscriber existiert bereits).
- `405` → wird automatisch durch nicht exportierte Handler abgefangen.

## 3. Seeds & Utilities

### 3.1 Seeds
- Datei: `scripts/seed.mjs`
- Befehlsaufruf: `npm run seed`
- Vorgehen: Löscht Collections, legt Kategorien, Users, Posts, Comments, Newsletter-Abos an.
- Posts decken `published` & `draft` ab → Tests für Filter.

### 3.2 Utility-Funktionen (`lib/dbUtils.js`)
- `getPublishedPosts({ page, limit })`
- `getPostByIdentifier(idOrSlug)`
- `getRelatedPosts(postId, limit)`
- `getCategoryOverview()`

## 4. Frontend-Integration

### 4.1 Blog-Übersicht (`app/blog/page.js`)
- Lädt `/api/posts?status=published&limit=20`, zeigt Kategorie & Likes, nutzt `Intl.DateTimeFormat` mit fixer Zeitzone.
- Client-Suche filtert weiterhin lokal (`title`, `content`).

### 4.2 Sidebar (`components/Sidebar.js`)
- Holt Kategorien via `/api/categories`, zeigt Fehlerzustand an.
- Links verwenden Kategorie-Slug für API-konforme Filter.

### 4.3 Newsletter (`components/NewsletterSignup.js`)
- POST `/api/newsletter` mit Email → Erfolgsmeldung oder Alert.
- `submitted` State signalisiert Erfolg.

## 5. Testing & Linting

- `npm run lint` → alle neuen Dateien ESLint-konform.
- API lässt sich mit Thunder Client / Postman testen (siehe Routenübersicht).
- Seed-Skript ermöglicht reproduzierbare Demo-Daten.
- Hinweis: Beim Seed-Skript prüfen wir explizit auf `MONGODB_URI`. Falls Compass noch alte Daten cached, bitte einmal „Reload Data“ nutzen, damit neue Collections erscheinen.
- Mit `type: "module"` und dem angepassten `scripts/seed.mjs` laden wir `.env.local` zuverlässig, sodass Seeds direkt gegen Atlas statt `localhost` laufen (Fehler `ECONNREFUSED ::1:27017` ist damit behoben).

## 6. Nächste Schritte (Empfehlungen)
1. **Auth integrieren**: User aus Session statt Fallback.
2. **Admin UI**: Formulare für Posts/Kategorien/Kommentare.
3. **Caching**: `GET /api/posts` ggf. mit Redis oder in-memory caching versehen.
4. **Rate Limiting**: nochmals auf Per-User-Basis ausbauen.
5. **Tests**: Jest/Vitest für Validatoren und API-Hander hinzufügen.

---
Alle historischen Dokumente liegen jetzt im Ordner `docs/`. Diese Datei dient als Einstiegspunkt für Trainer:innen und Teilnehmende am Tag 3. Viel Erfolg beim weiteren Ausbau! 💪

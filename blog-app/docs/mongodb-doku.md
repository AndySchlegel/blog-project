# MongoDB Integration – Technische Dokumentation

## Überblick
Dieses Dokument beschreibt die MongoDB-Anbindung der Next.js Blog-App nach der Integration von Mongoose. Es fasst Setup-Schritte, Datenmodelle, API-Routen sowie das neue Blog-Frontend zusammen und ergänzt die bestehende Projektdokumentation (`doku.md`).

## Voraussetzungen
- Node.js 18+ (entspricht den Anforderungen von Next.js 15)
- Zugriff auf den MongoDB Atlas Cluster (`mongodb+srv://His4irness:topxur-8baBbi-ziztuv@cluster0.dbohoib.mongodb.net/`)
- Lokale `.env.local` Datei mit gültigem `MONGODB_URI`

```bash
# .env.local Beispiel
MONGODB_URI="mongodb+srv://His4irness:topxur-8baBbi-ziztuv@cluster0.dbohoib.mongodb.net/blog-app"
```

## Installation
1. Abhängigkeiten installieren (bereits ausgeführt):
   ```bash
   npm install
   ```
2. Mongoose wurde hinzugefügt und ist in `package.json` als Laufzeitabhängigkeit vermerkt.
3. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```

## Verbindungsmanagement (`lib/mongodb.js`)
- Cacht die Verbindung in `global._mongooseCached`, um Mehrfachverbindungen durch Hot-Reloading zu vermeiden.
- Aktiviert `mongoose.set('strictQuery', true)` für explizite Filterdefinition.
- Nutzt `serverSelectionTimeoutMS: 5000`, wodurch Atlas-Verbindungsfehler schneller sichtbar werden.

## Datenmodelle
### User (`models/User.js`)
| Feld | Typ | Pflicht | Details |
| --- | --- | --- | --- |
| `name` | String | ✅ | Mindestlänge 2 |
| `email` | String | ✅ | unique, lowercase, Regex-Validierung |
| `alter` | Number | ❌ | Grenzen 0–120 |
| `registriertAm` | Date | ❌ | Default `Date.now()` |
| `hobbies` | [String] | ❌ | Freie Schlagworte |
| `adresse` | Objekt | ❌ | `strasse`, `plz`, `stadt`, `land` (Default "Deutschland") |
| `kategorie` | String | ❌ | Für Batch-Updates (z.B. `minderjährig`) |
| `lieblingsPosts` | [ObjectId] | ❌ | Referenz auf `Post` |

Schema-Option `timestamps: true` ergänzt `createdAt` und `updatedAt` automatisch.

### Post (`models/Post.js`)
| Feld | Typ | Pflicht | Details |
| --- | --- | --- | --- |
| `title` | String | ✅ | max. 100 Zeichen |
| `slug` | String | ✅ (implizit) | unique; wird in der API generiert |
| `content` | String | ✅ | Volltext |
| `author` | ObjectId | ✅ | Referenz auf `User` |
| `tags` | [String] | ❌ | Themencluster |
| `likes` | Number | ❌ | Default 0 |
| `published` | Boolean | ❌ | Default `false` |
| `publishedAt` | Date | ❌ | Automatisch gesetzt durch `publish()` |
| `comments` | Array | ❌ | Enthält Referenzen auf kommentierende User |

Zusätzliche Features:
- Instanzmethode `publish()` setzt `published` und `publishedAt`.
- statische Methode `findPublished()` für schnelle Filter.
- virtuelles Feld `summary` erzeugt eine Kurzfassung des Inhalts.

## API-Routen (`app/api/posts/route.js`)
### `GET /api/posts`
- Baut vor jedem Request eine DB-Verbindung auf (`connectDB()`).
- Liefert veröffentlichte Posts (`published: true`) inklusive:
  - `author` via `.populate('author', 'name email')`
  - Sortierung nach `publishedAt` (neueste zuerst)
  - Limit 10 Ergebnisse
  - Virtuelles Feld `summary` durch `.lean({ virtuals: true })`

### `POST /api/posts`
- Erwartet mindestens `title` und `content` im Body.
- Autor-Strategie:
  1. Nutzt `payload.authorId` (oder `payload.author`).
  2. Fällt auf den ersten vorhandenen User zurück, falls keine ID übergeben wird.
  3. Antwortet mit `400`, wenn kein gültiger User existiert oder die ID ungültig ist.
- Generiert einen Slug über `buildSlug()` und behandelt Duplicate-Key-Fehler (`11000`).

**Beispiel-Request:**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "MongoDB Atlas Einführung",
    "content": "In diesem Beitrag erklären wir...",
    "tags": ["mongodb", "atlas", "tutorial"],
    "published": true,
    "likes": 5,
    "authorId": "<ObjectId eines Users>"
  }'
```

## Blog-Frontend (`app/blog/page.js`)
- Client-Komponente, die beim Mount `GET /api/posts` aufruft.
- Enthält Suchfeld für client-seitige Filterung (`title`/`content`).
- Handhabt Lade- und Fehlerzustände (`loading`, `errorMessage`).
- Rendert Tags, Likes, formatiertes Veröffentlichungsdatum sowie den `summary`-Fallback.

## CRUD-Workflows mit Mongoose
- **Create:** `await User.create({ ... })` oder `new User().save()`.
- **Read:** `await User.find(filter).lean()` für Performance.
- **Update:** `await User.findByIdAndUpdate(id, update, { new: true })` für direktes Ergebnis.
- **Delete:** `await User.findByIdAndDelete(id)`.
- Beispiele & Operatoren sind in den Code-Kommentaren und in den Lehrmaterialien dokumentiert.

## Tests & Validierung
- Keine automatisierten Tests hinzugefügt; empfohlen ist ein manueller API-Test mit `curl`, Insomnia oder dem integrierten Next.js RSC Dev-Tool.
- Für Linting `npm run lint` ausführen.

## Troubleshooting
| Problem | Ursache | Lösung |
| --- | --- | --- |
| `MongoServerError: bad auth` | Falsche Zugangsdaten oder IP nicht freigegeben | Zugang prüfen, ggf. IP in Atlas whitelist hinzufügen |
| `OverwriteModelError` | Modell mehrfach registriert | In beiden Modellen wird `mongoose.models.<Name>` wiederverwendet |
| `CastError: ObjectId` | Ungültiger Parameter in API | In `POST`-Route wird `mongoose.isValidObjectId` verwendet; Response `400` |
| Keine Posts im Frontend | `published` auf `false` | Post veröffentlichen (`post.publish()` oder `published: true` setzen) |

## Nächste Schritte / Erweiterungen
1. Authentication integrieren (z.B. NextAuth) und Autor aus Session ableiten.
2. PUT/PATCH/DELETE Routen ergänzen, um vollständiges CRUD anzubieten.
3. Aggregationen oder Indizes (`postSchema.index`) hinzufügen, sobald reale Datenmengen vorliegen.
4. Unit-Tests für `buildSlug()` und die API-Routen schreiben (z.B. mit Jest oder Vitest).

---
Fragen oder Anpassungswünsche? → Siehe Code-Kommentare oder melde dich direkt im Projekt-Repo.

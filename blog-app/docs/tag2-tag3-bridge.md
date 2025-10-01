# 🌉 Die Brücke von Tag 2 zu Tag 3

## Status Quo nach Tag 2

### Was wir bereits sicher beherrschen ✅

Gestern haben wir MongoDB und Mongoose direkt auf dem Server genutzt:

```javascript
// Serverseitiger Zugriff funktioniert
const user = await User.create({
  name: 'Max',
  email: 'max@example.de'
})

const posts = await Post.find({ author: user._id })
```

**Kernerkenntnisse von Tag 2**
- 📦 Dokumentenorientierte Speicherung mit MongoDB
- 🏗️ Struktur und Validierung über Mongoose-Schemas
- 💾 Vollständige CRUD-Operationen auf dem Server
- 🔗 Relationen via Referenzen (`ObjectId`) umsetzbar

## Die Lücke zum Frontend 🤔

Im Browser steht weder Node.js noch eine direkte MongoDB-Verbindung bereit:

```javascript
// ❌ Funktioniert nicht clientseitig!
import User from '../models/User'
const users = await User.find() // Browser hat keine DB-Verbindung
```

Wir benötigen also eine Vermittlungsschicht, die Browser-Requests entgegennimmt und serverseitig Mongoose nutzt.

## Die Lösung: API Routes als Kellner 🚀

```
Browser (Gast)
   ↓  HTTP Request (z.B. GET /api/posts)
API Route (Kellner)
   ↓  Serverseitiges Mongoose
MongoDB (Küche)
``` 

### Vergleich: Gestern vs. Heute

| Kontext | Gestern (direkt) | Heute (über API) |
| --- | --- | --- |
| Create | `await Post.create(data)` | `POST /api/posts → await Post.create(data)` |
| Read | `await Post.find()` | `GET /api/posts` → JSON Response |
| Update | `await Post.findByIdAndUpdate(id, data)` | `PUT /api/posts/:id` |
| Delete | `await Post.findByIdAndDelete(id)` | `DELETE /api/posts/:id` |

## Architekturüberblick der Blog-App

```
┌───────────────────────────────────────────┐
│ FRONTEND                                   │
│ - React/Next.js Components                 │
│ - fetch('/api/posts')                      │
└───────────────┬───────────────────────────┘
                │ HTTP Request/Response
┌───────────────▼───────────────────────────┐
│ API ROUTES                                 │
│ - Serverseitig, Zugriff auf Mongoose       │
│ - Validierung & Fehlerbehandlung           │
└───────────────┬───────────────────────────┘
                │ Mongoose ORM
┌───────────────▼───────────────────────────┐
│ MONGODB                                      │
│ - Speichert Dokumente                       │
└───────────────────────────────────────────┘
```

## Schritt-für-Schritt Workflow

### 1️⃣ Frontend sendet Request (`fetch`)

```javascript
// app/blog/new/page.js (Client Component)
'use client'

export default function NewPostPage() {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: event.target.title.value,
        content: event.target.content.value
      })
    })

    const result = await response.json()
    console.log('Post erstellt:', result)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Titel" />
      <textarea name="content" placeholder="Inhalt" />
      <button type="submit">Post erstellen</button>
    </form>
  )
}
```

### 2️⃣ API Route verarbeitet Request

```javascript
// app/api/posts/route.js
import connectDB from '@/lib/mongodb'
import Post from '@/models/Post'

export async function POST(request) {
  await connectDB()

  try {
    const data = await request.json()
    const post = await Post.create({
      title: data.title,
      content: data.content,
      author: '...', // Platzhalter bis Auth integriert ist
      publishedAt: new Date()
    })

    return Response.json({ success: true, data: post }, { status: 201 })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 400 })
  }
}
```

### 3️⃣ MongoDB speichert das Dokument

Mongoose kümmert sich um Schema-Validierung, Standardwerte und das Persistieren in der Collection.

## Toolbox für Tag 3

1. **RESTful API Design** – korrekte HTTP-Methoden, Pfade, Statuscodes
2. **Erweiterte Abfragen** – Filter, Sortierung, Pagination, Suche
3. **Fehlerbehandlung** – Validation, differenzierte Fehlermeldungen, Logging
4. **API Testing** – Postman/Thunder Client & automatisierte Tests

## Fragen & Antworten

**➡️ Kann ich die Blog-Seite bereits im Browser aufrufen?**
Ja. Die Blog-Seite (`/blog`) ruft die `GET /api/posts` Route auf und zeigt veröffentlichte Posts an.

**➡️ Kann ich bereits neue Posts über das Frontend anlegen?**
Noch nicht. Eine dedizierte Client-Ansicht zum Erstellen ist in Arbeit; aktuell können neue Posts z.B. per API-Tool (Postman) oder direkt über Mongoose (Node.js Scripts) erzeugt werden.

**➡️ Sind die MongoDB-Zugangsdaten schon hinterlegt?**
Nein. Bitte trage den Connection String selbst in `.env.local` ein:

```bash
MONGODB_URI="mongodb+srv://His4irness:topxur-8baBbi-ziztuv@cluster0.dbohoib.mongodb.net/blog-app"
```

Danach `npm run dev` starten, damit Next.js die Umgebungsvariable beim Build sieht.

## Ausblick auf Tag 4 & 5 (Sneak Peek)

- 🔐 Authentication & Autorisierung
- 💬 Kommentare & Reaktionen
- 📊 Analytics und komplexe Aggregationen
- 🚀 Deployment und Production-Best-Practices

---
**Merke:** Gestern haben wir kochen gelernt (Daten speichern), heute servieren wir (APIs bauen). Morgen sorgen wir dafür, dass nur zahlende Gäste bestellen dürfen (Auth & Security). Viel Erfolg bei Tag 3! 🎯

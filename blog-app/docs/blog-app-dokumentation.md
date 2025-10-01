# Blog-App Dokumentation

Diese Datei beschreibt die wichtigsten Informationen zur Blog-App, wie du sie lokal startest, welche Umgebung sie benötigt und wie der zuletzt aufgetretene Fehler behoben wurde. Die Erklärung ist bewusst ausführlich gehalten, damit du jeden Schritt schnell nachvollziehen kannst.

## 1. Überblick
- **Technologien**: Next.js 15 (App Router), React 19, Tailwind CSS 4, MongoDB (über Mongoose), JSON Web Tokens für Authentifizierung.
- **Hauptfunktionen**: Öffentlicher Blog-Bereich, Login/Registrierung, Dashboard für eingeloggte Nutzende, REST-APIs unter `/api/*`.
- **Deployment-Ziel**: Produktionsbuild wird über `npm run build` erstellt, Auslieferung via `next start`.

## 2. Projektstruktur (Auszug)
```
app/                # Next.js Routen (Seiten, Layouts, API-Endpunkte)
components/         # Wiederverwendbare UI-Komponenten
contexts/           # React Contexts (z. B. AuthContext)
docs/               # Dokumentationen (inkl. dieser Datei)
lib/                # Hilfsfunktionen (DB-Verbindung, Auth-Utilities)
models/             # Mongoose-Modelle
public/             # Statische Assets
scripts/            # Hilfsskripte wie Seed-Daten
```

## 3. Voraussetzungen
- Node.js **>= 18.18** (Next.js 15 benötigt mindestens Node 18).
- npm (wird mit Node installiert).
- Zugriff auf eine MongoDB-Instanz (lokal oder gehostet).

## 4. Installation & Setup
1. Repository klonen oder lokalen Ordner öffnen.
2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
3. Umgebungsvariablen in `.env.local` definieren (Datei liegt im Projektroot neben `package.json`). Beispiel:
   ```ini
   MONGODB_URI=mongodb://localhost:27017/mein-blog
   JWT_SECRET=dein-geheimes-passwort
   ```
   - `MONGODB_URI`: Verbindungsstring zu deiner MongoDB.
   - `JWT_SECRET`: Beliebiger geheimer String, wird zum Signieren der Tokens genutzt.
4. Optional Seed-Daten einspielen:
   ```bash
   npm run seed
   ```
   Das Skript `scripts/seed.mjs` erwartet, dass `MONGODB_URI` gesetzt ist.

## 5. Entwicklungs- und Produktionsbefehle
- **Lokaler Dev-Server**: `npm run dev`
  - Läuft standardmäßig auf `http://localhost:3000`.
- **Linting**: `npm run lint`
  - Führt ESLint mit den Next.js-Regeln aus.
- **Produktionsbuild**: `npm run build`
  - Erstellt optimierten Build; sollte fehlerfrei durchlaufen.
- **Produktionsserver starten**: `npm run start`
  - Startet den zuvor erstellten Build auf Port 3000.

## 6. Wichtige Systeme
### Authentifizierung
- `contexts/AuthContext.js` verwaltet Login, Registrierung, Logout und den aktuellen User.
- Server-seitig existieren API-Routen unter `app/api/auth/*` für Login/Logout/Register/Me.
- Tokens werden per Cookie (`httpOnly`, `secure` in Produktion) gesetzt.

### Datenbank
- `lib/mongodb.js` stellt die Verbindung zu MongoDB her.
- Modelle liegen in `models/` (z. B. `models/User.js`).

## 7. Debugging-Historie & behobener Fehler
### Problem
Beim Ausführen von `npm run build` brach der Build mit folgendem Fehler ab:
```
⨯ useSearchParams() should be wrapped in a suspense boundary at page "/login"...
```
Die Login- und Register-Seiten nutzten `useSearchParams`, waren jedoch nicht in eine React-Suspense-Grenze eingebettet. Next.js verlangt bei dieser Hook-Nutzung während des Pre-Renderings (Sobald statisches HTML erzeugt wird) eine Suspense-Umgebung.

### Analyse
- Fehler trat nur beim Produktionsbuild auf, da hier Seiten vorgerendert werden.
- Betroffene Dateien: `app/login/page.js`, `app/register/page.js`.
- `useSearchParams` wird benötigt, um die optionale Query `callbackUrl` auszulesen.

### Lösungsschritte
1. Die Seitenlogik (Formular, Hooks) wurde in jeweils eine neue Komponente (`LoginPageContent`, `RegisterPageContent`) ausgelagert.
2. Beide Seiten rendern diese Komponenten nun innerhalb von `<Suspense>`.
3. Zusätzlich wurde ein kleines Skeleton (`LoginPageFallback`, `RegisterPageFallback`) als Fallback hinzugefügt, damit Nutzende während des Ladens ein visuelles Feedback bekommen.
4. Nach der Anpassung lief `npm run lint` sowie `npm run build` ohne Fehler durch.

### Ergebnis
- Der Build ist stabil.
- Login/Registrierung funktionieren weiterhin im Dev- und Produktionsmodus.
- Beim Seitenaufruf ohne Session erscheint weiterhin der erwartete `401 Nicht authentifiziert`-Response, bis ein Login erfolgt.

## 8. Verifikation nach dem Fix
Folgende Befehle wurden erfolgreich ausgeführt:
- `npm run lint`
- `npm run build`
- `npm run dev` (manueller Test: Login -> Dashboard -> Blog)

## 9. Bekannte Hinweise
- Bei einem frischen Start ohne Login meldet `/api/auth/me` erwartungsgemäß `Nicht authentifiziert.`. Dies ist normal und kein Fehler.
- Achte darauf, `JWT_SECRET` für produktive Umgebungen **nicht** auf dem Standardwert zu belassen.

## 10. Nächste Schritte / Empfehlungen
- Optional automatische Tests für Auth-Flüsse ergänzen.
- README noch anpassen, damit erhalte generische Next.js-Hinweise durch projektspezifische ersetzt werden.
- Monitoring der MongoDB-Verbindung (z. B. Retry-Strategie) einplanen, falls die App live geht.

Viel Erfolg bei der weiteren Entwicklung! Bei Fragen kannst du jederzeit auf diese Dokumentation zurückgreifen.

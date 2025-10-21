# Blog Project

Eine moderne Blog-Anwendung gebaut mit Next.js 15, React 19 und MongoDB.

**Live-Demo**: [blog-app.his4irness23.de](https://blog-app.his4irness23.de)

## Quick Start

```bash
cd blog-app
npm install
cp .env.local.example .env.local  # Konfiguriere deine Umgebungsvariablen
npm run dev
```

App läuft auf [http://localhost:3000](http://localhost:3000)

## Entwicklungs-Workflow

### 1. Entwickeln im `developer` Branch

```bash
git checkout developer
git pull origin developer

# Mache deine Änderungen...

npm run lint    # Prüfe Code-Qualität
npm run build   # Teste Production Build
npm run dev     # Teste lokal

git add .
git commit -m "Beschreibung der Änderungen"
git push origin developer
```

### 2. Pull Request erstellen

- Gehe zu GitHub und erstelle einen PR von `developer` → `main`
- Tests laufen automatisch via GitHub Actions
- Nach erfolgreichen Tests: Merge den PR

### 3. Automatisches Deployment

Nach dem Merge auf `main`:
- ✅ GitHub Actions deployed automatisch auf die Synology NAS
- ✅ App ist erreichbar unter blog-app.his4irness23.de

## Dokumentation

| Datei | Beschreibung |
|-------|--------------|
| **[CLAUDE.md](CLAUDE.md)** | Technische Architektur-Dokumentation für Claude Code |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Vollständiger Deployment-Guide (Git Workflow, SSH, Troubleshooting) |
| **[.github/SETUP.md](.github/SETUP.md)** | GitHub Actions Setup-Anleitung |
| **[blog-app/README.md](blog-app/README.md)** | App-spezifische Dokumentation (DE) |
| **[blog-app/docs/](blog-app/docs/)** | Detaillierte technische Dokumentation |

## Technologie-Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes, MongoDB (Mongoose)
- **Auth**: JWT (httpOnly cookies)
- **Deployment**: Docker, nginx reverse proxy, Synology NAS
- **CI/CD**: GitHub Actions

## Wichtige Befehle

```bash
cd blog-app

npm run dev      # Development Server
npm run build    # Production Build
npm run start    # Production Server
npm run lint     # ESLint
npm run seed     # Datenbank mit Beispieldaten füllen
```

## Branch-Strategie

- **`main`** - Production (deployed auf blog-app.his4irness23.de)
- **`developer`** - Development (alle neuen Features)

**⚠️ Wichtig**: Niemals direkt auf `main` pushen! Immer Pull Requests nutzen.

## Environment Variablen

Erstelle `.env.local` in `blog-app/`:

```ini
MONGODB_URI=mongodb://localhost:27017/mein-blog
JWT_SECRET=your-secret-key-here
AUTH_COOKIE_SECURE=false  # true für Production mit HTTPS
```

## Features

- ✅ User Authentifizierung (Login/Register)
- ✅ Blog-Post Management
- ✅ Kommentar-System
- ✅ Kategorien
- ✅ Newsletter-Anmeldung
- ✅ Suchfunktion
- ✅ Dashboard für eingeloggte User
- ✅ Responsive Design

## GitHub Actions Workflows

### Test Workflow
Läuft bei: PRs und Pushes zu `developer`
- ESLint Code-Qualität Check
- Production Build Test

### Deploy Workflow
Läuft bei: Merge/Push zu `main`
- SSH Deploy zur Synology NAS
- Docker Container rebuild
- Automatische Verifikation

## Deployment Setup

Für automatisches Deployment benötigte GitHub Secrets:
- `SYNOLOGY_HOST`
- `SYNOLOGY_USER`
- `SYNOLOGY_SSH_KEY`
- `SYNOLOGY_SSH_PORT`
- `SYNOLOGY_APP_PATH`

Siehe [.github/SETUP.md](.github/SETUP.md) für detaillierte Setup-Anleitung.

## Lokales Docker Setup

```bash
cd blog-app
docker compose up --build

# App: http://localhost:3000
# nginx: http://localhost:8080
```

## Support

Bei Fragen oder Problemen:
- 📖 Lies [DEPLOYMENT.md](DEPLOYMENT.md) für Troubleshooting
- 🔧 Prüfe [GitHub Actions](../../actions) Logs
- 📝 Siehe [blog-app/docs/](blog-app/docs/) für technische Details

## Lizenz

Dieses Projekt dient Ausbildungs- und Übungszwecken.

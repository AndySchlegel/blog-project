# Deployment Guide

Dieser Guide beschreibt den vollständigen Workflow für die Entwicklung und das Deployment der Blog-App auf die Synology NAS.

## Git Workflow

### Branch-Strategie

- **`main`** - Produktionscode, deployed auf blog-app.his4irness23.de
- **`developer`** - Entwicklungsbranch für alle neuen Features und Änderungen

### Entwicklungs-Workflow

```bash
# 1. Wechsel zum developer branch
git checkout developer

# 2. Stelle sicher, dass du auf dem neuesten Stand bist
git pull origin developer

# 3. Entwickle deine Features/Änderungen
# ... mache deine Änderungen ...

# 4. Teste lokal
cd blog-app
npm run lint        # ESLint muss ohne Fehler durchlaufen
npm run build       # Build muss erfolgreich sein
npm run dev         # Teste die App lokal

# 5. Commit & Push
git add .
git commit -m "Beschreibung der Änderungen"
git push origin developer
```

### Pull Request erstellen

1. Gehe zu GitHub: https://github.com/[dein-username]/blog-project
2. Klicke auf "Pull requests" → "New pull request"
3. Base: `main` ← Compare: `developer`
4. Fülle die PR-Vorlage aus (wird automatisch geladen)
5. Warte auf erfolgreiche Tests (GitHub Actions)
6. Review und merge den PR

**Wichtig**: Nach dem Merge auf `main` wird automatisch das Deployment auf die Synology gestartet!

## GitHub Actions Setup

### Benötigte Secrets

Gehe zu GitHub → Settings → Secrets and variables → Actions → "New repository secret"

Füge folgende Secrets hinzu:

| Secret Name | Beschreibung | Beispiel |
|------------|--------------|----------|
| `SYNOLOGY_HOST` | IP oder Domain deiner Synology | `blog-app.his4irness23.de` oder `192.168.x.x` |
| `SYNOLOGY_USER` | SSH Benutzername | `admin` oder dein User |
| `SYNOLOGY_SSH_KEY` | Private SSH Key für Authentifizierung | Inhalt von `~/.ssh/id_rsa` |
| `SYNOLOGY_SSH_PORT` | SSH Port (optional, default: 22) | `22` oder dein custom Port |
| `SYNOLOGY_APP_PATH` | Pfad zum Repo auf der Synology | `/volume1/docker/blog-project` |

### SSH Key generieren (falls noch nicht vorhanden)

```bash
# Auf deinem lokalen Rechner
ssh-keygen -t ed25519 -C "github-actions-deploy"

# Public Key auf Synology kopieren
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@synology-ip

# Private Key für GitHub kopieren
cat ~/.ssh/id_ed25519
# → Inhalt in SYNOLOGY_SSH_KEY Secret einfügen
```

## Workflows

### 1. Test Workflow (`test.yml`)

**Wird ausgeführt bei:**
- Pull Requests zu `main` oder `developer`
- Push zu `developer`

**Was wird getestet:**
- ✅ ESLint (Code-Qualität)
- ✅ Production Build
- ✅ Build-Output Verifikation

### 2. Deploy Workflow (`deploy.yml`)

**Wird ausgeführt bei:**
- Push/Merge zu `main`
- Manuell über GitHub UI (workflow_dispatch)

**Was passiert:**
1. Verbindung zur Synology via SSH
2. Git Pull auf `main` branch
3. Docker Container neu bauen
4. Container starten
5. Alte Images aufräumen
6. Deployment verifizieren

## Manuelles Deployment (falls GitHub Actions nicht genutzt wird)

### SSH in Synology

```bash
ssh your-user@blog-app.his4irness23.de
```

### Update & Restart

```bash
# Navigiere zum Projekt
cd /volume1/docker/blog-project  # Passe den Pfad an!

# Pull neuesten Code
git fetch origin
git checkout main
git pull origin main

# Docker Container neu starten
cd blog-app
docker compose down
docker compose build --no-cache
docker compose up -d

# Status prüfen
docker compose ps
docker compose logs -f app
```

### Logs anschauen

```bash
# Live logs
docker compose logs -f app

# Letzte 100 Zeilen
docker compose logs --tail=100 app

# Logs eines bestimmten Services
docker compose logs nginx
```

## Rollback bei Problemen

```bash
# SSH in Synology
cd /volume1/docker/blog-project

# Zu vorherigem Commit zurück
git log --oneline -10  # Finde den letzten guten Commit
git checkout main
git reset --hard <commit-hash>

# Container neu starten
cd blog-app
docker compose down
docker compose up -d --build
```

## Wichtige Prüfungen vor dem Merge

- [ ] `npm run lint` läuft ohne Fehler
- [ ] `npm run build` erstellt erfolgreich einen Build
- [ ] Änderungen wurden lokal getestet
- [ ] GitHub Actions Tests sind grün ✅
- [ ] Keine `.env` Secrets im Code committed
- [ ] Neue Environment-Variablen sind in `.env.docker` auf Synology konfiguriert

## Troubleshooting

### GitHub Actions Deployment schlägt fehl

1. Prüfe GitHub Actions Logs unter "Actions" Tab
2. Verifiziere SSH Verbindung:
   ```bash
   ssh -i ~/.ssh/id_ed25519 user@synology-ip
   ```
3. Prüfe Secrets in GitHub Settings
4. Stelle sicher, dass der Pfad `SYNOLOGY_APP_PATH` korrekt ist

### Docker Container startet nicht

```bash
# Auf Synology
cd /volume1/docker/blog-project/blog-app

# Logs prüfen
docker compose logs app

# Container Status
docker compose ps

# Container manuell starten
docker compose up app
```

### MongoDB Verbindungsfehler

1. Prüfe `.env.docker` in `/volume1/docker/blog-project/blog-app/`
2. Stelle sicher, dass `MONGODB_URI` korrekt ist
3. Teste MongoDB-Verbindung:
   ```bash
   docker compose exec app node -e "require('./lib/mongodb.js')"
   ```

## Monitoring

### Health Check

```bash
# HTTP Status prüfen
curl -I https://blog-app.his4irness23.de

# API Endpunkt testen
curl https://blog-app.his4irness23.de/api/posts
```

### Container Ressourcen

```bash
# Auf Synology
docker stats blog-app blog-nginx
```

## Best Practices

1. **Immer im `developer` branch entwickeln**
2. **Niemals direkt in `main` pushen**
3. **Pull Requests nutzen für Code-Review**
4. **Tests lokal laufen lassen vor dem Push**
5. **Descriptive Commit-Messages schreiben**
6. **Environment-Variablen nie committen**
7. **Nach Deployment die Live-Site prüfen**

## Nützliche Befehle

```bash
# Aktuellen Branch anzeigen
git branch

# Zwischen Branches wechseln
git checkout developer
git checkout main

# Änderungen vom Remote holen
git fetch origin
git pull origin developer

# Status prüfen
git status

# Commit History
git log --oneline -10

# Unterschiede anzeigen
git diff main developer
```

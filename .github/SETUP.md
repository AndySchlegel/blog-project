# GitHub Actions Setup für automatisches Deployment

Diese Anleitung hilft dir, GitHub Actions für automatisches Deployment auf deine Synology NAS einzurichten.

## Schritt 1: SSH Key erstellen (falls noch nicht vorhanden)

### Auf deinem lokalen Rechner:

```bash
# Erstelle einen neuen SSH Key speziell für GitHub Actions
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/synology_deploy

# Das erstellt zwei Dateien:
# - ~/.ssh/synology_deploy (Private Key - für GitHub)
# - ~/.ssh/synology_deploy.pub (Public Key - für Synology)
```

### Public Key auf Synology installieren:

**Option A - Mit ssh-copy-id:**
```bash
ssh-copy-id -i ~/.ssh/synology_deploy.pub user@blog-app.his4irness23.de
```

**Option B - Manuell:**
1. SSH in deine Synology: `ssh user@blog-app.his4irness23.de`
2. Öffne (oder erstelle) `~/.ssh/authorized_keys`
3. Füge den Inhalt von `~/.ssh/synology_deploy.pub` hinzu:
   ```bash
   cat ~/.ssh/synology_deploy.pub >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```

### Teste die Verbindung:
```bash
ssh -i ~/.ssh/synology_deploy user@blog-app.his4irness23.de
```

## Schritt 2: GitHub Secrets konfigurieren

1. Gehe zu deinem GitHub Repository
2. Klicke auf **Settings** (oben rechts)
3. Im linken Menü: **Secrets and variables** → **Actions**
4. Klicke auf **New repository secret**

### Erstelle folgende Secrets:

#### 1. SYNOLOGY_HOST
- **Name**: `SYNOLOGY_HOST`
- **Value**: `blog-app.his4irness23.de` (oder deine IP-Adresse)

#### 2. SYNOLOGY_USER
- **Name**: `SYNOLOGY_USER`
- **Value**: Dein SSH Benutzername (z.B. `admin` oder dein Username)

#### 3. SYNOLOGY_SSH_KEY
- **Name**: `SYNOLOGY_SSH_KEY`
- **Value**: Kopiere den kompletten Inhalt des **Private Keys**:
  ```bash
  cat ~/.ssh/synology_deploy
  ```
  **Wichtig**: Kopiere ALLES, inkl. `-----BEGIN OPENSSH PRIVATE KEY-----` und `-----END OPENSSH PRIVATE KEY-----`

#### 4. SYNOLOGY_SSH_PORT (optional)
- **Name**: `SYNOLOGY_SSH_PORT`
- **Value**: `22` (oder dein custom SSH Port, falls geändert)

#### 5. SYNOLOGY_APP_PATH
- **Name**: `SYNOLOGY_APP_PATH`
- **Value**: Der vollständige Pfad zum Repository auf der Synology
- **Beispiel**: `/volume1/docker/blog-project`

Um den Pfad herauszufinden:
```bash
ssh user@blog-app.his4irness23.de
pwd  # zeigt aktuellen Pfad
cd /zum/repo/
pwd  # zeigt Repository-Pfad
```

## Schritt 3: Repository-Setup auf Synology

Stelle sicher, dass auf der Synology:

1. **Git installiert ist**:
   ```bash
   git --version
   ```

2. **Repository geklont wurde**:
   ```bash
   cd /volume1/docker/  # oder dein Pfad
   git clone https://github.com/[dein-username]/blog-project.git
   cd blog-project
   ```

3. **Docker und Docker Compose funktionieren**:
   ```bash
   docker --version
   docker compose version
   ```

4. **.env.docker existiert** in `blog-project/blog-app/`:
   ```bash
   cd /volume1/docker/blog-project/blog-app
   ls -la .env.docker
   ```

## Schritt 4: GitHub Actions testen

### Manueller Test:

1. Gehe zu deinem GitHub Repository
2. Klicke auf **Actions** (oben im Menü)
3. Links: Wähle **Deploy to Synology**
4. Rechts: Klicke auf **Run workflow**
5. Wähle Branch: `main`
6. Klicke auf grünen **Run workflow** Button

### Wenn der Workflow läuft:

- ✅ Grüner Haken = Erfolg
- ❌ Rotes X = Fehler (klicke drauf für Details)

## Schritt 5: Automatisches Deployment einrichten

Nach erfolgreicher manueller Test:

1. Merge einen PR von `developer` → `main`
2. GitHub Actions startet automatisch
3. App wird auf Synology deployed
4. Prüfe: https://blog-app.his4irness23.de

## Troubleshooting

### Fehler: "Permission denied (publickey)"

**Problem**: SSH Key nicht korrekt installiert

**Lösung**:
```bash
# Teste SSH Verbindung
ssh -i ~/.ssh/synology_deploy user@blog-app.his4irness23.de

# Public Key erneut auf Synology kopieren
ssh-copy-id -i ~/.ssh/synology_deploy.pub user@blog-app.his4irness23.de
```

### Fehler: "repository not found" oder "directory not found"

**Problem**: `SYNOLOGY_APP_PATH` ist falsch

**Lösung**:
1. SSH in Synology
2. Finde korrekten Pfad: `cd blog-project && pwd`
3. Update GitHub Secret `SYNOLOGY_APP_PATH`

### Fehler: "docker: command not found"

**Problem**: Docker nicht im PATH oder nicht installiert

**Lösung**:
```bash
# Auf Synology
which docker  # zeigt Docker Pfad

# Falls Docker in /usr/local/bin/docker liegt, update Workflow:
# Ersetze "docker compose" mit "/usr/local/bin/docker compose"
```

### Fehler: "Container fails to start"

**Problem**: `.env.docker` fehlt oder ist fehlerhaft

**Lösung**:
```bash
# Auf Synology
cd /volume1/docker/blog-project/blog-app
cat .env.docker  # Prüfe Inhalt

# Minimal-Konfiguration:
MONGODB_URI=mongodb://your-mongo-uri
JWT_SECRET=your-production-secret
AUTH_COOKIE_SECURE=false
```

## Workflow deaktivieren

Falls du temporär kein automatisches Deployment möchtest:

1. Gehe zu `.github/workflows/deploy.yml`
2. Kommentiere die `on:` Section aus:
   ```yaml
   # on:
   #   push:
   #     branches:
   #       - main
   ```
3. Commit & Push
4. Nur noch manuelles Deployment möglich

## Nützliche Befehle

### GitHub Secrets anzeigen
Secrets können aus Sicherheitsgründen **nicht angezeigt** werden, nur erstellt/bearbeitet.

### Workflow Logs ansehen
1. GitHub → Actions
2. Klicke auf einen Workflow-Run
3. Klicke auf Job "Deploy to Production"
4. Siehe detaillierte Logs

### Deployment Status prüfen
```bash
# Auf Synology
cd /volume1/docker/blog-project/blog-app
docker compose ps
docker compose logs --tail=50 app
```

## Sicherheits-Tipps

- ✅ Nutze dedizierte SSH Keys (nicht deinen persönlichen Key)
- ✅ Setze SSH Key Passphrase (optional)
- ✅ Beschränke SSH User-Rechte auf Synology
- ✅ Regelmäßig Secrets rotieren
- ❌ Teile niemals Private Keys oder Secrets
- ❌ Committe niemals Secrets ins Repository

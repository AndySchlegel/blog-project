#!/usr/bin/env node

import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

dotenv.config({ path: '.env.local' })

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI ist nicht gesetzt. Bitte .env.local prüfen.')
  process.exit(1)
}

const [{ default: dbConnect }, { default: Category }, { default: User }, { default: Post }, { default: Comment }, { default: NewsletterSubscriber }] = await Promise.all([
  import('../lib/mongodb.js'),
  import('../models/Category.js'),
  import('../models/User.js'),
  import('../models/Post.js'),
  import('../models/Comment.js'),
  import('../models/NewsletterSubscriber.js')
])

/**
 * Tech Blog Seed Script
 * Erstellt professionelle Blog-Inhalte für Java DevOps Engineer Blog
 */

const CATEGORIES = [
  {
    name: 'AWS & Cloud',
    slug: 'aws-cloud',
    description: 'AWS Zertifizierungen, Cloud Architecture und Best Practices',
    icon: 'cloud'
  },
  {
    name: 'DevOps & Infrastructure',
    slug: 'devops',
    description: 'CI/CD, Docker, Kubernetes und Infrastructure as Code',
    icon: 'server'
  },
  {
    name: 'Homelab & Self-Hosting',
    slug: 'homelab',
    description: 'NAS Setup, VPN, Self-Hosted Services und Homelab Projekte',
    icon: 'home'
  },
  {
    name: 'Networking & Security',
    slug: 'networking',
    description: 'VPN, Reverse Proxy, DNS und Security Best Practices',
    icon: 'shield'
  },
  {
    name: 'Tools & Productivity',
    slug: 'tools',
    description: 'Development Tools, Terminal Setup und Workflow Automation',
    icon: 'wrench'
  }
]

const USERS = [
  {
    name: 'Andy Schlegel',
    email: 'andy@blog-app.his4irness23.de',
    password: 'admin123',
    hobbies: ['Cloud Architecture', 'DevOps', 'Self-Hosting'],
    adresse: { stadt: 'Deutschland', land: 'Germany' },
    kategorie: 'admin',
    avatar: '/images/avatar-andy.jpg'
  }
]

const TECH_BLOG_POSTS = [
  {
    title: 'Synology DS925+ als DevOps Homelab: Der komplette Setup-Guide',
    slug: 'synology-ds925-devops-homelab-setup',
    excerpt: 'Vom Unboxing bis zum ersten Docker-Container: Wie ich meine Synology DS925+ als zentrale Homelab-Platform eingerichtet habe.',
    content: `# Synology DS925+ als DevOps Homelab: Der komplette Setup-Guide

Als Java DevOps Engineer wollte ich schon lange eine zentrale Platform für meine Self-Hosting Projekte. Die Wahl fiel auf die **Synology DS925+** - und das aus gutem Grund.

## Warum die DS925+?

Die DS925+ bringt einige spannende Features mit:

- **AMD Ryzen V1500B** (4 Cores) - genug Power für mehrere Container
- **Bis zu 32GB RAM** - ideal für Docker Workloads
- **Dual 2.5GB Ethernet** - schnelle Netzwerkanbindung
- **NVMe Cache Support** - Performance-Boost für Datenbanken
- **Native Docker Unterstützung** - Container Manager out of the box

## Initial Setup

Der Setup-Prozess war überraschend smooth:

1. **Synology Assistant** findet das NAS im lokalen Netzwerk automatisch
2. **DSM 7.2 Installation** dauert ca. 15 Minuten
3. Nach dem Reboot: Admin-Account anlegen und Storage konfigurieren

### Storage Pool Setup

Ich habe mich für eine **RAID 5 Konfiguration** entschieden:
- Guter Kompromiss zwischen Performance, Redundanz und Kapazität
- Ein Drive kann ausfallen, ohne Datenverlust
- Für ein Homelab völlig ausreichend

## Docker & Container Manager

Der Container Manager ist das Herzstück meines Setups:

\`\`\`bash
# Container Manager aus dem Package Center installieren
# Dann direkt mit Docker Compose arbeiten:

version: '3.8'
services:
  my-first-app:
    image: nginx:latest
    ports:
      - "8080:80"
    restart: always
\`\`\`

### Alternative: Portainer

Viele in der Community schwören auf **Portainer** statt Container Manager:

\`\`\`bash
docker volume create portainer_data

docker run -d \\
  -p 9443:9443 \\
  --name portainer \\
  --restart=always \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v portainer_data:/data \\
  portainer/portainer-ce:latest
\`\`\`

Access über: \`https://nas-ip:9443\`

## Netzwerk-Konfiguration

Wichtige Settings für ein DevOps Setup:

### Statische IP vergeben
- **Control Panel → Network → Network Interface**
- Statische IP setzen (z.B. 192.168.1.10)
- DNS Server: 1.1.1.1 (Cloudflare) oder 8.8.8.8 (Google)

### SSH aktivieren
- **Control Panel → Terminal & SNMP**
- SSH Service aktivieren (Port 22 oder custom)
- **Wichtig**: Nur mit SSH Key Auth arbeiten!

\`\`\`bash
# SSH Key auf NAS kopieren
ssh-copy-id -i ~/.ssh/id_ed25519.pub admin@192.168.1.10

# Testen
ssh admin@192.168.1.10
\`\`\`

## Erste Projekte deployen

### Projekt 1: Diese Blog-App!

Genau diese Blog-App läuft produktiv auf meiner DS925+:

\`\`\`bash
# Repo klonen
cd /volume1/docker
git clone https://github.com/AndySchlegel/blog-project.git
cd blog-project/blog-app

# Environment konfigurieren
cp .env.docker.example .env.docker
nano .env.docker  # MongoDB URI & JWT Secret setzen

# Container starten
docker compose up -d

# Logs checken
docker compose logs -f app
\`\`\`

Access über: \`http://nas-ip:3000\`

### Projekt 2: Dashy Dashboard

Ein zentrales Dashboard für alle Services:

\`\`\`yaml
version: '3.3'
services:
  dashy:
    image: lissy93/dashy:latest
    container_name: dashy
    ports:
      - '4000:80'
    volumes:
      - /volume1/docker/dashy/conf.yml:/app/user-data/conf.yml
    restart: always
\`\`\`

## Performance Optimizations

### NVMe Cache Setup
- **Storage Manager → SSD Cache**
- Read-Write Cache für häufig genutzte Daten
- Perfekt für MongoDB oder PostgreSQL

### Resource Limits
- Container Manager erlaubt CPU/RAM Limits pro Container
- Verhindert, dass ein Container das ganze System lahmlegt

### Backup Strategy
- **Hyper Backup** für automatische NAS Backups
- **Docker Volume Backups** regelmäßig auf externes Drive
- **3-2-1 Regel**: 3 Kopien, 2 Medien, 1 Off-Site

## Lessons Learned

### Was gut funktioniert:
✅ Docker Performance ist exzellent
✅ Container Manager ist simpel, aber ausreichend
✅ SSH Access macht Deployment super easy
✅ RAM Upgrade auf 16GB war eine gute Investition

### Was ich anders machen würde:
⚠️ Von Anfang an mit Traefik als Reverse Proxy arbeiten
⚠️ Früher auf docker-compose.yml statt GUI setzen
⚠️ Monitoring mit Prometheus/Grafana direkt mitplanen

## Next Steps

In den kommenden Wochen plane ich:

1. **Tailscale VPN** für sicheren Remote-Access
2. **Traefik Reverse Proxy** für alle Services
3. **Automated Backups** zu Hetzner Cloud
4. **Monitoring Stack** (Prometheus + Grafana)

## Fazit

Die DS925+ ist die perfekte Homelab-Platform für DevOps Engineers:
- Genug Power für produktive Workloads
- Native Docker Support
- SSH Access für Automation
- Solide Backup-Optionen

**Würde ich sie wieder kaufen?** Absolut! 🚀

---

*Hast du auch eine Synology für Homelab-Projekte? Schreib mir in den Kommentaren, welche Services bei dir laufen!*
`,
    coverImage: '/images/synology-ds925-homelab.jpg',
    tags: ['synology', 'nas', 'docker', 'homelab', 'devops'],
    status: 'published',
    featured: true,
    readTime: 8
  },

  {
    title: 'Mein Weg zum AWS Cloud Practitioner: Learnings & Tipps',
    slug: 'aws-cloud-practitioner-exam-guide',
    excerpt: 'Von null AWS-Erfahrung zur bestandenen Zertifizierung in 6 Wochen. Was funktioniert hat, was nicht - und wie du es besser machen kannst.',
    content: `# Mein Weg zum AWS Cloud Practitioner: Learnings & Tipps

Nach 6 Wochen Vorbereitung habe ich im Januar 2025 die **AWS Certified Cloud Practitioner (CLF-C02)** Prüfung bestanden. Hier teile ich meine Erfahrungen und wichtigsten Learnings.

## Warum Cloud Practitioner?

Als Java DevOps Engineer arbeite ich täglich mit Cloud-Technologien. AWS Skills sind Pflicht, und die Cloud Practitioner Zertifizierung ist der perfekte Einstieg:

- ✅ **Foundation** für alle weiteren AWS Zertifizierungen
- ✅ **Breites Wissen** über AWS Services
- ✅ **Cloud Mindset** verstehen lernen
- ✅ **Karriere-Boost** für DevOps/Cloud Rollen

## Exam Overview

- **Dauer**: 90 Minuten
- **Fragen**: 65 Multiple Choice / Multiple Response
- **Passing Score**: 700/1000 (ca. 70%)
- **Kosten**: 100 USD
- **Sprache**: Englisch (Deutsch verfügbar, aber nicht empfohlen)

## Mein Lernplan (6 Wochen)

### Woche 1-2: Fundamentals
- **AWS Skill Builder** - Exam Prep Standard Course (kostenlos!)
- **AWS Whitepapers**: "Overview of Amazon Web Services"
- Jeden Tag 1-2 Stunden nach der Arbeit

### Woche 3-4: Deep Dive
- **Udemy Kurs**: "AWS Certified Cloud Practitioner CLF-C02" von Stephane Maarek
- Hands-on: AWS Free Tier Account erstellt
- Eigene EC2 Instances gestartet, S3 Buckets angelegt, IAM Users konfiguriert

### Woche 5: Practice Exams
- **Tutorials Dojo** Practice Tests (6 Sets à 65 Fragen)
- Jeder Test durchgearbeitet, falsche Antworten notiert
- Schwachstellen identifiziert (bei mir: Pricing & Support Plans)

### Woche 6: Final Review
- Alle Notizen durchgegangen
- AWS Services nochmal kategorisiert (Compute, Storage, Database, etc.)
- 2 Tage vor Exam: Nur noch leichte Review, kein neuer Content

## Die wichtigsten Exam-Bereiche

Die Prüfung ist in 4 Domains aufgeteilt:

### Domain 1: Cloud Concepts (24%)
- Was ist Cloud Computing?
- Vorteile der AWS Cloud (Elasticity, Scalability, etc.)
- AWS Well-Architected Framework (5 Pillars!)
- Migration Strategies (6 R's)

**Tipp**: Verstehe die **6 R's of Migration**:
1. Rehost (Lift & Shift)
2. Replatform (Lift, Tinker & Shift)
3. Repurchase (SaaS)
4. Refactor (Cloud-native)
5. Retire
6. Retain

### Domain 2: Security & Compliance (30%)
- **IAM** (Users, Groups, Policies, Roles)
- Shared Responsibility Model (AWS vs. Customer)
- AWS Security Services (GuardDuty, Inspector, Shield, WAF)
- Compliance Programs (GDPR, HIPAA, etc.)

**Tipp**: Das **Shared Responsibility Model** kommt SEHR oft vor!
- AWS: Security **OF** the Cloud (Hardware, Software, Networking)
- Customer: Security **IN** the Cloud (Data, IAM, Encryption)

### Domain 3: Cloud Technology & Services (34%)
Die Core Services musst du in- und auswendig kennen:

**Compute**:
- EC2 (Instance Types, Pricing Models)
- Lambda (Serverless!)
- ECS/EKS (Container)
- Elastic Beanstalk

**Storage**:
- S3 (Storage Classes!)
- EBS (Block Storage)
- EFS (File Storage)
- Glacier (Archiving)

**Database**:
- RDS (Relational)
- DynamoDB (NoSQL)
- Aurora (Performance)
- ElastiCache (Caching)

**Networking**:
- VPC (Subnets, Route Tables, IGW, NAT)
- CloudFront (CDN)
- Route 53 (DNS)
- Direct Connect vs. VPN

**Tipp**: Lerne die **Use Cases** für jeden Service, nicht nur Features!

### Domain 4: Billing, Pricing & Support (12%)
- AWS Pricing Models (On-Demand, Reserved, Spot, Savings Plans)
- Free Tier
- Cost Management Tools (Cost Explorer, Budgets, TCO Calculator)
- Support Plans (Basic, Developer, Business, Enterprise)

**Tipp**: Support Plans kommen oft dran - wisse welcher Plan was bietet!
- **Basic**: Kostenlos, nur Doku
- **Developer**: $29/Monat, Email Support
- **Business**: $100/Monat, 24/7 Phone Support
- **Enterprise**: $15k/Monat, TAM (Technical Account Manager)

## Was mir geholfen hat

### ✅ Do's

1. **Hands-on Practice**: Free Tier nutzen! Services selbst ausprobieren
2. **Practice Exams**: Mindestens 3-4 vollständige Tests machen
3. **AWS Whitepapers**: Klingt trocken, ist aber Gold wert
4. **FAQs lesen**: Für S3, EC2, VPC, RDS
5. **Process of Elimination**: Bei Multiple Choice immer 2 offensichtlich falsche Antworten ausschließen

### ❌ Don'ts

1. ~~Nur Videos schauen~~ → Hands-on ist Pflicht!
2. ~~Jeden Service im Detail lernen~~ → Focus auf Use Cases
3. ~~Deutsche Prüfung~~ → Übersetzungen sind teilweise weird
4. ~~1-2 Tage vor Exam cramming~~ → Früher anfangen!
5. ~~Nur einen Kurs machen~~ → Mehrere Quellen nutzen

## Exam Day Experience

- **Ort**: Pearson VUE Test Center (remote war mir zu stressig)
- **Check-in**: 30 Min vorher, ID + Bestätigungsmail
- **Während der Prüfung**:
  - Fragen waren gut machbar
  - Keine Trick-Fragen, aber präzise lesen!
  - Zeit war mehr als genug (60 Min übrig)
- **Ergebnis**: Sofort nach Abgabe (Pass/Fail)
- **Score Report**: 2 Tage später per Email

## Meine Top-Tipps

### 1. AWS Free Tier voll ausnutzen
Nicht nur lesen - **MACHEN**:
\`\`\`bash
# EC2 Instance starten
aws ec2 run-instances --image-id ami-xxx --instance-type t2.micro

# S3 Bucket erstellen
aws s3 mb s3://my-test-bucket-12345

# Lambda Function deployen
aws lambda create-function --function-name test --runtime nodejs18.x
\`\`\`

### 2. Pricing verstehen
Fragen wie "Was kostet NICHT bei EC2?" kommen oft:
- ✅ Stopped Instances (EBS Storage)
- ❌ Stopped Instances (Compute)
- ✅ Data Transfer OUT
- ❌ Data Transfer IN (meist kostenlos)

### 3. Exam Readiness Score
AWS bietet einen **Official Practice Exam** für $20:
- Simuliert echte Prüfung
- Zeigt Schwachstellen pro Domain
- **Absolut empfehlenswert!**

### 4. Tag der Prüfung
- Guter Schlaf > Last-Minute Learning
- Früh frühstücken
- 30 Min vorher da sein
- Tief durchatmen - du hast das! 🚀

## Resources die ich genutzt habe

### Kostenlos
- [AWS Skill Builder](https://skillbuilder.aws/) - Official Exam Prep
- [AWS Whitepapers](https://aws.amazon.com/whitepapers/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [AWS FAQs](https://aws.amazon.com/faqs/)

### Paid (lohnt sich!)
- **Udemy**: Stephane Maarek's Course (~€15 im Sale)
- **Tutorials Dojo**: Practice Exams (~€15)
- **AWS Official Practice Exam**: $20

## Nach der Zertifizierung

Die Cloud Practitioner Cert ist erst der Anfang:

**Mein nächstes Ziel**: AWS Solutions Architect Associate (SAA-C03)
- Tieferes technisches Wissen
- Architecting Best Practices
- Vorbereitung: 2-3 Monate geplant

## Fazit

Die AWS Cloud Practitioner Zertifizierung ist:
- ✅ **Machbar** auch neben Vollzeitjob
- ✅ **Wertvoll** für DevOps/Cloud Karriere
- ✅ **Fundament** für weitere AWS Certs
- ✅ **Spaß** wenn man gerne lernt

**Mein Score**: 850/1000 ✨

**Zeitinvestment**: ca. 60-80 Stunden total

**ROI**: Unbezahlbar für Cloud-Verständnis!

---

*Planst du auch die Cloud Practitioner Prüfung? Fragen zum Exam? Drop a comment! 💬*
`,
    coverImage: '/images/aws-cloud-practitioner.jpg',
    tags: ['aws', 'certification', 'cloud', 'learning'],
    status: 'published',
    featured: true,
    readTime: 12
  },

  {
    title: 'Tailscale VPN + Traefik: Sichere Verbindung zwischen NAS und Hetzner',
    slug: 'tailscale-traefik-nas-hetzner-setup',
    excerpt: 'Kein Port Forwarding, keine öffentliche IP - trotzdem sicher auf alle Services zugreifen. Wie ich mein Homelab mit der Cloud verbunden habe.',
    content: `# Tailscale VPN + Traefik: Sichere Verbindung zwischen NAS und Hetzner

Eines meiner spannendsten Projekte war das Setup einer **sicheren Verbindung** zwischen meiner Synology DS925+ (Homelab) und einem Hetzner Cloud Server - ohne Port Forwarding, ohne öffentliche IPs.

## Das Problem

Ich wollte:
- ✅ Sicher auf meine Homelab-Services zugreifen (von überall)
- ✅ Keine Ports in meiner Firewall öffnen
- ✅ Echte SSL-Zertifikate (nicht selbst-signiert)
- ✅ Eine Custom Domain nutzen (blog-app.his4irness23.de)

**Die Lösung**: Tailscale VPN + Traefik Reverse Proxy

## Architektur Overview

\`\`\`
Internet
   │
   ├─→ Cloudflare DNS (blog-app.his4irness23.de)
   │        │
   │        ↓
   ├─→ Hetzner VPS (Public IP)
   │        │
   │        ↓ Traefik Reverse Proxy
   │        │
   │        ↓ Tailscale VPN (verschlüsselt)
   │        │
   └─→ Synology NAS (privates Netzwerk)
            │
            ↓ Blog-App Container
\`\`\`

**Vorteile**:
- Keine offenen Ports am Router
- End-to-End Encryption via Tailscale
- Automatische SSL-Zertifikate via Let's Encrypt
- NAT Traversal (funktioniert auch hinter strenger Firewall)

## Step 1: Tailscale Setup

### Auf dem Hetzner Server

\`\`\`bash
# Tailscale installieren
curl -fsSL https://tailscale.com/install.sh | sh

# Tailscale starten
sudo tailscale up

# URL öffnen und mit Google/GitHub Account authentifizieren
# Tailscale IP notieren (z.B. 100.x.y.z)
tailscale ip -4
\`\`\`

### Auf der Synology NAS

- **Package Center**: Tailscale installieren
- Tailscale App öffnen
- Login mit gleichem Account wie auf Hetzner
- **Wichtig**: "Accept routes" aktivieren

### Verbindung testen

\`\`\`bash
# Von Hetzner Server
ping <synology-tailscale-ip>

# Von Synology (via SSH)
ping <hetzner-tailscale-ip>
\`\`\`

✅ Beide Systeme können sich jetzt privat erreichen!

## Step 2: Traefik auf Hetzner deployen

### Docker Compose Setup

\`\`\`yaml
version: '3.8'

services:
  traefik:
    image: traefik:v3.0
    container_name: traefik
    restart: always
    ports:
      - "80:80"
      - "443:443"
    command:
      # Traefik Dashboard (optional)
      - "--api.dashboard=true"

      # Entrypoints
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"

      # Let's Encrypt
      - "--certificatesresolvers.letsencrypt.acme.email=your@email.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/acme/acme.json"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"

      # Docker Provider
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"

      # Logs
      - "--log.level=INFO"
      - "--accesslog=true"

    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./acme:/acme

    labels:
      # HTTP → HTTPS Redirect
      - "traefik.enable=true"
      - "traefik.http.routers.http-catchall.rule=hostregexp(\`{host:.+}\`)"
      - "traefik.http.routers.http-catchall.entrypoints=web"
      - "traefik.http.routers.http-catchall.middlewares=redirect-to-https"
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https"

networks:
  default:
    name: traefik-net
\`\`\`

\`\`\`bash
# Starten
docker compose up -d

# Logs prüfen
docker compose logs -f traefik
\`\`\`

## Step 3: Service auf NAS für Traefik vorbereiten

Auf der Synology muss der Service über Tailscale erreichbar sein:

\`\`\`yaml
# blog-app/docker-compose.yml auf Synology
version: '3.8'

services:
  app:
    build: .
    container_name: blog-app
    env_file: .env.docker
    ports:
      - "3000:3000"  # Wichtig: Exposed für Tailscale
    restart: unless-stopped
\`\`\`

**Test**:
\`\`\`bash
# Von Hetzner Server
curl http://<synology-tailscale-ip>:3000
# Sollte die Blog-App HTML zurückgeben
\`\`\`

## Step 4: Traefik Reverse Proxy konfigurieren

Jetzt kommt die Magie: Traefik auf Hetzner leitet Traffic an die NAS weiter.

### HTTP Service mit Tailscale Backend

Erstelle \`docker-compose.proxy.yml\` auf Hetzner:

\`\`\`yaml
version: '3.8'

services:
  blog-app-proxy:
    image: alpine/socat:latest
    container_name: blog-app-proxy
    restart: always
    command: >
      tcp-listen:3000,fork,reuseaddr
      tcp-connect:<synology-tailscale-ip>:3000

    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.blog-app.rule=Host(\`blog-app.his4irness23.de\`)"
      - "traefik.http.routers.blog-app.entrypoints=websecure"
      - "traefik.http.routers.blog-app.tls.certresolver=letsencrypt"
      - "traefik.http.services.blog-app.loadbalancer.server.port=3000"

    networks:
      - traefik-net

networks:
  traefik-net:
    external: true
\`\`\`

**Was passiert hier?**
1. **socat** tunnelt TCP Traffic von Port 3000 zu Synology via Tailscale
2. **Traefik** terminiert SSL und leitet zu socat weiter
3. **Let's Encrypt** stellt automatisch SSL-Cert aus

\`\`\`bash
docker compose -f docker-compose.proxy.yml up -d
\`\`\`

## Step 5: DNS konfigurieren

Bei deinem Domain-Provider (Ionos, Infomaniak, etc.):

\`\`\`
Type: A
Name: blog-app
Value: <hetzner-public-ip>
TTL: 3600
\`\`\`

**Wichtig**: Cloudflare Proxy **MUSS AUS** sein für Let's Encrypt HTTP Challenge!

## Step 6: Testen!

\`\`\`bash
# DNS Auflösung testen
dig blog-app.his4irness23.de

# HTTPS testen
curl -I https://blog-app.his4irness23.de

# Im Browser öffnen
# https://blog-app.his4irness23.de
\`\`\`

✅ **Valid SSL Certificate**
✅ **Traffic läuft über Tailscale VPN**
✅ **Keine offenen Ports am Router**

## Monitoring & Troubleshooting

### Tailscale Status prüfen

\`\`\`bash
# Auf Hetzner
tailscale status

# Auf Synology (via SSH)
tailscale status
\`\`\`

### Traefik Dashboard

Access via: \`https://hetzner-ip:8080/dashboard/\`

(Nur wenn Dashboard aktiviert & Port 8080 exposed)

### Logs

\`\`\`bash
# Traefik Logs
docker compose logs -f traefik

# Proxy Logs
docker compose -f docker-compose.proxy.yml logs -f
\`\`\`

### Häufige Probleme

**Problem**: Let's Encrypt Challenge fails

**Lösung**:
- Cloudflare Proxy ausschalten
- Port 80 auf Hetzner offen? (\`ufw status\`)
- DNS propagiert? (\`dig +short blog-app.his4irness23.de\`)

**Problem**: 502 Bad Gateway

**Lösung**:
- Synology App läuft? (\`docker ps\`)
- Tailscale Verbindung OK? (\`tailscale ping <synology-ip>\`)
- Firewall auf Synology? (Port 3000 in Tailscale Interface freigeben)

## Performance & Security

### Performance
- **Latenz**: +10-20ms durch Tailscale VPN (kaum merkbar)
- **Throughput**: 100-200 Mbps (mehr als genug für Web-Apps)
- **CDN**: Cloudflare kann nach SSL-Setup aktiviert werden

### Security
- ✅ End-to-End Encryption (Tailscale WireGuard)
- ✅ Keine offenen Ports am Homelab
- ✅ MFA auf Tailscale Account
- ✅ SSL/TLS für Public Traffic

## Weitere Services hinzufügen

Das Schöne: Jetzt kann ich beliebig viele Services vom NAS exposen:

\`\`\`yaml
# Dashy Dashboard
dashy-proxy:
  image: alpine/socat:latest
  command: >
    tcp-listen:4000,fork,reuseaddr
    tcp-connect:<synology-tailscale-ip>:4000
  labels:
    - "traefik.enable=true"
    - "traefik.http.routers.dashy.rule=Host(\`dash.his4irness23.de\`)"
    - "traefik.http.routers.dashy.entrypoints=websecure"
    - "traefik.http.routers.dashy.tls.certresolver=letsencrypt"

# n8n Automation
n8n-proxy:
  image: alpine/socat:latest
  command: >
    tcp-listen:5678,fork,reuseaddr
    tcp-connect:<synology-tailscale-ip>:5678
  labels:
    - "traefik.enable=true"
    - "traefik.http.routers.n8n.rule=Host(\`n8n.his4irness23.de\`)"
    - "traefik.http.routers.n8n.entrypoints=websecure"
    - "traefik.http.routers.n8n.tls.certresolver=letsencrypt"
\`\`\`

## Kosten

- **Tailscale**: Kostenlos (bis 100 Geräte)
- **Hetzner CAX11**: ~3,79€/Monat
- **Domain**: ~10€/Jahr
- **Traefik**: Kostenlos (Open Source)
- **Let's Encrypt**: Kostenlos

**Total**: ~4€/Monat für unbegrenzte Services! 🎉

## Fazit

Das Setup von Tailscale + Traefik hat mein Homelab-Game komplett verändert:

- ✅ Sicherer Zugriff von überall
- ✅ Echte SSL-Zertifikate
- ✅ Keine Router-Konfiguration
- ✅ Einfach neue Services hinzufügen
- ✅ Professionelles Setup

**Next Level**: Monitoring mit Prometheus/Grafana über Tailscale!

---

*Nutzt du auch Tailscale oder einen anderen VPN? Lass es mich in den Kommentaren wissen! 🔐*
`,
    coverImage: '/images/tailscale-traefik-setup.jpg',
    tags: ['tailscale', 'traefik', 'vpn', 'networking', 'homelab', 'security'],
    status: 'published',
    featured: true,
    readTime: 15
  }
]

const SAMPLE_SUBSCRIBERS = [
  { email: 'devops@example.com', name: 'DevOps Enthusiast', tags: ['devops', 'cloud'] },
  { email: 'homelab@example.com', name: 'Homelab Builder', tags: ['homelab', 'self-hosting'] }
]

async function seed () {
  await dbConnect()

  console.log('🧹 Lösche bestehende Datensätze…')
  await Promise.all([
    Category.deleteMany({}),
    User.deleteMany({}),
    Post.deleteMany({}),
    Comment.deleteMany({}),
    NewsletterSubscriber.deleteMany({})
  ])

  console.log('🌱 Lege Kategorien an…')
  const categories = await Category.insertMany(CATEGORIES)

  console.log('👥 Lege Autor-Account an…')
  const users = await User.insertMany(
    await Promise.all(USERS.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 12)
    })))
  )
  const author = users[0]

  console.log('📝 Erstelle Tech Blog Posts…')
  const posts = []
  for (const [index, postData] of TECH_BLOG_POSTS.entries()) {
    const categoryIndex = index % categories.length
    const post = await Post.create({
      ...postData,
      author: author._id,
      category: categories[categoryIndex]._id,
      publishedAt: postData.status === 'published' ? new Date() : null
    })
    posts.push(post)
  }

  console.log('📬 Lege Newsletter-Abonnenten an…')
  await NewsletterSubscriber.insertMany(SAMPLE_SUBSCRIBERS)

  console.log('✅ Tech Blog Seed abgeschlossen!')
  console.log(`   📚 ${posts.length} Blog Posts erstellt`)
  console.log(`   🏷️  ${categories.length} Kategorien erstellt`)
  console.log(`   👤 Author: ${author.email}`)
  console.log('')
  console.log('🚀 Starte die App mit: npm run dev')
  console.log('🔐 Login mit: andy@blog-app.his4irness23.de / admin123')

  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Seed fehlgeschlagen:', error)
  process.exit(1)
})

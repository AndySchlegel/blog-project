#!/usr/bin/env node

import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

dotenv.config({ path: '.env.local' })

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI ist nicht gesetzt. Bitte .env.local prüfen.')
  process.exit(1)
}

const [{ default: dbConnect }, { default: Category }, { default: User }, { default: Post }, { default: NewsletterSubscriber }] = await Promise.all([
  import('../lib/mongodb.js'),
  import('../models/Category.js'),
  import('../models/User.js'),
  import('../models/Post.js'),
  import('../models/NewsletterSubscriber.js')
])

const CATEGORIES = [
  {
    name: 'AWS & Cloud',
    slug: 'aws-cloud',
    description: 'AWS Zertifizierungen, Cloud Architecture und Best Practices',
    icon: 'cloud'
  },
  {
    name: 'DevOps & CI/CD',
    slug: 'devops',
    description: 'CI/CD, Docker, Kubernetes und Infrastructure as Code',
    icon: 'server'
  },
  {
    name: 'Homelab & Self-Hosting',
    slug: 'homelab',
    description: 'NAS Setup, Self-Hosted Services und Homelab Projekte',
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
  },
  {
    name: 'Certifications',
    slug: 'certifications',
    description: 'Zertifizierungen, Lernpläne und Exam-Tipps',
    icon: 'award'
  }
]

const USERS = [
  {
    name: 'Andy Schlegel',
    email: 'andy@blog-app.his4irness23.de',
    password: 'admin123',
    hobbies: ['Cloud Architecture', 'DevOps', 'Self-Hosting', 'Automation'],
    adresse: { stadt: 'Germany', land: 'Deutschland' },
    kategorie: 'admin',
    avatar: '/images/avatar-andy.jpg'
  }
]

// Unsplash Image URLs (kostenlos, kommerziell nutzbar)
const IMAGES = {
  synology: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=1200',
  aws: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
  networking: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
  coding: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200',
  server: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200',
  security: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200',
  terminal: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200',
  cloud: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200',
  automation: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
  docker: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200',
  github: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200',
  dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200'
}

const BLOG_POSTS = [
  {
    title: 'Synology DS925+ als DevOps Homelab: Der komplette Setup-Guide',
    slug: 'synology-ds925-devops-homelab-setup',
    excerpt: 'Vom Unboxing bis zum ersten Docker-Container: Wie ich meine Synology DS925+ als zentrale Homelab-Platform eingerichtet habe.',
    content: `Die Synology DS925+ ist die perfekte Platform für DevOps Engineers. Mit AMD Ryzen V1500B (4 Cores), bis zu 32GB RAM und nativer Docker-Unterstützung bietet sie genug Power für produktive Workloads.

## Setup in 5 Schritten

1. **Initial Setup**: Synology Assistant findet NAS automatisch, DSM 7.2 Installation dauert ca. 15 Min
2. **Storage Pool**: RAID 5 für Balance zwischen Performance und Redundanz
3. **Container Manager**: Docker aus Package Center installieren
4. **SSH aktivieren**: Für Automation und Deployment
5. **Erste Projekte**: Blog-App, Dashy, n8n deployen

Der Container Manager macht Docker-Deployment super einfach. Alternativ bietet Portainer mehr Features für fortgeschrittene Setups.`,
    coverImage: IMAGES.synology,
    tags: ['synology', 'nas', 'docker', 'homelab', 'devops'],
    status: 'published',
    featured: true,
    readTime: 8
  },

  {
    title: 'AWS Cloud Practitioner: Von Null zur Zertifizierung in 6 Wochen',
    slug: 'aws-cloud-practitioner-guide',
    excerpt: 'Mein kompletter Lernplan, Best Practices und Exam-Tipps für die AWS Cloud Practitioner Zertifizierung.',
    content: `Die AWS Cloud Practitioner (CLF-C02) ist der perfekte Einstieg in AWS. Nach 6 Wochen Vorbereitung habe ich mit 850/1000 Punkten bestanden.

## Mein Lernplan

**Woche 1-2**: AWS Skill Builder Exam Prep (kostenlos) + "Overview of AWS" Whitepaper
**Woche 3-4**: Udemy Kurs von Stephane Maarek + Hands-on im Free Tier
**Woche 5**: Tutorials Dojo Practice Tests (6 Sets)
**Woche 6**: Final Review aller Notizen

## Die 4 Exam-Domains

1. Cloud Concepts (24%) - Shared Responsibility Model, 6 R's of Migration
2. Security & Compliance (30%) - IAM, GuardDuty, Shield, WAF
3. Technology & Services (34%) - EC2, S3, RDS, Lambda, VPC
4. Billing & Pricing (12%) - Support Plans, Cost Explorer

**Pro-Tipp**: Practice Exams sind Gold wert! Mindestens 3-4 vollständige Tests machen.`,
    coverImage: IMAGES.aws,
    tags: ['aws', 'certification', 'cloud', 'learning'],
    status: 'published',
    featured: true,
    readTime: 12
  },

  {
    title: 'Tailscale VPN + Traefik: Sichere Homelab-Cloud Verbindung',
    slug: 'tailscale-traefik-setup',
    excerpt: 'Kein Port Forwarding, keine öffentliche IP - trotzdem sicher auf alle Services zugreifen.',
    content: `Mit Tailscale VPN und Traefik Reverse Proxy verbinde ich meine Synology NAS sicher mit einem Hetzner Cloud Server - ohne Port Forwarding am Router.

## Die Architektur

Internet → Cloudflare DNS → Hetzner VPS (Public IP) → Traefik → Tailscale VPN → Synology NAS (privat)

## Vorteile

✅ Keine offenen Ports am Router
✅ End-to-End Encryption via Tailscale
✅ Automatische SSL-Zertifikate (Let's Encrypt)
✅ NAT Traversal - funktioniert auch hinter Firewall

## Setup in 6 Schritten

1. Tailscale auf Hetzner & Synology installieren
2. Traefik Docker Container auf Hetzner
3. Services auf NAS für Tailscale exposen
4. Traefik Labels für Routing konfigurieren
5. DNS A-Record auf Hetzner IP setzen
6. Let's Encrypt HTTPS aktivieren

**Kosten**: ~4€/Monat für unbegrenzte Services!`,
    coverImage: IMAGES.networking,
    tags: ['tailscale', 'traefik', 'vpn', 'networking', 'homelab'],
    status: 'published',
    featured: true,
    readTime: 15
  },

  {
    title: 'n8n Self-Hosting auf Hetzner: Workflow-Automation für <5€/Monat',
    slug: 'n8n-hetzner-selfhosting',
    excerpt: 'Wie ich n8n auf einem Hetzner Cloud Server deployed habe - mit Docker, Traefik und automatischem SSL.',
    content: `n8n ist eine mächtige Open-Source Alternative zu Zapier. Self-Hosted auf Hetzner kostet es nur ~3,79€/Monat statt 20€+ bei Cloud-Anbietern.

## Warum Self-Hosting?

✅ Unbegrenzte Workflows
✅ Volle Datenkontrolle
✅ Custom Nodes möglich
✅ 10x günstiger als Cloud

## Deployment-Stack

- **Server**: Hetzner CAX11 (4GB RAM, 2 vCPU)
- **OS**: Ubuntu 22.04
- **Container**: Docker + Docker Compose
- **Reverse Proxy**: Traefik für HTTPS
- **Database**: PostgreSQL (optional, für Production)

## docker-compose.yml Setup

\`\`\`yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n:latest
    restart: always
    environment:
      - N8N_HOST=n8n.yourdomain.com
      - WEBHOOK_URL=https://n8n.yourdomain.com/
      - GENERIC_TIMEZONE=Europe/Berlin
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.n8n.rule=Host(\`n8n.yourdomain.com\`)"
      - "traefik.http.routers.n8n.tls.certresolver=letsencrypt"
\`\`\`

Nach 10 Minuten Setup läuft n8n produktiv mit HTTPS!`,
    coverImage: IMAGES.automation,
    tags: ['n8n', 'automation', 'hetzner', 'self-hosting', 'docker'],
    status: 'published',
    featured: false,
    readTime: 10
  },

  {
    title: 'Dashy Homelab Dashboard: Alle Services auf einen Blick',
    slug: 'dashy-homelab-dashboard',
    excerpt: 'Mit Dashy alle Self-Hosted Services übersichtlich organisieren - inklusive Status-Checks und modernem Design.',
    content: `Dashy ist das perfekte Dashboard für dein Homelab. Selbst-gehostet, Open-Source, und unglaublich customizable.

## Features

✅ Status-Checks für alle Services
✅ Themes & Icon-Packs
✅ Sections & Categories
✅ Drag & Drop UI Editor
✅ Auth & Multi-User Support

## Docker Setup

\`\`\`bash
docker run -d \\
  -p 4000:80 \\
  -v ./dashy-conf.yml:/app/user-data/conf.yml \\
  --name dashy \\
  --restart=always \\
  lissy93/dashy:latest
\`\`\`

## Meine Config-Struktur

\`\`\`yaml
sections:
  - name: "Homelab Services"
    items:
      - title: "Blog App"
        url: "https://blog-app.his4irness23.de"
        statusCheck: true
      - title: "n8n Automation"
        url: "https://n8n.his4irness23.de"
        statusCheck: true
\`\`\`

**Deployment-Zeit**: < 5 Minuten für ein professionelles Dashboard!`,
    coverImage: IMAGES.dashboard,
    tags: ['dashy', 'dashboard', 'homelab', 'docker', 'monitoring'],
    status: 'published',
    featured: false,
    readTime: 6
  },

  {
    title: 'GitHub Foundations Certification: Der komplette Study Guide',
    slug: 'github-foundations-certification',
    excerpt: 'Alles was du für die GitHub Foundations Zertifizierung wissen musst - kostenlos für Studenten!',
    content: `Die GitHub Foundations Certification validiert dein Grundwissen über Git, GitHub, und Collaboration-Workflows.

## Exam Details

- **Dauer**: 120 Minuten
- **Fragen**: 75 (60 scored + 15 pretest)
- **Format**: Multiple Choice
- **Kosten**: Kostenlos für Studenten!
- **Sprachen**: EN, PT, ES, KR, JP

## Hauptthemen

### 1. Git Basics
- Repositories, Commits, Branches
- Merge vs. Rebase
- Git Workflow Best Practices

### 2. GitHub Collaboration
- Pull Requests & Code Reviews
- Issues & Project Boards
- GitHub Actions Basics

### 3. GitHub Products
- GitHub Free vs. Pro vs. Teams
- GitHub Pages
- GitHub Packages

### 4. Security & Administration
- Branch Protection Rules
- Dependabot
- Code Scanning

## Study Resources

1. **Official**: Microsoft Learn Path (kostenlos)
2. **Practice**: GitHub Skills Labs
3. **Community**: Study Guides auf GitHub

**Pro-Tipp**: Hands-on Erfahrung ist wichtiger als nur Theorie - erstelle eigene Repos und nutze alle Features!`,
    coverImage: IMAGES.github,
    tags: ['github', 'certification', 'git', 'learning', 'devops'],
    status: 'published',
    featured: false,
    readTime: 9
  },

  {
    title: 'iTerm2 + Starship: Das ultimative Terminal-Setup für Mac',
    slug: 'iterm2-starship-setup',
    excerpt: 'Von langweiligem Terminal zu produktivem Workspace - mit iTerm2, Oh-My-Zsh, und Starship.',
    content: `Ein gut konfiguriertes Terminal macht den Unterschied zwischen Frust und Flow. Hier ist mein Setup.

## Der Stack

- **iTerm2**: Terminal-Emulator mit Split Panes & Tabs
- **Zsh**: Moderne Shell (macOS default)
- **Oh-My-Zsh**: Plugin-Framework
- **Starship**: Cross-Shell Prompt
- **Nerd Fonts**: Icons & Glyphs

## Installation

\`\`\`bash
# 1. iTerm2 installieren
brew install --cask iterm2

# 2. Oh-My-Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 3. Starship
brew install starship
echo 'eval "$(starship init zsh)"' >> ~/.zshrc

# 4. Nerd Font
brew tap homebrew/cask-fonts
brew install --cask font-fira-code-nerd-font
\`\`\`

## Meine Plugins

\`\`\`bash
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  docker
  kubectl
)
\`\`\`

## Starship Config

\`\`\`toml
# ~/.config/starship.toml
[character]
success_symbol = "[➜](bold green)"
error_symbol = "[➜](bold red)"

[directory]
truncation_length = 3
truncate_to_repo = true
\`\`\`

**Warum Starship statt Powerlevel10k?** Powerlevel10k ist on Life Support - Starship ist aktiv maintained und schneller!`,
    coverImage: IMAGES.terminal,
    tags: ['iterm2', 'terminal', 'starship', 'zsh', 'productivity', 'mac'],
    status: 'published',
    featured: false,
    readTime: 7
  },

  {
    title: 'Domain Setup: Ionos vs. Infomaniak - Was ich gelernt habe',
    slug: 'domain-setup-ionos-infomaniak',
    excerpt: 'Eigene Domains registrieren und konfigurieren - mit Ionos und Infomaniak im Vergleich.',
    content: `Für meine Self-Hosting Projekte nutze ich Domains von Ionos und Infomaniak. Hier ist mein Vergleich.

## Ionos

**Vorteile:**
✅ Günstige .de Domains (~1€ erstes Jahr)
✅ Deutsche Firma, deutscher Support
✅ Einfaches Control Panel
✅ Inkl. E-Mail Postfach

**Nachteile:**
⚠️ DNS Propagation manchmal langsam
⚠️ Renewal-Preise höher
⚠️ Upselling im Dashboard

## Infomaniak

**Vorteile:**
✅ Schweizer Datenschutz
✅ Ökostrom-powered
✅ Sehr gute API
✅ Transparente Preise
✅ Gratis WHOIS Privacy

**Nachteile:**
⚠️ Etwas teurer als Ionos
⚠️ Weniger bekannt in Deutschland

## DNS Konfiguration

Beide bieten Standard DNS Records:

\`\`\`
A Record: Domain → IP
CNAME: Subdomain → Domain
MX: Mail Server
TXT: Verification (SPF, DKIM)
\`\`\`

### Typische Setup-Zeit
- **Ionos**: DNS Änderungen ~1-2 Stunden
- **Infomaniak**: DNS Änderungen ~30-60 Min

## Meine Empfehlung

**Ionos**: Für .de Domains, wenn Budget wichtig ist
**Infomaniak**: Für internationale Domains, wenn Datenschutz Priorität hat

Beide funktionieren einwandfrei mit Cloudflare als DNS-Provider!`,
    coverImage: IMAGES.cloud,
    tags: ['domains', 'dns', 'ionos', 'infomaniak', 'networking'],
    status: 'published',
    featured: false,
    readTime: 5
  },

  {
    title: 'AWS Solutions Architect Associate: Mein Lernplan',
    slug: 'aws-solutions-architect-learning-path',
    excerpt: 'Von Cloud Practitioner zu Solutions Architect - wie ich die SAA-C03 Prüfung vorbereite.',
    content: `Nach dem Cloud Practitioner ist der AWS Solutions Architect Associate der nächste logische Schritt.

## Unterschied zu Cloud Practitioner

**Cloud Practitioner**: Was ist AWS?
**Solutions Architect**: Wie designed man auf AWS?

## Voraussetzungen

- ✅ 1+ Jahre AWS Erfahrung (empfohlen)
- ✅ Cloud Practitioner hilfreich, aber nicht Pflicht
- ✅ Grundkenntnis in Networking

## Exam Details

- **Dauer**: 130 Minuten
- **Fragen**: 65
- **Passing Score**: 720/1000
- **Kosten**: $150 USD

## Mein 3-Monats-Plan

### Monat 1: Fundamentals
- **Woche 1-2**: VPC Deep Dive (Subnets, Route Tables, NAT, IGW)
- **Woche 3**: EC2 Advanced (Instance Types, Pricing, Auto Scaling)
- **Woche 4**: S3 & Storage Services

### Monat 2: Advanced Services
- **Woche 5**: Databases (RDS, DynamoDB, Aurora, ElastiCache)
- **Woche 6**: Application Services (ELB, CloudFront, Route 53)
- **Woche 7**: Security & Identity (IAM Advanced, KMS, Secrets Manager)
- **Woche 8**: Monitoring (CloudWatch, CloudTrail, Config)

### Monat 3: Practice & Review
- **Woche 9-10**: Tutorials Dojo Practice Exams (6 Sets)
- **Woche 11**: Weak Areas Review
- **Woche 12**: Final Exam Simulation

## Top Learning Resources

1. **Adrian Cantrill**: Deep-dive Course (sehr technisch)
2. **Stephane Maarek**: Udemy Course (gut strukturiert)
3. **AWS Well-Architected Framework**: Pflichtlektüre!
4. **AWS re:Invent Videos**: Für spezifische Services

**Aktueller Status**: Woche 3 von 12 - VPC ist komplex, aber macht Sinn! 🚀`,
    coverImage: IMAGES.aws,
    tags: ['aws', 'certification', 'solutions-architect', 'cloud', 'learning'],
    status: 'published',
    featured: false,
    readTime: 10
  },

  {
    title: 'Docker Compose Best Practices für Production',
    slug: 'docker-compose-production-best-practices',
    excerpt: 'Von Development zu Production - wie ich Docker Compose Setups production-ready mache.',
    content: `Docker Compose ist perfekt für Development, aber Production braucht Extra-Konfiguration.

## Development vs. Production

### Development
\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    volumes:
      - .:/app  # Live-Reload
    ports:
      - "3000:3000"
\`\`\`

### Production
\`\`\`yaml
version: '3.8'
services:
  app:
    image: myapp:1.2.3  # Tagged image
    restart: unless-stopped
    env_file: .env.production
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
\`\`\`

## Meine Best Practices

### 1. Resource Limits
\`\`\`yaml
deploy:
  resources:
    limits:
      cpus: '0.50'
      memory: 512M
    reservations:
      memory: 256M
\`\`\`

### 2. Health Checks
Verhindert Traffic zu unhealthy Containern.

### 3. Restart Policies
- **no**: Nie neu starten
- **always**: Immer (auch nach System-Reboot)
- **unless-stopped**: Außer manuell gestoppt
- **on-failure**: Nur bei Error

### 4. Secrets Management
\`\`\`yaml
secrets:
  db_password:
    file: ./secrets/db_password.txt
services:
  app:
    secrets:
      - db_password
\`\`\`

### 5. Networks
Isoliere Services in eigene Networks.

### 6. Logging
\`\`\`yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
\`\`\`

**Pro-Tipp**: Nutze \`docker-compose.override.yml\` für local Development Overrides!`,
    coverImage: IMAGES.docker,
    tags: ['docker', 'docker-compose', 'devops', 'production', 'best-practices'],
    status: 'published',
    featured: false,
    readTime: 8
  },

  {
    title: 'Linux Essentials Certification: Was bringt es wirklich?',
    slug: 'linux-essentials-certification-review',
    excerpt: 'Meine Erfahrung mit der LPI Linux Essentials Zertifizierung - und ob sie sich lohnt.',
    content: `Die Linux Essentials Zertifizierung von LPI ist ein guter Einstieg in Linux - aber ist sie das Geld wert?

## Was wird getestet?

### 1. Linux Community & Open Source
- FOSS Konzepte
- Linux Distributions
- Major Open Source Applications

### 2. Navigation im System
- Command Line Basics
- File System Hierarchy
- Archive & Compression

### 3. Power der Command Line
- Text Processing
- Shell Scripting Basics
- Process Management

### 4. Security & Permissions
- User & Group Management
- File Permissions
- Basic Security Concepts

## Meine Erfahrung

**Vorteile:**
✅ Gute Foundation für weitere LPI Certs
✅ Vendor-neutral (nicht nur Ubuntu/Red Hat)
✅ Praxis-orientiert

**Nachteile:**
⚠️ Relativ teuer (~120€)
⚠️ Weniger bekannt als Red Hat/CompTIA
⚠️ Online-Proctoring manchmal problematisch

## Ist es das wert?

**Ja, wenn:**
- Du kompletter Linux-Neuling bist
- Du Richtung LPIC-1/LPIC-2 willst
- Du strukturiertes Lernen bevorzugst

**Nein, wenn:**
- Du bereits täglich mit Linux arbeitest
- Budget knapp ist (Free Resources wie Linux Journey nutzen)
- Arbeitgeber Linux Certs nicht wertschätzt

## Alternative Learning Paths

1. **Free**: Linux Journey, OverTheWire (Bandit)
2. **Günstig**: Udemy Linux Kurse (~15€)
3. **Offiziell**: Red Hat Learning Subscription

**Mein Tipp**: Lern Linux hands-on mit eigenem Server/NAS - praktische Erfahrung > Zertifikat!`,
    coverImage: IMAGES.server,
    tags: ['linux', 'certification', 'lpi', 'learning', 'devops'],
    status: 'published',
    featured: false,
    readTime: 6
  },

  {
    title: 'Traefik vs. Nginx: Welcher Reverse Proxy für Homelab?',
    slug: 'traefik-vs-nginx-comparison',
    excerpt: 'Der große Vergleich: Traefik oder Nginx als Reverse Proxy für Self-Hosting Projekte.',
    content: `Beide sind exzellent - aber sie haben unterschiedliche Stärken.

## Nginx Reverse Proxy

**Vorteile:**
✅ Battle-tested, extrem stabil
✅ Sehr performant (C-basiert)
✅ Riesige Community
✅ Viele Tutorials & Beispiele

**Nachteile:**
⚠️ Config-Files manuell schreiben
⚠️ SSL-Renewals manuell (oder certbot)
⚠️ Jede Änderung = nginx reload

### Typische Nginx Config
\`\`\`nginx
server {
    listen 80;
    server_name blog.example.com;

    location / {
        proxy_pass http://192.168.1.10:3000;
        proxy_set_header Host $host;
    }
}
\`\`\`

## Traefik

**Vorteile:**
✅ Auto-Discovery (Docker Labels)
✅ Automatisches SSL (Let's Encrypt)
✅ Schönes Dashboard
✅ Kein Config-Reload nötig

**Nachteile:**
⚠️ Steile Lernkurve am Anfang
⚠️ Komplexere Debugging
⚠️ Etwas mehr Resource-Hungry

### Typische Traefik Config
\`\`\`yaml
# docker-compose.yml
services:
  app:
    image: myapp
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.app.rule=Host(\`blog.example.com\`)"
      - "traefik.http.routers.app.tls.certresolver=letsencrypt"
\`\`\`

## Meine Empfehlung

**Nginx wenn:**
- Du statische Configs bevorzugst
- Performance kritisch ist
- Du nginx bereits kennst

**Traefik wenn:**
- Du viele Docker-Services hast
- Auto-SSL wichtig ist
- Services häufig wechseln

**Mein Setup**: Traefik für Homelab (wegen Auto-SSL), nginx für statische Sites.

**Fun Fact**: Man kann auch beide kombinieren! 🤯`,
    coverImage: IMAGES.networking,
    tags: ['traefik', 'nginx', 'reverse-proxy', 'homelab', 'docker'],
    status: 'published',
    featured: false,
    readTime: 7
  }
]

async function seed () {
  await dbConnect()

  console.log('🧹 Lösche bestehende Datensätze…')
  await Promise.all([
    Category.deleteMany({}),
    User.deleteMany({}),
    Post.deleteMany({}),
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

  console.log('📝 Erstelle Blog Posts…')
  const posts = []
  for (const [index, postData] of BLOG_POSTS.entries()) {
    const categoryIndex = index % categories.length
    const post = await Post.create({
      ...postData,
      author: author._id,
      category: categories[categoryIndex]._id,
      publishedAt: postData.status === 'published' ? new Date() : null
    })
    posts.push(post)
  }

  console.log('✅ Full Blog Seed abgeschlossen!')
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

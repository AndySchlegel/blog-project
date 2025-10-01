# syntax=docker/dockerfile:1

# ---------- Abhängigkeiten installieren (inkl. Dev) ----------
FROM node:20-alpine AS deps
WORKDIR /app
# Schnellere Builds, wenn Paketdateien unverändert bleiben
COPY package.json package-lock.json ./
RUN npm ci

# ---------- Next.js bauen ----------
FROM node:20-alpine AS builder
WORKDIR /app
# Bereits installierte node_modules wiederverwenden
COPY --from=deps /app/node_modules ./node_modules
# Projektdateien kopieren (Dockerfile und docker-compose bleiben draußen dank .dockerignore)
COPY . .
# Erzeugt das Produktions-Build von Next.js
RUN npm run build

# ---------- Produktions-Abhängigkeiten ohne Dev-Pakete ----------
FROM node:20-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---------- Finale Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# Optional: Wenn Log-Ausgabe via stdout wichtig ist
ENV NEXT_TELEMETRY_DISABLED=1

# Nicht als root laufen -> mehr Sicherheit
RUN addgroup -g 1001 nodegrp && adduser -D -G nodegrp -u 1001 nodeusr

# Produktionsabhängigkeiten + Build-Artefakte übernehmen
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY package.json ./

USER nodeusr
EXPOSE 3000
# Startet den Next.js Produktionsserver
CMD ["node_modules/.bin/next", "start"]

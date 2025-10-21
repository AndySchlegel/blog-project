# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 (App Router) blog application with user authentication, MongoDB backend, and REST APIs. The application is written in JavaScript (not TypeScript) and uses React 19, Tailwind CSS 4, Mongoose for database operations, and JWT for authentication.

**Working Directory**: All development happens in `blog-app/` subdirectory.

## Essential Commands

All commands must be run from the `blog-app/` directory:

```bash
# Development
npm run dev              # Start dev server at http://localhost:3000

# Building & Testing
npm run lint             # Run ESLint with Next.js rules
npm run build            # Create production build (must pass before deployment)
npm run start            # Start production server from build

# Database
npm run seed             # Seed database with example data (requires MongoDB connection)
```

## Environment Setup

The application requires `.env.local` (or `.env.docker` for Docker) in the `blog-app/` directory:

```ini
MONGODB_URI=mongodb://localhost:27017/mein-blog
JWT_SECRET=your-secret-key
AUTH_COOKIE_SECURE=false  # Set to false for Docker/HTTP testing, true for production
```

**Important**: JWT_SECRET must be set for production. The app will warn if using the default development secret.

## Architecture

### Authentication System

- **Client-side**: `contexts/AuthContext.js` manages login, registration, logout, and current user state
- **Server-side**:
  - API routes in `app/api/auth/*` (login, logout, register, me)
  - JWT tokens stored in httpOnly cookies (name: `auth_token`, 7-day expiry)
  - `lib/auth.js` contains all auth utilities (password hashing, token signing/verification, session management)
  - `middleware.js` handles route protection and redirects:
    - Protected routes: `/dashboard/*` (redirects to `/login` if not authenticated)
    - Auth routes: `/login`, `/register` (redirects to `/dashboard` if already authenticated)

### API Structure

All API routes use the `apiHandler` wrapper (`lib/apiHandler.js`) which provides:
- Automatic database connection
- Consistent error handling with `ApiError` class
- CORS support
- Method validation

API routes organized under `app/api/`:
- `auth/*` - Authentication endpoints
- `posts/*` - Blog post management
- `comments/*` - Comment operations
- `categories/*` - Category management
- `newsletter/*` - Newsletter subscriptions
- `search/*` - Search functionality
- `stats/*` - Statistics endpoints

### Database

- Connection: `lib/mongodb.js` establishes MongoDB connection with caching
- Models in `models/`: User, Post, Comment, Category, NewsletterSubscriber
- Helper utilities: `lib/dbUtils.js` for common database operations
- Validators: `lib/validators.js` for input validation

### Page Routing & Components

- **Next.js App Router**: All routes in `app/` directory
- **Public pages**: Home (`/`), Blog (`/blog`), Posts (`/posts`), About, Contact
- **Protected pages**: Dashboard (`/dashboard`)
- **Auth pages**: Login, Register (wrapped in Suspense due to useSearchParams requirement)
- **Shared components**: Reusable UI components in `components/`

### Important Implementation Details

1. **Suspense Boundary Requirement**: Login and Register pages use `useSearchParams` to handle callback URLs, so their main content must be wrapped in `<Suspense>` to avoid build errors. See `app/login/page.js` and `app/register/page.js` for the pattern.

2. **Authentication Flow**:
   - Tokens extracted from Authorization header (Bearer token) or cookies
   - Use `getAuthenticatedUser(request)` in API routes to get current user
   - Use `getServerSession()` in Server Components to access current user
   - Protected routes automatically redirect via middleware

3. **API Response Format**: All APIs return JSON with `{ success: boolean, data/error: ... }` structure

4. **Docker Setup**: Multi-stage Dockerfile with nginx reverse proxy configuration available via `docker-compose.yml`

## Common Development Patterns

### Creating a New API Route

```javascript
import { apiHandler, ApiError } from '@/lib/apiHandler'
import { getAuthenticatedUser } from '@/lib/auth'

export const POST = apiHandler(async (request) => {
  const user = await getAuthenticatedUser(request)
  if (!user) {
    throw new ApiError('Nicht authentifiziert', 401)
  }

  // Your logic here
  return Response.json({ success: true, data: result })
}, { allowedMethods: ['POST'] })
```

### Accessing User in Server Components

```javascript
import { getServerSession } from '@/lib/auth'

export default async function MyPage() {
  const user = await getServerSession()
  // user will be null if not authenticated
}
```

## Known Issues & Solutions

### Build Error: useSearchParams and Suspense

**Problem**: Pages using `useSearchParams()` will cause build failures with error about missing Suspense boundary.

**Solution**: Extract the page content to a separate client component and wrap it in `<Suspense>` with a fallback. See `app/login/page.js` for the reference implementation.

## Git Workflow & Deployment

### Branch Strategy

- **`main`** - Production branch, automatically deploys to blog-app.his4irness23.de via GitHub Actions
- **`developer`** - Development branch for all new features and changes

### Development Workflow

1. **Always work in the `developer` branch**
2. Create commits and push to `developer` branch
3. GitHub Actions automatically runs tests on push/PR
4. Create Pull Request from `developer` to `main` for deployment
5. After PR merge, GitHub Actions automatically deploys to production

**IMPORTANT**: Never commit directly to `main` branch. Always use Pull Requests.

### Testing Before Deployment

Before creating a PR to `main`, ensure:
- `npm run lint` passes without errors
- `npm run build` completes successfully
- Changes tested locally with `npm run dev`
- No sensitive data (.env files, secrets) in commits

See `DEPLOYMENT.md` for detailed deployment documentation, SSH setup, and troubleshooting.

## Docker Deployment

```bash
# From project root
cd blog-app
docker compose up --build
# Access app at http://localhost:3000
# Access via nginx at http://localhost:8080
```

Requires `.env.docker` file with appropriate MongoDB connection string for containerized environment.

**Production**: The app is deployed on Synology NAS and accessible at blog-app.his4irness23.de. Deployment happens automatically via GitHub Actions when code is merged to `main`.

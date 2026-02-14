# Country Intel

Next.js App Router + Prisma + SQLite fullstack app for country discovery, comparison, favorites, notes and collections.

## Tech Stack
- Next.js (App Router) + TypeScript
- TailwindCSS + shadcn-style components + lucide-react
- Prisma + SQLite
- JWT session in httpOnly cookie (`jose`)
- Validation with zod
- Password hashing with bcryptjs
- Vitest unit tests

## Setup
1. Copy environment file:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start app:
   ```bash
   npm run dev
   ```

`npm run dev` automatically runs `scripts/ensure-db.ts`, which executes:
- `prisma generate`
- `prisma db push`

So SQLite DB is prepared on first run.

## Key Routes
- Auth: `/register`, `/login`
- App: `/app/search`, `/app/country/[cca3]`, `/app/compare`, `/app/collections`

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/me`
- `GET /api/countries/search?q=`
- `GET /api/countries/[cca3]`
- `GET/POST /api/favorites`
- `DELETE /api/favorites/[cca3]`
- `GET/PUT/DELETE /api/notes/[cca3]`
- `GET/POST /api/collections`
- `GET/PUT/DELETE /api/collections/[id]`
- `POST /api/collections/[id]/items`
- `DELETE /api/collections/[id]/items/[cca3]`

## Test
```bash
npm run test
```

## Notes
- REST Countries API: `https://restcountries.com/v3.1`
- Two layer cache: memory TTL (10 min) + SQLite cache table TTL (24 h)
- Rate limiting: in-memory helper (IP + route key)

# MindGuard Frontend

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy env template and fill the values you need:

```bash
cp .env.example .env.local
```

3. For local-only development without Turso, you can set:

```bash
TURSO_DATABASE_URL=file:./data/mindguard.db
```

4. Run migrations and seed data:

```bash
npm run db:setup
```

5. Start the app:

```bash
npm run dev
```

## Turso

Create a database and token:

```bash
npm run turso:login
turso db create mindguardd
turso db show --url mindguardd
turso db tokens create mindguardd
```

On Windows, `npm run turso:login` checks for WSL, installs the Turso CLI inside WSL when needed, and runs `turso auth login --headless`. If WSL is missing, it tells you to run `wsl.exe --install` first.

Then put the resulting values into `.env.local`:

```bash
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
```

Apply schema and seed:

```bash
npm run db:migrate
npm run db:seed
```

## Vercel

This repo is structured with the Next.js app inside `frontend`, so the Vercel project should use `frontend` as its Root Directory.

Required environment variables:

```bash
BETTER_AUTH_SECRET
BETTER_AUTH_URL
TURSO_DATABASE_URL
TURSO_AUTH_TOKEN
```

Recommended CLI flow:

```bash
vercel link --yes --project mindguardd --scope <your-team>
vercel env add BETTER_AUTH_SECRET production
vercel env add BETTER_AUTH_SECRET preview
vercel env add BETTER_AUTH_SECRET development
vercel env add BETTER_AUTH_URL production
vercel env add BETTER_AUTH_URL preview
vercel env add BETTER_AUTH_URL development
vercel env add TURSO_DATABASE_URL production
vercel env add TURSO_DATABASE_URL preview
vercel env add TURSO_DATABASE_URL development
vercel env add TURSO_AUTH_TOKEN production --sensitive
vercel env add TURSO_AUTH_TOKEN preview --sensitive
vercel env add TURSO_AUTH_TOKEN development
vercel env pull .env.local --yes
```

After changing env vars, trigger a new deployment.

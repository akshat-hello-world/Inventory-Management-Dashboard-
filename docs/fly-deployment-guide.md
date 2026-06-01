# Fly.io Backend Deployment Guide

This guide deploys only the FastAPI backend to Fly.io.
Use Vercel for the frontend and Supabase/Fly Postgres for the database.

## 1. Install and Login

Install Fly CLI:

```bash
winget install Fly-io.flyctl
```

Login:

```bash
fly auth login
```

## 2. Create or Select a Database

Use a PostgreSQL connection string from Supabase, Neon, or Fly Postgres.

The backend expects:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
```

## 3. Create the Fly App

From the repository root:

```bash
cd backend
```

Edit `fly.toml` and change:

```toml
app = "inventory-management-dashboard-api"
```

to a globally unique Fly app name.

Then create the app without deploying yet:

```bash
fly apps create YOUR_UNIQUE_APP_NAME
```

## 4. Set Secrets

Set the database URL:

```bash
fly secrets set DATABASE_URL="YOUR_POSTGRES_CONNECTION_STRING"
```

Set CORS once you know your frontend URL:

```bash
fly secrets set FRONTEND_URL="https://YOUR_FRONTEND.vercel.app"
fly secrets set CORS_ORIGINS="https://YOUR_FRONTEND.vercel.app"
```

For the first deploy, sample data can be seeded:

```bash
fly secrets set SEED_DATABASE="true"
```

After first successful deploy, turn it off:

```bash
fly secrets set SEED_DATABASE="false"
```

## 5. Deploy Backend

From `backend/`:

```bash
fly deploy
```

Your backend URL will be:

```text
https://YOUR_UNIQUE_APP_NAME.fly.dev
```

Check:

```text
https://YOUR_UNIQUE_APP_NAME.fly.dev/health
https://YOUR_UNIQUE_APP_NAME.fly.dev/docs
```

## 6. Configure Frontend

In Vercel, set:

```env
VITE_API_BASE_URL=https://YOUR_UNIQUE_APP_NAME.fly.dev/api/v1
```

Redeploy the frontend after changing this variable.

## Notes

- Fly apps must listen on `0.0.0.0` and the same port as `internal_port` in `fly.toml`.
- This backend listens on port `8000`, and `backend/fly.toml` sets `internal_port = 8000`.
- `DATABASE_URL` must be a secret, not committed to GitHub.
- If Fly asks for billing/card details, use the Supabase + Hugging Face route in `docs/free-deployment-guide.md` instead.

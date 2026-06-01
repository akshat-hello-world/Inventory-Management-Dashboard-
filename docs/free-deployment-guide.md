# Free Deployment Guide

This guide uses free tiers that normally do not require a card:

```text
Frontend: Vercel
Backend: Hugging Face Spaces Docker
Database: Supabase Postgres
```

## 1. Create Supabase Database

1. Go to Supabase and create a new project.
2. Open **Project Settings -> Database**.
3. Copy the Postgres connection string.
4. If the string does not include SSL, append:

```text
?sslmode=require
```

Use this value as `DATABASE_URL` for the backend.

## 2. Deploy Backend on Hugging Face Spaces

1. Create a new Hugging Face Space.
2. Choose **Docker** as the SDK.
3. Push this repository to the Space, or upload the repository files.
4. Hugging Face will build the root `Dockerfile`.
5. Add these Space variables/secrets:

```env
DATABASE_URL=<your-supabase-postgres-url>
DEBUG=false
LOW_STOCK_THRESHOLD=10
SEED_DATABASE=true
FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173
```

After the first successful deploy, you can set:

```env
SEED_DATABASE=false
```

Your backend URL will look like:

```text
https://<username>-<space-name>.hf.space
```

Check:

```text
https://<username>-<space-name>.hf.space/health
https://<username>-<space-name>.hf.space/docs
```

## 3. Deploy Frontend on Vercel

1. Import the GitHub repo into Vercel.
2. Use these settings:

```text
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

3. Add this Vercel environment variable:

```env
VITE_API_BASE_URL=https://<username>-<space-name>.hf.space/api/v1
VITE_APP_NAME=Inventory Order Management
VITE_APP_ENV=production
```

4. Deploy the frontend.

Your frontend URL will look like:

```text
https://<your-vercel-project>.vercel.app
```

## 4. Update Backend CORS

Go back to Hugging Face Space settings and update:

```env
FRONTEND_URL=https://<your-vercel-project>.vercel.app
CORS_ORIGINS=https://<your-vercel-project>.vercel.app
```

Restart the Space after changing variables.

## Notes

- Free services may sleep after inactivity.
- Keep `DATABASE_URL` as a secret, not a public variable, if the platform gives you that option.
- The root `Dockerfile` is for Hugging Face Spaces only.
- Local Docker Compose still uses the Dockerfiles inside `backend/` and `frontend/`.

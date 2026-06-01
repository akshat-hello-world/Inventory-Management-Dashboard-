# Deployment Guide

This document explains how to deploy the Inventory Order Management System using Render (Backend + PostgreSQL) and Vercel (Frontend).

---

# Architecture

```text
Frontend (Vercel)
        │
        ▼
Backend API (Render)
        │
        ▼
PostgreSQL Database (Render)
```

---

# Prerequisites

Before deployment, ensure you have:

* GitHub repository pushed
* Docker Hub account (for backend image submission)
* Render account
* Vercel account

---

# Backend Deployment (Render)

## Step 1: Create PostgreSQL Database

1. Login to Render
2. Click **New**
3. Select **PostgreSQL**
4. Configure:

```text
Name: inventory-db
Database: inventory_db
User: inventory_user
Region: nearest region
```

5. Click **Create Database**

After creation, copy the:

```text
External Database URL
```

You will use it as:

```env
DATABASE_URL=<Render Database URL>
```

---

## Step 2: Create Backend Web Service

1. Click **New**
2. Select **Web Service**
3. Connect GitHub Repository
4. Select repository

### Configuration

```text
Root Directory: backend
Environment: Python
Build Command:
pip install -r requirements.txt && alembic upgrade head

Start Command:
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

---

## Step 3: Configure Environment Variables

Add the following variables:

```env
APP_NAME=Inventory Order Management API

APP_ENV=production

DEBUG=false

DATABASE_URL=<Render Database URL>

CORS_ORIGINS=https://your-frontend.vercel.app

LOW_STOCK_THRESHOLD=10

LOG_LEVEL=INFO
```

---

## Step 4: Deploy Backend

Click:

```text
Manual Deploy
→ Deploy Latest Commit
```

After deployment, Render will generate:

```text
https://your-backend.onrender.com
```

Verify:

```text
https://your-backend.onrender.com/docs
```

Swagger documentation should open successfully.

---

# Frontend Deployment (Vercel)

## Step 1: Import Repository

1. Login to Vercel
2. Click **Add New Project**
3. Import GitHub Repository

---

## Step 2: Configure Build Settings

```text
Framework Preset: Vite

Root Directory: frontend

Build Command:
npm run build

Output Directory:
dist
```

---

## Step 3: Configure Environment Variables

Add:

```env
VITE_API_BASE_URL=https://your-backend.onrender.com/api/v1

VITE_APP_NAME=Inventory Order Management

VITE_APP_ENV=production
```

---

## Step 4: Deploy Frontend

Click:

```text
Deploy
```

After deployment:

```text
https://your-app.vercel.app
```

will be available.

---

# Configure Backend CORS

Update Render backend environment variable:

```env
CORS_ORIGINS=https://your-app.vercel.app
```

Redeploy backend after updating.

---

# Docker Deployment (Optional)

## Build Backend Image

```bash
docker build \
-t inventory-backend \
./backend
```

## Run Backend

```bash
docker run \
-p 8000:8000 \
inventory-backend
```

---

## Build Frontend Image

```bash
docker build \
-t inventory-frontend \
./frontend
```

## Run Frontend

```bash
docker run \
-p 3000:80 \
inventory-frontend
```

---

# Local Development

## Start Using Docker Compose

From project root:

```bash
docker compose up --build
```

Application URLs:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:8000

Swagger:
http://localhost:8000/docs
```

---

# Database Migration

Create migration:

```bash
alembic revision --autogenerate -m "migration_name"
```

Apply migration:

```bash
alembic upgrade head
```

Rollback migration:

```bash
alembic downgrade -1
```

---

# Seed Sample Data

Run:

```bash
python -m app.db.seed
```

or:

```bash
docker compose exec backend python -m app.db.seed
```

---

# Health Checks

Backend API:

```text
GET /
```

Expected response:

```json
{
  "message": "Inventory Order Management API",
  "status": "healthy"
}
```

Swagger UI:

```text
/api/docs
```

---

# Submission Links

After deployment, submit:

## GitHub Repository

```text
https://github.com/your-username/inventory-order-management
```

## Backend Docker Hub Image

```text
https://hub.docker.com/r/your-username/inventory-backend
```

## Frontend Hosted URL

```text
https://your-app.vercel.app
```

## Backend API URL

```text
https://your-backend.onrender.com
```

---

Deployment completed successfully.

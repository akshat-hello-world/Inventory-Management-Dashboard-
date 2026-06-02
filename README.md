# Inventory Order Management System

A modern full-stack Inventory & Order Management application built with **React**, **FastAPI**, **PostgreSQL**, **Docker**, and **Alembic**.

The system enables businesses to efficiently manage products, customers, orders, inventory levels, and operational analytics through a responsive dashboard.

---

## Live Demo

### Frontend

```text
https://inventory-management-dashboard-nine.vercel.app
```

### Backend API

```text
https://tokyo-boy-inventory-backend.hf.space
```

### API Documentation

```text
https://tokyo-boy-inventory-backend.hf.space/docs
```

### Docker

```text
https://hub.docker.com/r/akshatkk/inventory-backend
```
---

# Features

## Dashboard

* Inventory Overview
* Product Statistics
* Customer Statistics
* Order Statistics
* Inventory Value Calculation
* Low Stock Alerts
* Recent Orders Feed

## Product Management

* Create Products
* Update Products
* Delete Products
* SKU Management
* Stock Tracking
* Product Search

## Customer Management

* Create Customers
* Update Customers
* Delete Customers
* Email Validation
* Customer Search

## Order Management

* Create Orders
* Multiple Line Items
* Automatic Inventory Deduction
* Order Details View
* Order History
* Inventory Validation

## Backend Features

* RESTful API
* Supabase PostgreSQL Database
* Alembic Migrations
* Pydantic Validation
* Service Layer Architecture
* Global Exception Handling

## DevOps Features

* Dockerized Backend
* Dockerized Frontend
* Docker Compose Support
* GitHub Actions CI
* Hugging Face Spaces Deployment
* Vercel Deployment

---

# Tech Stack

## Frontend

* React 18
* Vite
* React Router
* Axios
* React Hook Form
* Zod
* Lucide React
* React Hot Toast

## Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Alembic
* Pydantic
* Uvicorn

## Infrastructure

* Docker
* Docker Compose
* GitHub Actions
* Hugging Face Spaces
* Vercel
* Supabase PostgreSQL

---

# Project Structure

```text
inventory-order-management/
│
├── backend/
├── frontend/
├── docs/
├── screenshots/
├── docker-compose.yml
└── README.md
```

---

# Architecture

```text
React Frontend (Vercel)
           │
           ▼
FastAPI Backend (Hugging Face Spaces Docker)
           │
           ▼
Supabase PostgreSQL
```

---

# Screenshots

## Dashboard

![Dashboard](screenshots/Dashboard.png)

## Products Management

![Products](screenshots/product.png)

## Customers Management

![Customers](screenshots/customer.png)

## Orders Management

![Orders](screenshots/order.png)

## Mobile Responsive View

![Mobile View](screenshots/mobile-view.jpeg)

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/akshat-hello-world/Inventory-Management-Dashboard-.git

cd inventory-management-dashboard
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Linux / Mac
source venv/bin/activate

# Windows
venv\Scripts\activate

pip install -r requirements.txt
```

Create environment file:

```bash
cp .env.example .env
```

Run migrations:

```bash
alembic upgrade head
```

Seed database:

```bash
python -m app.db.seed
```

Start server:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create environment file:

```bash
cp .env.example .env
```

Start frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# Docker Setup

```bash
docker compose up --build
```

Services:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:8000

Swagger:
http://localhost:8000/docs
```

---

# Environment Variables

## Backend

```env
DATABASE_URL=
CORS_ORIGINS=
LOW_STOCK_THRESHOLD=
```

## Frontend

```env
VITE_API_BASE_URL=
```

---

# Deployment

Deployment stack:

```text
Frontend -> Vercel
Backend -> Hugging Face Spaces Docker
Database -> Supabase Postgres
```

Live URLs:

```text
Frontend:
https://inventory-management-dashboard-nine.vercel.app

Backend:
https://tokyo-boy-inventory-backend.hf.space

API Docs:
https://tokyo-boy-inventory-backend.hf.space/docs

Docker:
https://hub.docker.com/r/akshatkk/inventory-backend
```

---

# Continuous Integration

GitHub Actions automatically:

* Installs backend dependencies
* Validates backend imports
* Builds frontend application
* Verifies Docker image builds

Workflow:

```text
.github/workflows/ci.yml
```

---

# Future Enhancements

* Authentication & Authorization
* Role-Based Access Control
* Inventory Reports
* CSV Export
* PDF Invoice Generation
* Order Status Tracking
* Audit Logging
* Unit Tests
* Integration Tests

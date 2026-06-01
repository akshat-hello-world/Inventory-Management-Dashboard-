from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.customers import router as customers_router
from app.api.v1.dashboard import router as dashboard_router
from app.api.v1.orders import router as orders_router
from app.api.v1.products import router as products_router
from app.core.config import settings


# ==================================================
# FastAPI Application
# ==================================================

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "Inventory & Order Management System API "
        "built with FastAPI, PostgreSQL, and SQLAlchemy."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
)


# ==================================================
# CORS
# ==================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================================================
# Health Check
# ==================================================

@app.get(
    "/health",
    tags=["Health"],
)
def health_check():
    """
    Health check endpoint.
    """

    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }


# ==================================================
# Root Endpoint
# ==================================================

@app.get(
    "/",
    tags=["Root"],
)
def root():
    """
    Root endpoint.
    """

    return {
        "message": (
            "Inventory & Order Management API"
        ),
        "docs": "/docs",
        "health": "/health",
    }


# ==================================================
# API Routes
# ==================================================

app.include_router(
    products_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    customers_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    orders_router,
    prefix=settings.API_V1_PREFIX,
)

app.include_router(
    dashboard_router,
    prefix=settings.API_V1_PREFIX,
)
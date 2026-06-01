from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import settings


# ==================================================
# Database Engine
# ==================================================

engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_pre_ping=True,
)


# ==================================================
# Session Factory
# ==================================================

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
)


# ==================================================
# Base Model Class
# ==================================================

class Base(DeclarativeBase):
    """
    Base class for all SQLAlchemy models.
    """
    pass


# ==================================================
# Dependency
# ==================================================

def get_db() -> Generator[Session, None, None]:
    """
    FastAPI database dependency.

    Usage:
        db: Session = Depends(get_db)
    """
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
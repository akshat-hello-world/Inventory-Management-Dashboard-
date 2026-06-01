from datetime import datetime

from sqlalchemy import DateTime, Index, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Customer(Base):
    __tablename__ = "customers"

    __table_args__ = (
        Index("ix_customers_full_name", "full_name"),
        Index("ix_customers_email", "email"),
    )

    # ==================================================
    # Primary Key
    # ==================================================

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    # ==================================================
    # Customer Information
    # ==================================================

    full_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
    )

    phone: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    # ==================================================
    # Timestamps
    # ==================================================

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # ==================================================
    # Relationships
    # ==================================================

    orders: Mapped[list["Order"]] = relationship(
        "Order",
        back_populates="customer",
        cascade="all, delete-orphan",
    )

    # ==================================================
    # Representation
    # ==================================================

    def __repr__(self) -> str:
        return (
            f"Customer("
            f"id={self.id}, "
            f"email='{self.email}'"
            f")"
        )
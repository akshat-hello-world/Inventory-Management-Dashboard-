from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, Index, Numeric, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    __table_args__ = (
        Index("ix_products_name", "name"),
        Index("ix_products_sku", "sku"),
    )

    # ==================================================
    # Primary Key
    # ==================================================

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    # ==================================================
    # Product Information
    # ==================================================

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    sku: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
    )

    price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    stock_quantity: Mapped[int] = mapped_column(
        nullable=False,
        default=0,
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

    order_items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="product",
    )

    # ==================================================
    # Representation
    # ==================================================

    def __repr__(self) -> str:
        return (
            f"Product("
            f"id={self.id}, "
            f"name='{self.name}', "
            f"sku='{self.sku}'"
            f")"
        )
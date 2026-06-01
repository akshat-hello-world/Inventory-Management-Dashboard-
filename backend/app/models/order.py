from datetime import datetime
from decimal import Decimal

from sqlalchemy import DateTime, ForeignKey, Numeric, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Order(Base):
    __tablename__ = "orders"

    # ==================================================
    # Primary Key
    # ==================================================

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    # ==================================================
    # Customer Reference
    # ==================================================

    customer_id: Mapped[int] = mapped_column(
        ForeignKey(
            "customers.id",
            ondelete="RESTRICT",
        ),
        nullable=False,
        index=True,
    )

    # ==================================================
    # Order Information
    # ==================================================

    total_amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
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

    customer: Mapped["Customer"] = relationship(
        "Customer",
        back_populates="orders",
    )

    order_items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
    )

    # ==================================================
    # Representation
    # ==================================================

    def __repr__(self) -> str:
        return (
            f"Order("
            f"id={self.id}, "
            f"customer_id={self.customer_id}, "
            f"total_amount={self.total_amount}"
            f")"
        )
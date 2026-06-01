from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    __table_args__ = (
        UniqueConstraint(
            "order_id",
            "product_id",
            name="uq_order_product",
        ),
    )

    # ==================================================
    # Primary Key
    # ==================================================

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    # ==================================================
    # Foreign Keys
    # ==================================================

    order_id: Mapped[int] = mapped_column(
        ForeignKey(
            "orders.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    product_id: Mapped[int] = mapped_column(
        ForeignKey(
            "products.id",
            ondelete="RESTRICT",
        ),
        nullable=False,
        index=True,
    )

    # ==================================================
    # Order Details
    # ==================================================

    quantity: Mapped[int] = mapped_column(
        nullable=False,
    )

    unit_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    # ==================================================
    # Relationships
    # ==================================================

    order: Mapped["Order"] = relationship(
        "Order",
        back_populates="order_items",
    )

    product: Mapped["Product"] = relationship(
        "Product",
        back_populates="order_items",
    )

    # ==================================================
    # Computed Properties
    # ==================================================

    @property
    def subtotal(self) -> Decimal:
        """
        Calculate line item total.
        """
        return self.unit_price * self.quantity

    # ==================================================
    # Representation
    # ==================================================

    def __repr__(self) -> str:
        return (
            f"OrderItem("
            f"id={self.id}, "
            f"order_id={self.order_id}, "
            f"product_id={self.product_id}, "
            f"quantity={self.quantity}"
            f")"
        )
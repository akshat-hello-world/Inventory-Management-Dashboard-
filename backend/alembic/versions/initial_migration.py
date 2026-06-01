"""initial schema

Revision ID: 001_initial_schema
Revises:
Create Date: 2026-05-31

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers
revision: str = "001_initial_schema"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ==================================================
    # Products
    # ==================================================

    op.create_table(
        "products",
        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
        ),
        sa.Column(
            "name",
            sa.String(length=255),
            nullable=False,
        ),
        sa.Column(
            "sku",
            sa.String(length=100),
            nullable=False,
            unique=True,
        ),
        sa.Column(
            "price",
            sa.Numeric(10, 2),
            nullable=False,
        ),
        sa.Column(
            "stock_quantity",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.CheckConstraint(
            "price > 0",
            name="ck_product_price_positive",
        ),
        sa.CheckConstraint(
            "stock_quantity >= 0",
            name="ck_product_stock_non_negative",
        ),
    )

    op.create_index(
        "ix_products_name",
        "products",
        ["name"],
    )

    op.create_index(
        "ix_products_sku",
        "products",
        ["sku"],
    )

    # ==================================================
    # Customers
    # ==================================================

    op.create_table(
        "customers",
        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
        ),
        sa.Column(
            "full_name",
            sa.String(length=255),
            nullable=False,
        ),
        sa.Column(
            "email",
            sa.String(length=255),
            nullable=False,
            unique=True,
        ),
        sa.Column(
            "phone",
            sa.String(length=20),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )

    op.create_index(
        "ix_customers_full_name",
        "customers",
        ["full_name"],
    )

    op.create_index(
        "ix_customers_email",
        "customers",
        ["email"],
    )

    # ==================================================
    # Orders
    # ==================================================

    op.create_table(
        "orders",
        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
        ),
        sa.Column(
            "customer_id",
            sa.Integer(),
            nullable=False,
        ),
        sa.Column(
            "total_amount",
            sa.Numeric(10, 2),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["customer_id"],
            ["customers.id"],
            ondelete="RESTRICT",
        ),
    )

    op.create_index(
        "ix_orders_customer_id",
        "orders",
        ["customer_id"],
    )

    # ==================================================
    # Order Items
    # ==================================================

    op.create_table(
        "order_items",
        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
        ),
        sa.Column(
            "order_id",
            sa.Integer(),
            nullable=False,
        ),
        sa.Column(
            "product_id",
            sa.Integer(),
            nullable=False,
        ),
        sa.Column(
            "quantity",
            sa.Integer(),
            nullable=False,
        ),
        sa.Column(
            "unit_price",
            sa.Numeric(10, 2),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["order_id"],
            ["orders.id"],
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["product_id"],
            ["products.id"],
            ondelete="RESTRICT",
        ),
        sa.UniqueConstraint(
            "order_id",
            "product_id",
            name="uq_order_product",
        ),
        sa.CheckConstraint(
            "quantity > 0",
            name="ck_order_item_quantity_positive",
        ),
    )

    op.create_index(
        "ix_order_items_order_id",
        "order_items",
        ["order_id"],
    )

    op.create_index(
        "ix_order_items_product_id",
        "order_items",
        ["product_id"],
    )


def downgrade() -> None:
    op.drop_index(
        "ix_order_items_product_id",
        table_name="order_items",
    )

    op.drop_index(
        "ix_order_items_order_id",
        table_name="order_items",
    )

    op.drop_table("order_items")

    op.drop_index(
        "ix_orders_customer_id",
        table_name="orders",
    )

    op.drop_table("orders")

    op.drop_index(
        "ix_customers_email",
        table_name="customers",
    )

    op.drop_index(
        "ix_customers_full_name",
        table_name="customers",
    )

    op.drop_table("customers")

    op.drop_index(
        "ix_products_sku",
        table_name="products",
    )

    op.drop_index(
        "ix_products_name",
        table_name="products",
    )

    op.drop_table("products")
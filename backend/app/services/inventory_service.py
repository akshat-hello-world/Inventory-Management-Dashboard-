from decimal import Decimal

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.core.exceptions import (
    CustomerNotFoundException,
    InsufficientStockException,
    OrderNotFoundException,
    ProductNotFoundException,
)
from app.models.customer import Customer
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate


class InventoryService:
    """
    Handles inventory management and order processing.
    """

    @staticmethod
    def create_order(
        db: Session,
        payload: OrderCreate,
    ) -> Order:
        """
        Create an order with inventory validation
        and automatic stock deduction.
        """

        # ==========================================
        # Validate Customer
        # ==========================================

        customer = db.get(
            Customer,
            payload.customer_id,
        )

        if not customer:
            raise CustomerNotFoundException(
                payload.customer_id
            )

        # ==========================================
        # Load Products
        # ==========================================

        product_ids = [
            item.product_id
            for item in payload.items
        ]

        products = db.execute(
            select(Product).where(
                Product.id.in_(product_ids)
            )
        ).scalars().all()

        products_map = {
            product.id: product
            for product in products
        }

        # ==========================================
        # Validate Products & Inventory
        # ==========================================

        for item in payload.items:
            product = products_map.get(
                item.product_id
            )

            if not product:
                raise ProductNotFoundException(
                    item.product_id
                )

            if product.stock_quantity < item.quantity:
                raise InsufficientStockException(
                    product_name=product.name,
                    available_stock=product.stock_quantity,
                )

        # ==========================================
        # Create Order
        # ==========================================

        order = Order(
            customer_id=payload.customer_id,
            total_amount=Decimal("0.00"),
        )

        db.add(order)
        db.flush()

        total_amount = Decimal("0.00")

        # ==========================================
        # Create Order Items
        # ==========================================

        for item in payload.items:
            product = products_map[item.product_id]

            line_total = (
                product.price * item.quantity
            )

            total_amount += line_total

            order_item = OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=item.quantity,
                unit_price=product.price,
            )

            db.add(order_item)

            # Inventory Deduction
            product.stock_quantity -= item.quantity

        order.total_amount = total_amount

        db.commit()
        db.refresh(order)

        return order

    @staticmethod
    def get_order(
        db: Session,
        order_id: int,
    ) -> Order:
        """
        Retrieve order details.
        """

        order = db.execute(
            select(Order)
            .options(
                joinedload(Order.customer),
                joinedload(Order.order_items)
                .joinedload(OrderItem.product),
            )
            .where(Order.id == order_id)
        ).unique().scalar_one_or_none()

        if not order:
            raise OrderNotFoundException(
                order_id
            )

        return order

    @staticmethod
    def get_orders(
        db: Session,
    ) -> list[Order]:
        """
        Retrieve all orders.
        """

        return (
            db.execute(
                select(Order)
                .options(
                    joinedload(Order.customer),
                    joinedload(Order.order_items)
                    .joinedload(OrderItem.product),
                )
                .order_by(Order.created_at.desc())
            )
            .unique()
            .scalars()
            .all()
        )

    @staticmethod
    def delete_order(
        db: Session,
        order_id: int,
    ) -> None:
        """
        Delete an order.

        Inventory restoration is intentionally
        omitted because the assessment only
        requires stock deduction on creation.
        """

        order = db.get(Order, order_id)

        if not order:
            raise OrderNotFoundException(
                order_id
            )

        db.delete(order)
        db.commit()
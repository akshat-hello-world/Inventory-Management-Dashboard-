# from sqlalchemy import func, select
# from sqlalchemy.orm import Session, selectinload

# from app.models.customer import Customer
# from app.models.order import Order
# from app.models.product import Product
# from app.schemas.dashboard import (
#     DashboardResponse,
#     DashboardStats,
#     LowStockProduct,
#     RecentOrder,
# )
# from app.utils.constants import LOW_STOCK_THRESHOLD


# class DashboardService:
#     """
#     Dashboard analytics service.
#     """

#     @staticmethod
#     def get_dashboard_data(
#         db: Session,
#     ) -> DashboardResponse:
#         """
#         Retrieve dashboard statistics and
#         low stock products.
#         """

#         # ==========================================
#         # Aggregate Counts
#         # ==========================================

#         total_products = db.scalar(
#             select(func.count(Product.id))
#         ) or 0

#         total_customers = db.scalar(
#             select(func.count(Customer.id))
#         ) or 0

#         total_orders = db.scalar(
#             select(func.count(Order.id))
#         ) or 0

#         # ==========================================
#         # Low Stock Products
#         # ==========================================

#         low_stock_products = (
#             db.execute(
#                 select(Product)
#                 .where(
#                     Product.stock_quantity
#                     <= LOW_STOCK_THRESHOLD
#                 )
#                 .order_by(
#                     Product.stock_quantity.asc()
#                 )
#             )
#             .scalars()
#             .all()
#         )

#         # ==========================================
#         # Response DTO
#         # ==========================================

#         return DashboardResponse(
#             stats=DashboardStats(
#                 total_products=total_products,
#                 total_customers=total_customers,
#                 total_orders=total_orders,
#             ),
#             low_stock_products=[
#                 LowStockProduct.model_validate(
#                     product
#                 )
#                 for product in low_stock_products
#             ],
#         )

from sqlalchemy import func, select
from sqlalchemy.orm import Session, selectinload

from app.models.customer import Customer
from app.models.order import Order
from app.models.product import Product
from app.schemas.dashboard import (
    DashboardResponse,
    DashboardStats,
    LowStockProduct,
    RecentOrder,
)
from app.utils.constants import LOW_STOCK_THRESHOLD


class DashboardService:
    @staticmethod
    def get_dashboard_data(db: Session) -> DashboardResponse:
        total_products = db.scalar(select(func.count(Product.id))) or 0
        total_customers = db.scalar(select(func.count(Customer.id))) or 0
        total_orders = db.scalar(select(func.count(Order.id))) or 0

        inventory_value = db.scalar(
            select(
                func.coalesce(
                    func.sum(Product.price * Product.stock_quantity),
                    0,
                )
            )
        ) or 0

        low_stock_products = (
            db.execute(
                select(Product)
                .where(Product.stock_quantity <= LOW_STOCK_THRESHOLD)
                .order_by(Product.stock_quantity.asc())
            )
            .scalars()
            .all()
        )

        recent_orders = (
            db.execute(
                select(Order)
                .options(selectinload(Order.customer))
                .order_by(Order.created_at.desc())
                .limit(5)
            )
            .scalars()
            .all()
        )

        return DashboardResponse(
            stats=DashboardStats(
                total_products=total_products,
                total_customers=total_customers,
                total_orders=total_orders,
                inventory_value=inventory_value,
            ),
            low_stock_products=[
                LowStockProduct.model_validate(product)
                for product in low_stock_products
            ],
            recent_orders=[
                RecentOrder.model_validate(order)
                for order in recent_orders
            ],
        )
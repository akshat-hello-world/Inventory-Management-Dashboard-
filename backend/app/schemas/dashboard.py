# from decimal import Decimal

# from pydantic import BaseModel, ConfigDict


# # ==================================================
# # Low Stock Product
# # ==================================================

# class LowStockProduct(BaseModel):
#     id: int
#     name: str
#     sku: str
#     stock_quantity: int
#     price: Decimal

#     model_config = ConfigDict(
#         from_attributes=True,
#     )


# # ==================================================
# # Dashboard Statistics
# # ==================================================

# class DashboardStats(BaseModel):
#     total_products: int
#     total_customers: int
#     total_orders: int


# # ==================================================
# # Dashboard Response
# # ==================================================

# class DashboardResponse(BaseModel):
#     stats: DashboardStats
#     low_stock_products: list[LowStockProduct]

#     model_config = ConfigDict(
#         from_attributes=True,
#     )
# from datetime import datetime
from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class LowStockProduct(BaseModel):
    id: int
    name: str
    sku: str
    stock_quantity: int
    price: Decimal

    model_config = ConfigDict(from_attributes=True)


class DashboardStats(BaseModel):
    total_products: int
    total_customers: int
    total_orders: int
    inventory_value: Decimal


class RecentOrderCustomer(BaseModel):
    full_name: str

    model_config = ConfigDict(from_attributes=True)


class RecentOrder(BaseModel):
    id: int
    total_amount: Decimal
    created_at: datetime
    customer: RecentOrderCustomer | None = None

    model_config = ConfigDict(from_attributes=True)


class DashboardResponse(BaseModel):
    stats: DashboardStats
    low_stock_products: list[LowStockProduct]
    recent_orders: list[RecentOrder]

    model_config = ConfigDict(from_attributes=True)
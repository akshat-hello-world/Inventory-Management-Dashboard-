"""
Application-wide constants.
"""

# ==================================================
# Pagination
# ==================================================

DEFAULT_PAGE: int = 1
DEFAULT_PAGE_SIZE: int = 10
MAX_PAGE_SIZE: int = 100


# ==================================================
# Inventory Rules
# ==================================================

LOW_STOCK_THRESHOLD: int = 10
MIN_PRODUCT_PRICE: float = 0.01
MIN_ORDER_QUANTITY: int = 1
MIN_STOCK_QUANTITY: int = 0


# ==================================================
# Order Status
# ==================================================

ORDER_STATUS_PENDING: str = "pending"
ORDER_STATUS_COMPLETED: str = "completed"
ORDER_STATUS_CANCELLED: str = "cancelled"

ORDER_STATUSES: tuple[str, ...] = (
    ORDER_STATUS_PENDING,
    ORDER_STATUS_COMPLETED,
    ORDER_STATUS_CANCELLED,
)


# ==================================================
# Sorting
# ==================================================

SORT_ASC: str = "asc"
SORT_DESC: str = "desc"

SORT_DIRECTIONS: tuple[str, ...] = (
    SORT_ASC,
    SORT_DESC,
)


# ==================================================
# API Messages
# ==================================================

PRODUCT_CREATED: str = "Product created successfully."
PRODUCT_UPDATED: str = "Product updated successfully."
PRODUCT_DELETED: str = "Product deleted successfully."

CUSTOMER_CREATED: str = "Customer created successfully."
CUSTOMER_UPDATED: str = "Customer updated successfully."
CUSTOMER_DELETED: str = "Customer deleted successfully."

ORDER_CREATED: str = "Order created successfully."
ORDER_DELETED: str = "Order deleted successfully."


# ==================================================
# Dashboard
# ==================================================

DASHBOARD_LOW_STOCK_LIMIT: int = 10


# ==================================================
# Date Formats
# ==================================================

DEFAULT_DATETIME_FORMAT: str = "%Y-%m-%d %H:%M:%S"
DEFAULT_DATE_FORMAT: str = "%Y-%m-%d"
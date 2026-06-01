from fastapi import HTTPException, status


# ==================================================
# Product Exceptions
# ==================================================

class ProductNotFoundException(HTTPException):
    def __init__(self, product_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {product_id} not found.",
        )


class DuplicateSKUException(HTTPException):
    def __init__(self, sku: str):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Product SKU '{sku}' already exists.",
        )


# ==================================================
# Customer Exceptions
# ==================================================

class CustomerNotFoundException(HTTPException):
    def __init__(self, customer_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Customer with ID {customer_id} not found.",
        )


class DuplicateEmailException(HTTPException):
    def __init__(self, email: str):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Customer email '{email}' already exists.",
        )


# ==================================================
# Order Exceptions
# ==================================================

class OrderNotFoundException(HTTPException):
    def __init__(self, order_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with ID {order_id} not found.",
        )


# ==================================================
# Inventory Exceptions
# ==================================================

class InsufficientStockException(HTTPException):
    def __init__(
        self,
        product_name: str,
        available_stock: int,
    ):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Insufficient stock for '{product_name}'. "
                f"Available stock: {available_stock}."
            ),
        )


# ==================================================
# Validation Exceptions
# ==================================================

class InvalidOrderQuantityException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order quantity must be greater than zero.",
        )


class InvalidStockQuantityException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Stock quantity cannot be negative.",
        )


class InvalidPriceException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product price must be greater than zero.",
        )
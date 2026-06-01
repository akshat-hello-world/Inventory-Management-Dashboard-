import re

from app.utils.constants import (
    MIN_ORDER_QUANTITY,
    MIN_PRODUCT_PRICE,
    MIN_STOCK_QUANTITY,
)


EMAIL_REGEX = re.compile(
    r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
)

SKU_REGEX = re.compile(
    r"^[A-Z0-9_-]{3,50}$"
)


def validate_email(email: str) -> str:
    """
    Validate email format.
    """

    email = email.strip().lower()

    if not EMAIL_REGEX.fullmatch(email):
        raise ValueError("Invalid email format.")

    return email


def validate_sku(sku: str) -> str:
    """
    Validate SKU format.

    Examples:
        LAPTOP-001
        PRODUCT_123
        SKU001
    """

    sku = sku.strip().upper()

    if not SKU_REGEX.fullmatch(sku):
        raise ValueError(
            "SKU must contain only uppercase letters, "
            "numbers, hyphens, and underscores."
        )

    return sku


def validate_product_price(price: float) -> float:
    """
    Product price must be positive.
    """

    if price < MIN_PRODUCT_PRICE:
        raise ValueError(
            f"Price must be at least {MIN_PRODUCT_PRICE}."
        )

    return price


def validate_stock_quantity(stock_quantity: int) -> int:
    """
    Stock cannot be negative.
    """

    if stock_quantity < MIN_STOCK_QUANTITY:
        raise ValueError(
            "Stock quantity cannot be negative."
        )

    return stock_quantity


def validate_order_quantity(quantity: int) -> int:
    """
    Order quantity must be positive.
    """

    if quantity < MIN_ORDER_QUANTITY:
        raise ValueError(
            "Order quantity must be greater than zero."
        )

    return quantity


def validate_phone(phone: str) -> str:
    """
    Basic phone validation.
    Stores digits only.
    """

    phone = re.sub(r"\D", "", phone)

    if len(phone) < 10:
        raise ValueError(
            "Phone number must contain at least 10 digits."
        )

    return phone
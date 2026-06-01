from datetime import datetime
from decimal import Decimal

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    field_validator,
)

from app.utils.validators import validate_order_quantity


# ==================================================
# Order Item Create
# ==================================================

class OrderItemCreate(BaseModel):
    product_id: int = Field(
        ...,
        gt=0,
        description="Product ID",
    )

    quantity: int = Field(
        ...,
        gt=0,
        description="Quantity ordered",
    )

    @field_validator("quantity")
    @classmethod
    def validate_quantity(cls, value: int) -> int:
        return validate_order_quantity(value)


# ==================================================
# Order Create
# ==================================================

class OrderCreate(BaseModel):
    customer_id: int = Field(
        ...,
        gt=0,
        description="Customer ID",
    )

    items: list[OrderItemCreate] = Field(
        ...,
        min_length=1,
        description="Order items",
    )


# ==================================================
# Order Item Response
# ==================================================

class OrderItemResponse(BaseModel):
    id: int

    product_id: int
    quantity: int

    unit_price: Decimal

    model_config = ConfigDict(
        from_attributes=True,
    )


# ==================================================
# Order Response
# ==================================================

class OrderResponse(BaseModel):
    id: int

    customer_id: int

    total_amount: Decimal

    created_at: datetime
    updated_at: datetime

    order_items: list[OrderItemResponse]

    model_config = ConfigDict(
        from_attributes=True,
    )
from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.utils.validators import (
    validate_product_price,
    validate_sku,
    validate_stock_quantity,
)


# ==================================================
# Base Schema
# ==================================================

class ProductBase(BaseModel):
    name: str = Field(
        ...,
        min_length=2,
        max_length=255,
        description="Product name",
    )

    sku: str = Field(
        ...,
        min_length=3,
        max_length=100,
        description="Unique product SKU",
    )

    price: Decimal = Field(
        ...,
        gt=0,
        description="Product price",
    )

    stock_quantity: int = Field(
        ...,
        ge=0,
        description="Available stock quantity",
    )

    @field_validator("sku")
    @classmethod
    def validate_product_sku(cls, value: str) -> str:
        return validate_sku(value)

    @field_validator("price")
    @classmethod
    def validate_price(cls, value: Decimal) -> Decimal:
        return validate_product_price(value)

    @field_validator("stock_quantity")
    @classmethod
    def validate_stock(cls, value: int) -> int:
        return validate_stock_quantity(value)


# ==================================================
# Create Schema
# ==================================================

class ProductCreate(ProductBase):
    pass


# ==================================================
# Update Schema
# ==================================================

class ProductUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=255,
    )

    sku: str | None = Field(
        default=None,
        min_length=3,
        max_length=100,
    )

    price: Decimal | None = Field(
        default=None,
        gt=0,
    )

    stock_quantity: int | None = Field(
        default=None,
        ge=0,
    )

    @field_validator("sku")
    @classmethod
    def validate_product_sku(cls, value: str | None) -> str | None:
        if value is None:
            return value
        return validate_sku(value)

    @field_validator("price")
    @classmethod
    def validate_price(
        cls,
        value: Decimal | None,
    ) -> Decimal | None:
        if value is None:
            return value
        return validate_product_price(value)

    @field_validator("stock_quantity")
    @classmethod
    def validate_stock(
        cls,
        value: int | None,
    ) -> int | None:
        if value is None:
            return value
        return validate_stock_quantity(value)


# ==================================================
# Response Schema
# ==================================================

class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )
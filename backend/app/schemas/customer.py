from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator,
)

from app.utils.validators import (
    validate_email,
    validate_phone,
)


# ==================================================
# Base Schema
# ==================================================

class CustomerBase(BaseModel):
    full_name: str = Field(
        ...,
        min_length=2,
        max_length=255,
        description="Customer full name",
    )

    email: EmailStr = Field(
        ...,
        description="Customer email address",
    )

    phone: str = Field(
        ...,
        min_length=10,
        max_length=20,
        description="Customer phone number",
    )

    @field_validator("email")
    @classmethod
    def validate_customer_email(cls, value: str) -> str:
        return validate_email(value)

    @field_validator("phone")
    @classmethod
    def validate_customer_phone(cls, value: str) -> str:
        return validate_phone(value)


# ==================================================
# Create Schema
# ==================================================

class CustomerCreate(CustomerBase):
    pass


# ==================================================
# Update Schema
# ==================================================

class CustomerUpdate(BaseModel):
    full_name: str | None = Field(
        default=None,
        min_length=2,
        max_length=255,
    )

    email: EmailStr | None = None

    phone: str | None = Field(
        default=None,
        min_length=10,
        max_length=20,
    )

    @field_validator("email")
    @classmethod
    def validate_customer_email(
        cls,
        value: str | None,
    ) -> str | None:
        if value is None:
            return value

        return validate_email(value)

    @field_validator("phone")
    @classmethod
    def validate_customer_phone(
        cls,
        value: str | None,
    ) -> str | None:
        if value is None:
            return value

        return validate_phone(value)


# ==================================================
# Response Schema
# ==================================================

class CustomerResponse(CustomerBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )
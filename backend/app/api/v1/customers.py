from fastapi import (
    APIRouter,
    Depends,
    Response,
    status,
)
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.exceptions import (
    CustomerNotFoundException,
    DuplicateEmailException,
)
from app.models.customer import Customer
from app.schemas.customer import (
    CustomerCreate,
    CustomerResponse,
    CustomerUpdate,
)

router = APIRouter(
    prefix="/customers",
    tags=["Customers"],
)


# ==================================================
# Create Customer
# ==================================================

@router.post(
    "",
    response_model=CustomerResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_customer(
    payload: CustomerCreate,
    db: Session = Depends(get_db),
):
    existing_customer = db.execute(
        select(Customer).where(
            Customer.email == payload.email
        )
    ).scalar_one_or_none()

    if existing_customer:
        raise DuplicateEmailException(
            payload.email
        )

    customer = Customer(
        **payload.model_dump()
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    return customer


# ==================================================
# Get All Customers
# ==================================================

@router.get(
    "",
    response_model=list[CustomerResponse],
)
def get_customers(
    db: Session = Depends(get_db),
):
    customers = (
        db.execute(
            select(Customer)
            .order_by(
                Customer.created_at.desc()
            )
        )
        .scalars()
        .all()
    )

    return customers


# ==================================================
# Get Customer By ID
# ==================================================

@router.get(
    "/{customer_id}",
    response_model=CustomerResponse,
)
def get_customer(
    customer_id: int,
    db: Session = Depends(get_db),
):
    customer = db.get(
        Customer,
        customer_id,
    )

    if not customer:
        raise CustomerNotFoundException(
            customer_id
        )

    return customer


# ==================================================
# Update Customer
# ==================================================

@router.put(
    "/{customer_id}",
    response_model=CustomerResponse,
)
def update_customer(
    customer_id: int,
    payload: CustomerUpdate,
    db: Session = Depends(get_db),
):
    customer = db.get(
        Customer,
        customer_id,
    )

    if not customer:
        raise CustomerNotFoundException(
            customer_id
        )

    update_data = payload.model_dump(
        exclude_unset=True
    )

    # Email uniqueness validation
    if (
        "email" in update_data
        and update_data["email"] != customer.email
    ):
        existing_customer = db.execute(
            select(Customer).where(
                Customer.email == update_data["email"]
            )
        ).scalar_one_or_none()

        if existing_customer:
            raise DuplicateEmailException(
                update_data["email"]
            )

    for field, value in update_data.items():
        setattr(
            customer,
            field,
            value,
        )

    db.commit()
    db.refresh(customer)

    return customer


# ==================================================
# Delete Customer
# ==================================================

@router.delete(
    "/{customer_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db),
):
    customer = db.get(
        Customer,
        customer_id,
    )

    if not customer:
        raise CustomerNotFoundException(
            customer_id
        )

    db.delete(customer)
    db.commit()

    return Response(
        status_code=status.HTTP_204_NO_CONTENT
    )
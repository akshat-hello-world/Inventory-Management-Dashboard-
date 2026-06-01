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
    DuplicateSKUException,
    ProductNotFoundException,
)
from app.models.product import Product
from app.schemas.product import (
    ProductCreate,
    ProductResponse,
    ProductUpdate,
)

router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


# ==================================================
# Create Product
# ==================================================

@router.post(
    "",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_product(
    payload: ProductCreate,
    db: Session = Depends(get_db),
):
    existing_product = db.execute(
        select(Product).where(
            Product.sku == payload.sku
        )
    ).scalar_one_or_none()

    if existing_product:
        raise DuplicateSKUException(
            payload.sku
        )

    product = Product(
        **payload.model_dump()
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return product


# ==================================================
# Get All Products
# ==================================================

@router.get(
    "",
    response_model=list[ProductResponse],
)
def get_products(
    db: Session = Depends(get_db),
):
    products = (
        db.execute(
            select(Product)
            .order_by(
                Product.created_at.desc()
            )
        )
        .scalars()
        .all()
    )

    return products


# ==================================================
# Get Product By ID
# ==================================================

@router.get(
    "/{product_id}",
    response_model=ProductResponse,
)
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = db.get(
        Product,
        product_id,
    )

    if not product:
        raise ProductNotFoundException(
            product_id
        )

    return product


# ==================================================
# Update Product
# ==================================================

@router.put(
    "/{product_id}",
    response_model=ProductResponse,
)
def update_product(
    product_id: int,
    payload: ProductUpdate,
    db: Session = Depends(get_db),
):
    product = db.get(
        Product,
        product_id,
    )

    if not product:
        raise ProductNotFoundException(
            product_id
        )

    update_data = payload.model_dump(
        exclude_unset=True
    )

    # SKU uniqueness validation
    if (
        "sku" in update_data
        and update_data["sku"] != product.sku
    ):
        existing_product = db.execute(
            select(Product).where(
                Product.sku == update_data["sku"]
            )
        ).scalar_one_or_none()

        if existing_product:
            raise DuplicateSKUException(
                update_data["sku"]
            )

    for field, value in update_data.items():
        setattr(
            product,
            field,
            value,
        )

    db.commit()
    db.refresh(product)

    return product


# ==================================================
# Delete Product
# ==================================================

@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = db.get(
        Product,
        product_id,
    )

    if not product:
        raise ProductNotFoundException(
            product_id
        )

    db.delete(product)
    db.commit()

    return Response(
        status_code=status.HTTP_204_NO_CONTENT
    )
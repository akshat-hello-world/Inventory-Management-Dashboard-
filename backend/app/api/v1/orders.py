from fastapi import (
    APIRouter,
    Depends,
    Response,
    status,
)
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.order import (
    OrderCreate,
    OrderResponse,
)
from app.services.inventory_service import (
    InventoryService,
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
)


# ==================================================
# Create Order
# ==================================================

@router.post(
    "",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_order(
    payload: OrderCreate,
    db: Session = Depends(get_db),
):
    """
    Create order and deduct inventory.
    """

    order = InventoryService.create_order(
        db=db,
        payload=payload,
    )

    return InventoryService.get_order(
        db=db,
        order_id=order.id,
    )


# ==================================================
# Get All Orders
# ==================================================

@router.get(
    "",
    response_model=list[OrderResponse],
)
def get_orders(
    db: Session = Depends(get_db),
):
    """
    Retrieve all orders.
    """

    return InventoryService.get_orders(
        db=db,
    )


# ==================================================
# Get Order By ID
# ==================================================

@router.get(
    "/{order_id}",
    response_model=OrderResponse,
)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
):
    """
    Retrieve order details.
    """

    return InventoryService.get_order(
        db=db,
        order_id=order_id,
    )


# ==================================================
# Delete Order
# ==================================================

@router.delete(
    "/{order_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_order(
    order_id: int,
    db: Session = Depends(get_db),
):
    """
    Delete an order.
    """

    InventoryService.delete_order(
        db=db,
        order_id=order_id,
    )

    return Response(
        status_code=status.HTTP_204_NO_CONTENT,
    )
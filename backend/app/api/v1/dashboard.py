from fastapi import (
    APIRouter,
    Depends,
)
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.dashboard import DashboardResponse
from app.services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


# ==================================================
# Dashboard Analytics
# ==================================================

@router.get(
    "",
    response_model=DashboardResponse,
)
def get_dashboard(
    db: Session = Depends(get_db),
):
    """
    Retrieve dashboard statistics and
    low stock inventory information.
    """

    return DashboardService.get_dashboard_data(
        db=db,
    )
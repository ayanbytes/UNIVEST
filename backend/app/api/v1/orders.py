from fastapi import APIRouter, Depends, status
from app.schemas.order import OrderCreate, OrderResponse
from app.models.user import User
from app.core.dependencies import get_current_user
from app.services.order_service import OrderService
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

def get_order_service(db: AsyncSession = Depends(get_db)) -> OrderService:
    return OrderService(db)

@router.post("/place", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def place_order(
    data: OrderCreate,
    current_user: User = Depends(get_current_user),
    order_service: OrderService = Depends(get_order_service)
):
    """
    Place a new 1-click trade via connected broker.
    """
    return await order_service.place_order(current_user.id, data)

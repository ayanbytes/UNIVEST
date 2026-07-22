from fastapi import APIRouter, Depends, status
from app.schemas.broker import BrokerAccountCreate, BrokerAccountResponse
from app.models.user import User
from app.core.dependencies import get_current_user
from app.services.broker_service import BrokerService
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

router = APIRouter()

def get_broker_service(db: AsyncSession = Depends(get_db)) -> BrokerService:
    return BrokerService(db)

@router.post("/connect", response_model=BrokerAccountResponse, status_code=status.HTTP_201_CREATED)
async def connect_broker(
    data: BrokerAccountCreate,
    current_user: User = Depends(get_current_user),
    broker_service: BrokerService = Depends(get_broker_service)
):
    """
    Connect a new broker (e.g. Zerodha, Upstox) to the user's account.
    """
    return await broker_service.connect_broker(current_user.id, data)

@router.get("/", response_model=List[BrokerAccountResponse])
async def list_brokers(
    current_user: User = Depends(get_current_user),
    broker_service: BrokerService = Depends(get_broker_service)
):
    """
    List all connected brokers for the current user.
    """
    return await broker_service.get_user_brokers(current_user.id)

from fastapi import APIRouter, Depends, status
from app.schemas.watchlist import WatchlistCreate, WatchlistResponse, WatchlistItemCreate, WatchlistItemResponse
from app.models.user import User
from app.core.dependencies import get_current_user
from app.services.watchlist_service import WatchlistService
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import uuid

router = APIRouter()

def get_watchlist_service(db: AsyncSession = Depends(get_db)) -> WatchlistService:
    return WatchlistService(db)

@router.post("/", response_model=WatchlistResponse, status_code=status.HTTP_201_CREATED)
async def create_watchlist(
    data: WatchlistCreate,
    current_user: User = Depends(get_current_user),
    watchlist_service: WatchlistService = Depends(get_watchlist_service)
):
    return await watchlist_service.create_watchlist(current_user.id, data)

@router.get("/", response_model=List[WatchlistResponse])
async def list_watchlists(
    current_user: User = Depends(get_current_user),
    watchlist_service: WatchlistService = Depends(get_watchlist_service)
):
    return await watchlist_service.get_user_watchlists(current_user.id)

@router.post("/{watchlist_id}/items", response_model=WatchlistItemResponse, status_code=status.HTTP_201_CREATED)
async def add_watchlist_item(
    watchlist_id: uuid.UUID,
    data: WatchlistItemCreate,
    current_user: User = Depends(get_current_user),
    watchlist_service: WatchlistService = Depends(get_watchlist_service)
):
    return await watchlist_service.add_item_to_watchlist(current_user.id, watchlist_id, data)

import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.models.watchlist import Watchlist, WatchlistItem
from app.schemas.watchlist import WatchlistCreate, WatchlistItemCreate
from app.exceptions.handlers import AppError

class WatchlistService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_watchlist(self, user_id: uuid.UUID, data: WatchlistCreate) -> Watchlist:
        wl = Watchlist(user_id=user_id, name=data.name, is_default=data.is_default)
        self.session.add(wl)
        await self.session.commit()
        await self.session.refresh(wl)
        return wl

    async def get_user_watchlists(self, user_id: uuid.UUID):
        # Join with items so the schema can render the full list
        query = select(Watchlist).where(Watchlist.user_id == user_id)
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def add_item_to_watchlist(self, user_id: uuid.UUID, watchlist_id: uuid.UUID, data: WatchlistItemCreate) -> WatchlistItem:
        # Verify ownership
        query = select(Watchlist).where(Watchlist.id == watchlist_id, Watchlist.user_id == user_id)
        result = await self.session.execute(query)
        if not result.scalar_one_or_none():
            raise AppError("Watchlist not found", status_code=404)
            
        item = WatchlistItem(watchlist_id=watchlist_id, symbol=data.symbol.upper())
        self.session.add(item)
        await self.session.commit()
        await self.session.refresh(item)
        return item

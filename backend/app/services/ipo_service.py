from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.ipo import IPO
from datetime import datetime, timezone

class IPOService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_upcoming_ipos(self):
        query = select(IPO).where(IPO.close_date >= datetime.now(timezone.utc))
        result = await self.session.execute(query)
        return list(result.scalars().all())

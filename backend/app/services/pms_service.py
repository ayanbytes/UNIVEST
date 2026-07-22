from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.pms import ManagedPortfolio

class PMSService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_active_portfolios(self):
        query = select(ManagedPortfolio).where(ManagedPortfolio.is_active == True)
        result = await self.session.execute(query)
        return list(result.scalars().all())

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.mutual_funds import MutualFund

class MutualFundService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_funds(self, limit: int = 50):
        query = select(MutualFund).limit(limit)
        result = await self.session.execute(query)
        return list(result.scalars().all())

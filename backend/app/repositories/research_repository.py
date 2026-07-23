import uuid
from typing import Optional, List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.research import ResearchCall, ResearchCategory, CallStatus
from app.schemas.research import ResearchCallCreate

class ResearchRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_call_by_id(self, call_id: uuid.UUID) -> Optional[ResearchCall]:
        result = await self.session.execute(select(ResearchCall).where(ResearchCall.id == call_id))
        return result.scalar_one_or_none()

    async def get_published_calls(self, limit: int = 100, skip: int = 0) -> List[ResearchCall]:
        query = select(ResearchCall).where(
            ResearchCall.status == CallStatus.PUBLISHED
        ).order_by(ResearchCall.published_at.desc()).offset(skip).limit(limit)
        
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def get_all_calls(self, limit: int = 100, skip: int = 0) -> List[ResearchCall]:
        query = select(ResearchCall).order_by(ResearchCall.created_at.desc()).offset(skip).limit(limit)
        
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def create_call(self, call: ResearchCall) -> ResearchCall:
        self.session.add(call)
        await self.session.commit()
        await self.session.refresh(call)
        return call

    async def update_call(self, call: ResearchCall) -> ResearchCall:
        self.session.add(call)
        await self.session.commit()
        await self.session.refresh(call)
        return call

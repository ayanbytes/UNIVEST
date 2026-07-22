import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.broker import BrokerAccount
from app.schemas.broker import BrokerAccountCreate
from app.exceptions.handlers import AppError

class BrokerService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def connect_broker(self, user_id: uuid.UUID, data: BrokerAccountCreate) -> BrokerAccount:
        # Check if user already has this broker connected
        query = select(BrokerAccount).where(
            BrokerAccount.user_id == user_id, 
            BrokerAccount.broker_type == data.broker_type
        )
        existing = await self.session.execute(query)
        if existing.scalar_one_or_none():
            raise AppError(f"Broker {data.broker_type.value} is already connected", status_code=400)
            
        broker = BrokerAccount(
            user_id=user_id,
            broker_type=data.broker_type,
            broker_user_id=data.broker_user_id,
            access_token=data.access_token,
            refresh_token=data.refresh_token
        )
        self.session.add(broker)
        await self.session.commit()
        await self.session.refresh(broker)
        return broker

    async def get_user_brokers(self, user_id: uuid.UUID):
        query = select(BrokerAccount).where(BrokerAccount.user_id == user_id)
        result = await self.session.execute(query)
        return list(result.scalars().all())

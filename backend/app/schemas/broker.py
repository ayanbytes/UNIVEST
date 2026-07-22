import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict
from app.models.broker import BrokerType

class BrokerAccountBase(BaseModel):
    broker_type: BrokerType
    broker_user_id: str

class BrokerAccountCreate(BrokerAccountBase):
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None

class BrokerAccountResponse(BrokerAccountBase):
    id: uuid.UUID
    user_id: uuid.UUID
    is_active: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

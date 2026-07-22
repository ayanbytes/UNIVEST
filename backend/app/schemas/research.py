import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from app.models.research import CallType, CallStatus

class ResearchCategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class ResearchCategoryResponse(ResearchCategoryBase):
    id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)

class ResearchCallBase(BaseModel):
    title: str
    symbol: str
    category_id: uuid.UUID
    call_type: CallType
    entry_price: float
    target_price: float
    stop_loss: float
    time_horizon: str
    technical_notes: Optional[str] = None
    fundamental_notes: Optional[str] = None

class ResearchCallCreate(ResearchCallBase):
    pass

class ResearchCallUpdate(BaseModel):
    status: CallStatus
    change_notes: str

class ResearchCallResponse(ResearchCallBase):
    id: uuid.UUID
    analyst_id: uuid.UUID
    status: CallStatus
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class ResearchApprovalBase(BaseModel):
    call_id: uuid.UUID
    status: str
    comments: Optional[str] = None

class ResearchApprovalCreate(ResearchApprovalBase):
    pass

class ResearchApprovalResponse(ResearchApprovalBase):
    id: uuid.UUID
    admin_id: uuid.UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

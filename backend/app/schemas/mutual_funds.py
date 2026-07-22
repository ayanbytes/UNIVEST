import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict

class MutualFundResponse(BaseModel):
    id: uuid.UUID
    fund_name: str
    amc: str
    category: Optional[str]
    nav: float
    one_year_return: Optional[float]
    three_year_return: Optional[float]
    five_year_return: Optional[float]
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class SIPCreate(BaseModel):
    mutual_fund_id: uuid.UUID
    amount: float
    frequency: str = "MONTHLY"

class SIPResponse(SIPCreate):
    id: uuid.UUID
    user_id: uuid.UUID
    next_deduction_date: datetime
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

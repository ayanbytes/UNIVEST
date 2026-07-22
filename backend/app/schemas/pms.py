import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict

class ManagedPortfolioBase(BaseModel):
    name: str
    description: Optional[str] = None
    risk_profile: str
    minimum_investment: float

class ManagedPortfolioResponse(ManagedPortfolioBase):
    id: uuid.UUID
    is_active: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class PMSInvestmentResponse(BaseModel):
    id: uuid.UUID
    managed_portfolio_id: uuid.UUID
    invested_amount: float
    current_value: float
    start_date: datetime
    model_config = ConfigDict(from_attributes=True)

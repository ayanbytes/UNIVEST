import uuid
from datetime import datetime
from typing import List
from pydantic import BaseModel, ConfigDict

class HoldingBase(BaseModel):
    symbol: str
    quantity: int
    average_buy_price: float

class HoldingResponse(HoldingBase):
    id: uuid.UUID
    last_synced_at: datetime
    model_config = ConfigDict(from_attributes=True)

class PortfolioResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    total_invested: float
    current_value: float
    unrealized_pnl: float = 0.0 # Computed field
    unrealized_pnl_percentage: float = 0.0 # Computed field
    holdings: List[HoldingResponse] = []
    
    model_config = ConfigDict(from_attributes=True)

import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict

class IPOResponse(BaseModel):
    id: uuid.UUID
    company_name: str
    description: Optional[str] = None
    open_date: datetime
    close_date: datetime
    listing_date: Optional[datetime] = None
    issue_price_min: float
    issue_price_max: float
    lot_size: int
    current_gmp: Optional[float] = None
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

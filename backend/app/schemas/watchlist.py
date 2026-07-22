import uuid
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict

class WatchlistItemBase(BaseModel):
    symbol: str

class WatchlistItemCreate(WatchlistItemBase):
    pass

class WatchlistItemResponse(WatchlistItemBase):
    id: uuid.UUID
    added_at: datetime
    model_config = ConfigDict(from_attributes=True)

class WatchlistBase(BaseModel):
    name: str
    is_default: bool = False

class WatchlistCreate(WatchlistBase):
    pass

class WatchlistResponse(WatchlistBase):
    id: uuid.UUID
    user_id: uuid.UUID
    items: List[WatchlistItemResponse] = []
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

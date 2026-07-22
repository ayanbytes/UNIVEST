import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict
from app.models.order import OrderType, OrderSide, OrderStatus

class OrderBase(BaseModel):
    symbol: str
    side: OrderSide
    order_type: OrderType
    quantity: int
    price: Optional[float] = None
    trigger_price: Optional[float] = None

class OrderCreate(OrderBase):
    broker_account_id: Optional[uuid.UUID] = None

class OrderResponse(OrderBase):
    id: uuid.UUID
    user_id: uuid.UUID
    status: OrderStatus
    broker_order_id: Optional[str] = None
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

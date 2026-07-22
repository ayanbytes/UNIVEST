import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict
from app.models.subscription import PlanType, SubscriptionStatus, PaymentStatus

class PlanBase(BaseModel):
    name: str
    description: Optional[str] = None
    plan_type: PlanType
    price: float
    duration_days: int
    is_active: bool = True

class PlanCreate(PlanBase):
    pass

class PlanResponse(PlanBase):
    id: uuid.UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class SubscriptionBase(BaseModel):
    plan_id: uuid.UUID

class SubscriptionCreate(SubscriptionBase):
    pass

class SubscriptionResponse(SubscriptionBase):
    id: uuid.UUID
    user_id: uuid.UUID
    start_date: datetime
    end_date: datetime
    status: SubscriptionStatus
    plan: Optional[PlanResponse] = None
    model_config = ConfigDict(from_attributes=True)


class PaymentBase(BaseModel):
    subscription_id: Optional[uuid.UUID] = None
    amount: float
    currency: str = "INR"
    provider: str = "RAZORPAY"
    transaction_id: Optional[str] = None

class PaymentCreate(PaymentBase):
    pass

class PaymentResponse(PaymentBase):
    id: uuid.UUID
    user_id: uuid.UUID
    status: PaymentStatus
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

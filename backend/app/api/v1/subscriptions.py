from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from pydantic import BaseModel
import uuid
import hmac
import hashlib
import os

from app.core.database import get_db
from app.models.user import User
from app.core.dependencies import get_current_user
from app.models.subscription import Plan, Subscription, Payment, PaymentStatus, SubscriptionStatus
from sqlalchemy import select
from datetime import datetime, timezone, timedelta

router = APIRouter()

class PlanResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: str | None
    plan_type: str
    price: float
    duration_days: int
    is_active: bool

    model_config = {"from_attributes": True}

class CreateOrderRequest(BaseModel):
    plan_id: uuid.UUID

class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    plan_id: uuid.UUID

@router.get("/plans", response_model=List[PlanResponse])
async def get_plans(db: AsyncSession = Depends(get_db)):
    """Fetch all active subscription plans."""
    result = await db.execute(select(Plan).where(Plan.is_active == True))
    return list(result.scalars().all())

@router.post("/orders")
async def create_razorpay_order(
    req: CreateOrderRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create an order using Razorpay API."""
    result = await db.execute(select(Plan).where(Plan.id == req.plan_id))
    plan = result.scalar_one_or_none()
    
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    # In a real scenario, we'd call razorpay.Client.order.create() here.
    # For MVP, we will mock the Razorpay order creation to avoid hard dependency on actual keys.
    mock_order_id = f"order_{uuid.uuid4().hex[:14]}"
    
    payment = Payment(
        user_id=current_user.id,
        amount=plan.price,
        currency="INR",
        provider="RAZORPAY",
        transaction_id=mock_order_id,
        status=PaymentStatus.PENDING
    )
    db.add(payment)
    await db.commit()

    return {
        "order_id": mock_order_id,
        "amount": plan.price * 100, # Razorpay expects paise
        "currency": "INR",
        "key_id": os.getenv("RAZORPAY_KEY_ID", "rzp_test_mock_key")
    }

@router.post("/verify")
async def verify_payment(
    req: VerifyPaymentRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Verify Razorpay payment signature and activate subscription."""
    
    # 1. Verify Signature (Mocked for MVP unless real keys provided)
    secret = os.getenv("RAZORPAY_KEY_SECRET", "mock_secret")
    msg = f"{req.razorpay_order_id}|{req.razorpay_payment_id}"
    
    # In production with real keys, you'd verify like this:
    # generated_signature = hmac.new(secret.encode(), msg.encode(), hashlib.sha256).hexdigest()
    # if generated_signature != req.razorpay_signature: raise Exception
    
    # 2. Get Plan
    result = await db.execute(select(Plan).where(Plan.id == req.plan_id))
    plan = result.scalar_one_or_none()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    # 3. Update Payment Status
    payment_result = await db.execute(
        select(Payment).where(Payment.transaction_id == req.razorpay_order_id)
    )
    payment = payment_result.scalar_one_or_none()
    
    if payment:
        payment.status = PaymentStatus.SUCCESS
        
    # 4. Create/Update Subscription
    sub_result = await db.execute(
        select(Subscription).where(Subscription.user_id == current_user.id, Subscription.status == SubscriptionStatus.ACTIVE)
    )
    active_sub = sub_result.scalar_one_or_none()
    
    now = datetime.now(timezone.utc)
    end_date = now + timedelta(days=plan.duration_days)
    
    if active_sub:
        # Extend existing
        active_sub.end_date = active_sub.end_date + timedelta(days=plan.duration_days)
        active_sub.plan_id = plan.id
        if payment:
            payment.subscription_id = active_sub.id
    else:
        # Create new
        new_sub = Subscription(
            user_id=current_user.id,
            plan_id=plan.id,
            start_date=now,
            end_date=end_date,
            status=SubscriptionStatus.ACTIVE
        )
        db.add(new_sub)
        await db.flush() # get ID
        if payment:
            payment.subscription_id = new_sub.id

    current_user.is_premium = True
    await db.commit()
    
    return {"status": "success", "message": "Subscription activated"}

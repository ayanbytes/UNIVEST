import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict
from app.models.user import UserRole, KYCStatus

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone_number: Optional[str] = None
    role: UserRole = UserRole.USER
    profile_image: Optional[str] = None
    kyc_status: KYCStatus = KYCStatus.PENDING
    is_verified: bool = False
    is_active: bool = True

class UserResponse(UserBase):
    id: uuid.UUID
    last_login: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

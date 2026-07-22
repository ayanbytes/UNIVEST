import enum
import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Boolean, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class BrokerType(str, enum.Enum):
    ZERODHA = "ZERODHA"
    UPSTOX = "UPSTOX"
    ANGELONE = "ANGELONE"

class BrokerAccount(Base):
    __tablename__ = "broker_accounts"
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    broker_type: Mapped[BrokerType] = mapped_column(SQLEnum(BrokerType), nullable=False)
    broker_user_id: Mapped[str] = mapped_column(String(100), nullable=False) # e.g. Client ID from Zerodha
    
    access_token: Mapped[str | None] = mapped_column(String(1024))
    refresh_token: Mapped[str | None] = mapped_column(String(1024))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    
    token_expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

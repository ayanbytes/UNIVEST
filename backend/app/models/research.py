import enum
import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Numeric, Boolean, DateTime, ForeignKey, Text, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

class CallType(str, enum.Enum):
    BUY = "BUY"
    SELL = "SELL"
    HOLD = "HOLD"

class CallStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    PENDING_APPROVAL = "PENDING_APPROVAL"
    PUBLISHED = "PUBLISHED"
    CLOSED = "CLOSED"
    REJECTED = "REJECTED"

class ResearchCategory(Base):
    __tablename__ = "research_categories"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False) # Equity, F&O, Commodity, Mutual Funds
    description: Mapped[str | None] = mapped_column(String(500))

class ResearchCall(Base):
    __tablename__ = "research_calls"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    symbol: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    
    category_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("research_categories.id"))
    analyst_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    call_type: Mapped[CallType] = mapped_column(SQLEnum(CallType), nullable=False)
    entry_price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    target_price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    stop_loss: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    time_horizon: Mapped[str] = mapped_column(String(100)) # e.g., "1-3 Months", "Intraday"
    
    technical_notes: Mapped[str | None] = mapped_column(Text)
    fundamental_notes: Mapped[str | None] = mapped_column(Text)
    
    status: Mapped[CallStatus] = mapped_column(SQLEnum(CallStatus), default=CallStatus.DRAFT)
    
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class ResearchVersion(Base):
    __tablename__ = "research_versions"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    call_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("research_calls.id", ondelete="CASCADE"))
    version_number: Mapped[int] = mapped_column(nullable=False)
    change_notes: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class ResearchAttachment(Base):
    __tablename__ = "research_attachments"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    call_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("research_calls.id", ondelete="CASCADE"))
    file_url: Mapped[str] = mapped_column(String(1024), nullable=False)
    file_type: Mapped[str] = mapped_column(String(50)) # e.g. "image/png", "application/pdf"

class ResearchApproval(Base):
    __tablename__ = "research_approvals"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    call_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("research_calls.id", ondelete="CASCADE"))
    admin_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
    status: Mapped[str] = mapped_column(String(50)) # APPROVED, REJECTED
    comments: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class CallPerformance(Base):
    __tablename__ = "call_performance"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    call_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("research_calls.id", ondelete="CASCADE"), unique=True)
    exit_price: Mapped[float | None] = mapped_column(Numeric(10, 2))
    pnl_percentage: Mapped[float | None] = mapped_column(Numeric(5, 2))
    is_target_hit: Mapped[bool] = mapped_column(Boolean, default=False)
    is_sl_hit: Mapped[bool] = mapped_column(Boolean, default=False)
    closed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

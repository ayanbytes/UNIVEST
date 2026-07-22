import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Numeric, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class MutualFund(Base):
    __tablename__ = "mutual_funds"
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    fund_name: Mapped[str] = mapped_column(String(255), nullable=False)
    amc: Mapped[str] = mapped_column(String(255), nullable=False) # Asset Management Company
    category: Mapped[str] = mapped_column(String(100)) # e.g. Equity, Debt, Hybrid
    nav: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    
    one_year_return: Mapped[float | None] = mapped_column(Numeric(5, 2))
    three_year_return: Mapped[float | None] = mapped_column(Numeric(5, 2))
    five_year_return: Mapped[float | None] = mapped_column(Numeric(5, 2))
    
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class SIP(Base):
    __tablename__ = "sips"
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    mutual_fund_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("mutual_funds.id"), nullable=False)
    
    amount: Mapped[float] = mapped_column(Numeric(15, 2), nullable=False)
    frequency: Mapped[str] = mapped_column(String(50), default="MONTHLY")
    next_deduction_date: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

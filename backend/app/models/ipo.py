import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Numeric, DateTime, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class IPO(Base):
    __tablename__ = "ipos"
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company_name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    
    open_date: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    close_date: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    listing_date: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    
    issue_price_min: Mapped[float] = mapped_column(Numeric(10, 2))
    issue_price_max: Mapped[float] = mapped_column(Numeric(10, 2))
    lot_size: Mapped[int] = mapped_column(nullable=False)
    
    current_gmp: Mapped[float | None] = mapped_column(Numeric(10, 2)) # Grey Market Premium
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

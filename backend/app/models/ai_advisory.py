import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Text, Numeric, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base import Base

class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    symbol: Mapped[str] = mapped_column(String(50), nullable=False)
    recommendation: Mapped[str] = mapped_column(String(50), nullable=False) # e.g. STRONG_BUY, SELL
    confidence_score: Mapped[float] = mapped_column(Numeric(5, 2))
    
    analysis_text: Mapped[str] = mapped_column(Text, nullable=False)
    raw_prompt_data: Mapped[dict | None] = mapped_column(JSONB)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

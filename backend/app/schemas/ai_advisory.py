import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict

class AIAnalysisRequest(BaseModel):
    symbol: str
    timeframe: str = "1D"

class AIRecommendationResponse(BaseModel):
    id: uuid.UUID
    symbol: str
    recommendation: str
    confidence_score: float
    analysis_text: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

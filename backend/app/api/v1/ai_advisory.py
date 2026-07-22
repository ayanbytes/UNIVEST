from fastapi import APIRouter, Depends, status
from app.schemas.ai_advisory import AIAnalysisRequest, AIRecommendationResponse
from app.models.user import User
from app.core.dependencies import get_current_user
from app.services.ai_service import AIService
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

def get_ai_service(db: AsyncSession = Depends(get_db)) -> AIService:
    return AIService(db)

@router.post("/analyze", response_model=AIRecommendationResponse, status_code=status.HTTP_201_CREATED)
async def analyze_stock(
    data: AIAnalysisRequest,
    current_user: User = Depends(get_current_user),
    ai_service: AIService = Depends(get_ai_service)
):
    """
    Run an AI-based technical and sentiment analysis on a specific stock symbol.
    """
    return await ai_service.analyze_stock(current_user.id, data)

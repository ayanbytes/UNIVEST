from fastapi import APIRouter, Depends
from app.schemas.portfolio import PortfolioResponse
from app.models.user import User
from app.core.dependencies import get_current_user
from app.services.portfolio_service import PortfolioService
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

def get_portfolio_service(db: AsyncSession = Depends(get_db)) -> PortfolioService:
    return PortfolioService(db)

@router.get("/", response_model=PortfolioResponse)
async def get_portfolio(
    current_user: User = Depends(get_current_user),
    portfolio_service: PortfolioService = Depends(get_portfolio_service)
):
    """
    Get the user's current portfolio summary including Realized & Unrealized P&L.
    """
    return await portfolio_service.get_portfolio_summary(current_user.id)

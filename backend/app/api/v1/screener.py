from fastapi import APIRouter, Depends
from typing import List
from app.schemas.screener import ScreenerRequest, ScreenerResult
from app.services.screener_service import ScreenerService
from app.core.dependencies import get_current_user

router = APIRouter()

@router.post("/", response_model=List[ScreenerResult])
async def run_stock_screener(
    request: ScreenerRequest,
    current_user = Depends(get_current_user) # Require auth for complex queries
):
    """
    Run quantitative screens across the stock universe based on technical and fundamental filters.
    """
    return await ScreenerService.run_screener(request)

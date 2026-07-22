from fastapi import APIRouter, Depends
from typing import List
from app.schemas.mutual_funds import MutualFundResponse
from app.services.mutual_fund_service import MutualFundService
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

def get_mf_service(db: AsyncSession = Depends(get_db)) -> MutualFundService:
    return MutualFundService(db)

@router.get("/", response_model=List[MutualFundResponse])
async def list_mutual_funds(
    limit: int = 50,
    mf_service: MutualFundService = Depends(get_mf_service)
):
    """
    Discover Mutual Funds.
    """
    return await mf_service.get_funds(limit=limit)

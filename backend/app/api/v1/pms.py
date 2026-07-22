from fastapi import APIRouter, Depends
from typing import List
from app.schemas.pms import ManagedPortfolioResponse
from app.services.pms_service import PMSService
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

def get_pms_service(db: AsyncSession = Depends(get_db)) -> PMSService:
    return PMSService(db)

@router.get("/", response_model=List[ManagedPortfolioResponse])
async def list_managed_portfolios(
    pms_service: PMSService = Depends(get_pms_service)
):
    """
    Get a list of all active Portfolio Management Service (PMS) offerings for HNWIs.
    """
    return await pms_service.get_active_portfolios()

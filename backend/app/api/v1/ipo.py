from fastapi import APIRouter, Depends
from typing import List
from app.schemas.ipo import IPOResponse
from app.services.ipo_service import IPOService
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

def get_ipo_service(db: AsyncSession = Depends(get_db)) -> IPOService:
    return IPOService(db)

@router.get("/upcoming", response_model=List[IPOResponse])
async def get_upcoming_ipos(
    ipo_service: IPOService = Depends(get_ipo_service)
):
    """
    List upcoming Initial Public Offerings.
    """
    return await ipo_service.get_upcoming_ipos()

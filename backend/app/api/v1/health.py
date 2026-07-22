from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter()

@router.get("")
async def health_check(db: AsyncSession = Depends(get_db)):
    """
    Check the health of the API and the database connection.
    """
    db_status = "unhealthy"
    try:
        # Simple query to check if DB is responsive
        await db.execute(text("SELECT 1"))
        db_status = "healthy"
    except Exception:
        pass
        
    return {
        "status": "healthy" if db_status == "healthy" else "degraded",
        "database": db_status
    }

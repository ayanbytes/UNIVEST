from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from app.models.user import User
from app.core.dependencies import get_current_user
import random

router = APIRouter()

@router.get("/leaderboard")
async def get_analyst_leaderboard(
    current_user: User = Depends(get_current_user)
) -> List[Dict[str, Any]]:
    """
    Get the leaderboard of top-performing analysts on the platform.
    """
    # Stub: Returns mock data for MVP
    return [
        {
            "rank": 1,
            "name": "Arjun Mehta",
            "accuracy": 84.5,
            "avg_roi": 12.4,
            "calls_made": 156,
            "specialty": "F&O"
        },
        {
            "rank": 2,
            "name": "Priya Sharma",
            "accuracy": 79.2,
            "avg_roi": 18.1,
            "calls_made": 89,
            "specialty": "Equity"
        },
        {
            "rank": 3,
            "name": "Rohan Desai",
            "accuracy": 76.8,
            "avg_roi": 9.5,
            "calls_made": 210,
            "specialty": "Commodity"
        }
    ]

@router.get("/platform-stats")
async def get_platform_stats(
    current_user: User = Depends(get_current_user)
) -> Dict[str, Any]:
    """
    Get overall platform analytics like average win rate and total wealth generated.
    """
    return {
        "overall_win_rate": 78.5,
        "total_calls_published": 1450,
        "avg_roi_per_trade": 14.2,
        "wealth_generated_inr": "₹45.2 Cr"
    }

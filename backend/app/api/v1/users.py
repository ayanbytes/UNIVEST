from fastapi import APIRouter, Depends
from app.schemas.user import UserResponse
from app.models.user import User
from app.core.dependencies import get_current_admin

router = APIRouter()

@router.get("/", response_model=list[UserResponse])
async def list_users(
    skip: int = 0, 
    limit: int = 100,
    current_admin: User = Depends(get_current_admin)
):
    """
    List all users. Admin access only.
    (Implementation is a stub, needs repository list method)
    """
    return []

import uuid
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.core.database import get_db
from app.models.user import User, UserRole
from app.repositories.user_repository import UserRepository
from app.services.user_service import UserService
from app.services.auth_service import AuthService
from app.services.otp_service import OtpService
from app.exceptions.handlers import Unauthorized, Forbidden

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def get_otp_service() -> OtpService:
    return OtpService()


def get_user_repository(db: AsyncSession = Depends(get_db)) -> UserRepository:
    return UserRepository(db)

def get_auth_service(user_repo: UserRepository = Depends(get_user_repository)) -> AuthService:
    return AuthService(user_repo)

def get_user_service(user_repo: UserRepository = Depends(get_user_repository)) -> UserService:
    return UserService(user_repo)

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    user_service: UserService = Depends(get_user_service)
) -> User:
    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM]
        )
        user_id_str: str = payload.get("sub")
        token_type: str = payload.get("type")
        
        if user_id_str is None or token_type != "access":
            raise Unauthorized("Could not validate credentials")
            
        try:
            user_id = uuid.UUID(user_id_str)
        except ValueError:
            raise Unauthorized("Invalid user ID in token")
            
    except JWTError:
        raise Unauthorized("Could not validate credentials")

    user = await user_service.get_user_by_id(user_id)
    if not user.is_active:
        raise Unauthorized("Inactive user")
    return user

async def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != UserRole.ADMIN:
        raise Forbidden("Not enough privileges")
    return current_user

async def get_current_analyst_or_admin(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role not in [UserRole.ANALYST, UserRole.ADMIN]:
        raise Forbidden("Not enough privileges")
    return current_user

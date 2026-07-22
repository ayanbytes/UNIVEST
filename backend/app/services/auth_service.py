from datetime import datetime, timezone
import uuid
from app.schemas.auth import UserRegister, UserLogin, Token, TokenRefresh
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.core.security import get_password_hash, verify_password, create_access_token, create_refresh_token
from app.exceptions.handlers import InvalidCredentials, UserAlreadyExists, Unauthorized

class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def register(self, user_data: UserRegister) -> User:
        # Check if email exists
        if await self.user_repo.get_by_email(user_data.email):
            raise UserAlreadyExists("User with this email already exists")
            
        # Check if phone exists (if provided)
        if user_data.phone_number and await self.user_repo.get_by_phone(user_data.phone_number):
            raise UserAlreadyExists("User with this phone number already exists")

        # Create new user
        user = User(
            full_name=user_data.full_name,
            email=user_data.email,
            phone_number=user_data.phone_number,
            hashed_password=get_password_hash(user_data.password),
        )
        return await self.user_repo.create(user)

    async def login(self, login_data: UserLogin) -> Token:
        user = await self.user_repo.get_by_email(login_data.email)
        
        if not user or not verify_password(login_data.password, user.hashed_password):
            raise InvalidCredentials()

        if not user.is_active:
            raise Unauthorized("User account is disabled")

        # Update last login
        user.last_login = datetime.now(timezone.utc)
        await self.user_repo.update(user)

        # Generate tokens
        access_token = create_access_token(subject=user.id)
        refresh_token = create_refresh_token(subject=user.id)

        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer"
        )

    async def refresh_token(self, token_data: TokenRefresh) -> Token:
        from jose import jwt, JWTError
        from app.core.config import settings
        
        try:
            payload = jwt.decode(
                token_data.refresh_token, 
                settings.JWT_REFRESH_SECRET, 
                algorithms=[settings.JWT_ALGORITHM]
            )
            
            user_id_str = payload.get("sub")
            token_type = payload.get("type")
            
            if user_id_str is None or token_type != "refresh":
                raise Unauthorized("Invalid refresh token")
                
            try:
                user_id = uuid.UUID(user_id_str)
            except ValueError:
                raise Unauthorized("Invalid user ID format in token")

        except JWTError:
            raise Unauthorized("Could not validate refresh token")

        # Verify user still exists and is active
        user = await self.user_repo.get_by_id(user_id)
        if not user or not user.is_active:
            raise Unauthorized("User not found or inactive")

        # Generate new tokens
        access_token = create_access_token(subject=user.id)
        new_refresh_token = create_refresh_token(subject=user.id)

        return Token(
            access_token=access_token,
            refresh_token=new_refresh_token,
            token_type="bearer"
        )

import uuid
from typing import Optional
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.exceptions.handlers import UserNotFound

class UserService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def get_user_by_id(self, user_id: uuid.UUID) -> User:
        user = await self.user_repo.get_by_id(user_id)
        if not user:
            raise UserNotFound("User not found")
        return user

    async def get_user_by_email(self, email: str) -> Optional[User]:
        return await self.user_repo.get_by_email(email)

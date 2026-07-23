from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    APP_NAME: str = "Stock Advisory Platform"
    DEBUG: bool = False
    
    # Database URL
    DATABASE_URL: str
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # JWT Settings
    JWT_SECRET_KEY: str
    JWT_REFRESH_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # SMTP
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    FROM_EMAIL: str = ""

    # Broker Integration APIs
    GROW_API_KEY: Optional[str] = None
    GROW_API_SECRET: Optional[str] = None
    ANGELONE_API_KEY: Optional[str] = None
    ANGELONE_API_SECRET: Optional[str] = None
    UPSTOX_API_KEY: Optional[str] = None
    UPSTOX_API_SECRET: Optional[str] = None
    ZERODHA_API_KEY: Optional[str] = None
    ZERODHA_API_SECRET: Optional[str] = None

    model_config = SettingsConfigDict(
        env_file=".env", 
        env_file_encoding="utf-8", 
        case_sensitive=True,
        extra="ignore"
    )
    
    @property
    def sync_database_url(self) -> str:
        """Returns the sync version of the database URL for potential blocking ops"""
        return self.DATABASE_URL.replace("postgresql+asyncpg://", "postgresql://")

settings = Settings()

# Fix the DATABASE_URL to ensure it has the asyncpg driver if someone used standard postgresql://
if settings.DATABASE_URL.startswith("postgresql://"):
    settings.DATABASE_URL = settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

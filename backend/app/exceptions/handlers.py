from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from app.core.logger import logger

class AppError(Exception):
    """Base class for custom application exceptions."""
    def __init__(self, message: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class InvalidCredentials(AppError):
    def __init__(self, message: str = "Invalid credentials"):
        super().__init__(message, status.HTTP_401_UNAUTHORIZED)

class UserAlreadyExists(AppError):
    def __init__(self, message: str = "User already exists"):
        super().__init__(message, status.HTTP_409_CONFLICT)

class UserNotFound(AppError):
    def __init__(self, message: str = "User not found"):
        super().__init__(message, status.HTTP_404_NOT_FOUND)

class Unauthorized(AppError):
    def __init__(self, message: str = "Unauthorized"):
        super().__init__(message, status.HTTP_401_UNAUTHORIZED)

class Forbidden(AppError):
    def __init__(self, message: str = "Forbidden"):
        super().__init__(message, status.HTTP_403_FORBIDDEN)


def add_exception_handlers(app: FastAPI):
    """Register custom exception handlers with the FastAPI application."""

    @app.exception_handler(AppError)
    async def app_error_handler(request: Request, exc: AppError):
        # Log the application error
        logger.warning(f"AppError: {exc.message} on {request.method} {request.url}")
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.message},
        )

    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        # Log unhandled exceptions
        logger.error(
            f"Unhandled Exception: {str(exc)} on {request.method} {request.url}",
            exc_info=True
        )
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "An unexpected error occurred. Please try again later."},
        )

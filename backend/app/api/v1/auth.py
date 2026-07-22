from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.auth import UserRegister, UserLogin, Token, TokenRefresh, SendOtpRequest, VerifyOtpLogin, VerifyOtpRegister
from app.schemas.user import UserResponse
from app.services.auth_service import AuthService
from app.services.otp_service import OtpService
from app.core.dependencies import get_auth_service, get_current_user, get_otp_service
from app.models.user import User
from app.core.logger import logger
import secrets
import string

router = APIRouter()

@router.get("/check-email", status_code=status.HTTP_200_OK)
async def check_email(
    email: str,
    auth_service: AuthService = Depends(get_auth_service)
):
    """Check if a user with the given email already exists."""
    user = await auth_service.user_repo.get_by_email(email)
    return {"exists": user is not None}

@router.post("/send-otp", status_code=status.HTTP_200_OK)
async def send_otp(
    request: SendOtpRequest,
    otp_service: OtpService = Depends(get_otp_service)
):
    """Generate and send an OTP to the provided email address."""
    success = await otp_service.generate_and_send_otp(request.email)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to send OTP email")
    return {"message": "OTP sent successfully"}

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    request: VerifyOtpRegister,
    auth_service: AuthService = Depends(get_auth_service),
    otp_service: OtpService = Depends(get_otp_service)
):
    """Register a new user using OTP."""
    logger.info(f"Attempting to register user with email: {request.email}")
    
    if not otp_service.verify_otp(request.email, request.otp, delete=False):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
        
    # Generate a strong random password to satisfy database constraints
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    random_password = ''.join(secrets.choice(alphabet) for i in range(16))
    
    user_data = UserRegister(
        full_name=request.full_name,
        email=request.email,
        password=random_password,
        phone_number=request.phone_number
    )
    
    return await auth_service.register(user_data)

@router.post("/login", response_model=Token)
async def login(
    request: VerifyOtpLogin,
    auth_service: AuthService = Depends(get_auth_service),
    otp_service: OtpService = Depends(get_otp_service)
):
    """Authenticate a user using OTP and return JWT tokens."""
    logger.info(f"Login attempt for email: {request.email}")
    
    if not otp_service.verify_otp(request.email, request.otp):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
        
    # Bypass password verification inside auth_service by adding a direct DB login
    user = await auth_service.user_repo.get_by_email(request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if not user.is_active:
        raise HTTPException(status_code=403, detail="User account is disabled")

    from datetime import datetime, timezone
    user.last_login = datetime.now(timezone.utc)
    await auth_service.user_repo.update(user)

    from app.core.security import create_access_token, create_refresh_token
    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )

@router.post("/login/swagger", response_model=Token, include_in_schema=False)
async def login_swagger(
    form_data: OAuth2PasswordRequestForm = Depends(),
    auth_service: AuthService = Depends(get_auth_service)
):
    """Endpoint specifically for Swagger UI auth which sends form data instead of JSON."""
    return await auth_service.login(UserLogin(email=form_data.username, password=form_data.password))

@router.post("/refresh", response_model=Token)
async def refresh_token(
    token_data: TokenRefresh,
    auth_service: AuthService = Depends(get_auth_service)
):
    """Refresh access and refresh tokens using a valid refresh token."""
    return await auth_service.refresh_token(token_data)

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get the currently authenticated user's profile."""
    return current_user

@router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(current_user: User = Depends(get_current_user)):
    """
    Logout endpoint. 
    In a stateless JWT setup, this is mostly handled client-side by deleting the tokens.
    For more security, you would implement a token blocklist in Redis here.
    """
    logger.info(f"User logged out: {current_user.email}")
    return {"message": "Successfully logged out"}

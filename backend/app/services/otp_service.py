import random
import time
from email.message import EmailMessage
import aiosmtplib
from app.core.config import settings
from app.core.logger import logger

# In-memory dictionary to store OTPs since Redis is unavailable
# Format: { "email@example.com": { "otp": "123456", "expires_at": timestamp } }
_otp_store = {}

class OtpService:
    def __init__(self):
        self.smtp_host = settings.SMTP_HOST
        self.smtp_port = settings.SMTP_PORT
        self.smtp_user = settings.SMTP_USER
        self.smtp_password = settings.SMTP_PASSWORD
        self.from_email = settings.FROM_EMAIL

    def _cleanup_expired_otps(self):
        """Removes expired OTPs from the in-memory store."""
        now = time.time()
        expired_keys = [k for k, v in _otp_store.items() if v["expires_at"] < now]
        for k in expired_keys:
            del _otp_store[k]

    async def generate_and_send_otp(self, email: str) -> bool:
        """Generates a 6-digit OTP and sends it via SMTP."""
        self._cleanup_expired_otps()
        email = email.lower().strip()
        
        # Generate 6-digit OTP
        otp = f"{random.randint(0, 999999):06d}"
        
        # Store in memory for 5 minutes (300 seconds)
        _otp_store[email] = {
            "otp": otp,
            "expires_at": time.time() + 300
        }
        
        logger.info(f"Generated OTP for {email}")
        
        if not self.smtp_user or not self.smtp_password:
            logger.warning("SMTP credentials not configured. OTP printed to console instead.")
            logger.info(f"OTP for {email} is {otp}")
            return True

        # Send email
        message = EmailMessage()
        message["From"] = self.from_email
        message["To"] = email
        message["Subject"] = "Your Univest Verification Code"
        
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
                <div style="max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 12px;">
                    <h2 style="color: #0F172A; text-align: center;">Welcome to Univest</h2>
                    <p>Your one-time verification code is:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #2563EB; background: #DBEAFE; padding: 12px 24px; border-radius: 8px;">
                            {otp}
                        </span>
                    </div>
                    <p style="font-size: 12px; color: #64748B; text-align: center;">This code will expire in 5 minutes. Please do not share it with anyone.</p>
                </div>
            </body>
        </html>
        """
        
        message.set_content("Please enable HTML to view this email.")
        message.add_alternative(html_content, subtype="html")
        
        try:
            # Connect to SMTP server
            await aiosmtplib.send(
                message,
                hostname=self.smtp_host,
                port=self.smtp_port,
                start_tls=True,
                username=self.smtp_user,
                password=self.smtp_password,
            )
            logger.info(f"OTP email sent to {email}")
            return True
        except Exception as e:
            logger.error(f"Failed to send OTP email to {email}: {str(e)}")
            return False

    def verify_otp(self, email: str, otp: str, delete: bool = True) -> bool:
        """Verifies the provided OTP against the in-memory store."""
        self._cleanup_expired_otps()
        email = email.lower().strip()
        otp = str(otp).strip()
        
        record = _otp_store.get(email)
        if not record:
            logger.warning(f"OTP verification failed: No record found for {email}")
            return False
            
        if record["otp"] == otp:
            # Delete after successful verification to prevent reuse (unless delete=False)
            if delete:
                del _otp_store[email]
            logger.info(f"OTP verified successfully for {email}")
            return True
            
        logger.warning(f"OTP verification failed for {email}: Invalid OTP")
        return False

from app.core.logger import logger
from app.models.user import User
from app.models.research import ResearchCall
from app.core.config import settings
from email.message import EmailMessage
import aiosmtplib

class NotificationService:
    """
    Handles sending multi-channel notifications (Firebase Push, SMS, Email).
    """
    
    @staticmethod
    async def notify_new_research_call(call: ResearchCall):
        """
        Send a notification to all active subscribers about a new call.
        """
        message_text = f"New {call.call_type.value} Call for {call.symbol}: Target {call.target_price}"
        
        # Stub: Firebase Push
        logger.info(f"[Firebase Push] Sending to subscribers: '{message_text}'")
        
        # Actual: Email
        if settings.SMTP_USER and settings.SMTP_PASSWORD:
            try:
                message = EmailMessage()
                message["From"] = settings.FROM_EMAIL
                # In production, loop over actual subscriber emails. For MVP, we send to a default or log.
                message["To"] = "subscribers@univest.mock" 
                message["Subject"] = f"New Research Call: {call.symbol}"
                
                html_content = f"""
                <html>
                    <body style="font-family: Arial, sans-serif; color: #333;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 12px;">
                            <h2 style="color: #0F172A;">{call.call_type.value} Call: {call.symbol}</h2>
                            <p><strong>Entry Price:</strong> {call.entry_price}</p>
                            <p><strong>Target Price:</strong> <span style="color: #059669;">{call.target_price}</span></p>
                            <p><strong>Stop Loss:</strong> <span style="color: #E11D48;">{call.stop_loss}</span></p>
                            <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 20px 0;" />
                            <p><strong>Technical Notes:</strong><br/>{call.technical_notes or 'N/A'}</p>
                            <p style="font-size: 12px; color: #64748B;">Log in to the app to execute this trade.</p>
                        </div>
                    </body>
                </html>
                """
                message.set_content(message_text)
                message.add_alternative(html_content, subtype="html")
                
                await aiosmtplib.send(
                    message,
                    hostname=settings.SMTP_HOST,
                    port=settings.SMTP_PORT,
                    start_tls=True,
                    username=settings.SMTP_USER,
                    password=settings.SMTP_PASSWORD,
                )
                logger.info(f"[Email] Successfully sent research report for {call.symbol}")
            except Exception as e:
                logger.error(f"[Email] Failed to send notification: {str(e)}")
        else:
            logger.warning("[Email] SMTP not configured. Skipping email notification.")
        
        # Stub: SMS (Twilio)
        logger.info(f"[SMS] Premium alert dispatched via Twilio for {call.symbol}")

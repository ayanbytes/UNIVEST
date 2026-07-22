from app.core.logger import logger
from app.models.user import User
from app.models.research import ResearchCall

class NotificationService:
    """
    Handles sending multi-channel notifications (Firebase Push, SMS, Email).
    For Phase 1, this acts as a stub integrating with background tasks.
    """
    
    @staticmethod
    async def notify_new_research_call(call: ResearchCall):
        """
        Send a notification to all active subscribers about a new call.
        """
        message = f"New {call.call_type.value} Call for {call.symbol}: Target {call.target_price}"
        
        # Stub: Firebase Push
        logger.info(f"[Firebase Push] Sending to subscribers: '{message}'")
        
        # Stub: Email
        logger.info(f"[Email] Sending research report to subscribers for {call.symbol}")
        
        # Stub: SMS (MSG91/Twilio)
        # Note: Usually only for ultra-premium users
        logger.info(f"[SMS] Premium alert dispatched for {call.symbol}")

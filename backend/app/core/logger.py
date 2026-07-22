import logging
import sys
from app.core.config import settings

def setup_logger():
    """Configure the application's root logger."""
    
    logger = logging.getLogger("univest_app")
    
    # Set the logging level based on the DEBUG setting
    level = logging.DEBUG if settings.DEBUG else logging.INFO
    logger.setLevel(level)

    # Prevent logger from adding handlers multiple times
    if not logger.handlers:
        # Create console handler
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(level)

        # Create formatter and add it to the handler
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        console_handler.setFormatter(formatter)

        # Add the handler to the logger
        logger.addHandler(console_handler)

    return logger

logger = setup_logger()

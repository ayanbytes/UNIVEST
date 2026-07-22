import time
import uuid
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.logger import logger

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """
    Middleware to log request and response times, and assign a unique Request ID.
    """
    async def dispatch(self, request: Request, call_next):
        # Generate a unique request ID
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id
        
        start_time = time.time()
        
        # Log the incoming request
        logger.info(f"Incoming request: {request.method} {request.url.path} (Request ID: {request_id})")
        
        try:
            # Process the request
            response = await call_next(request)
            
            process_time = (time.time() - start_time) * 1000
            
            # Log the outgoing response
            logger.info(f"Request completed: {request.method} {request.url.path} - Status: {response.status_code} - Time: {process_time:.2f}ms (Request ID: {request_id})")
            
            # Inject request ID into response headers
            response.headers["X-Request-ID"] = request_id
            response.headers["X-Process-Time-Ms"] = str(round(process_time, 2))
            
            return response
            
        except Exception as e:
            process_time = (time.time() - start_time) * 1000
            logger.error(f"Request failed: {request.method} {request.url.path} - Time: {process_time:.2f}ms (Request ID: {request_id})", exc_info=True)
            raise e

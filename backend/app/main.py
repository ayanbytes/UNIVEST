from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logger import logger
from app.middleware.logging import RequestLoggingMiddleware
from app.exceptions.handlers import add_exception_handlers
from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.health import router as health_router
from app.api.v1.research import router as research_router
from app.api.v1.broker import router as broker_router
from app.api.v1.orders import router as orders_router
from app.api.v1.portfolio import router as portfolio_router
from app.api.v1.watchlist import router as watchlist_router
from app.api.v1.ai_advisory import router as ai_router
from app.api.v1.pms import router as pms_router
from app.api.v1.mutual_funds import router as mf_router
from app.api.v1.ipo import router as ipo_router
from app.api.v1.screener import router as screener_router

def create_app() -> FastAPI:
    # Initialize FastAPI application
    app = FastAPI(
        title=settings.APP_NAME,
        description="Backend API for Stock Advisory Platform",
        version="1.0.0",
        docs_url="/docs" if settings.DEBUG else None,
        redoc_url="/redoc" if settings.DEBUG else None,
    )

    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Restrict in production
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Add custom request logging middleware
    app.add_middleware(RequestLoggingMiddleware)

    # Register custom exception handlers
    add_exception_handlers(app)

    # Include API routers
    app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])
    app.include_router(users_router, prefix="/api/v1/users", tags=["Users"])
    app.include_router(research_router, prefix="/api/v1/research", tags=["Research"])
    app.include_router(broker_router, prefix="/api/v1/broker", tags=["Broker"])
    app.include_router(orders_router, prefix="/api/v1/orders", tags=["Orders"])
    app.include_router(portfolio_router, prefix="/api/v1/portfolio", tags=["Portfolio"])
    app.include_router(watchlist_router, prefix="/api/v1/watchlist", tags=["Watchlist"])
    app.include_router(ai_router, prefix="/api/v1/ai", tags=["AI Advisory"])
    app.include_router(pms_router, prefix="/api/v1/pms", tags=["PMS"])
    app.include_router(mf_router, prefix="/api/v1/mutual-funds", tags=["Mutual Funds"])
    app.include_router(ipo_router, prefix="/api/v1/ipos", tags=["IPOs"])
    app.include_router(screener_router, prefix="/api/v1/screener", tags=["Screener"])
    app.include_router(health_router, prefix="/health", tags=["Health"])

    @app.on_event("startup")
    async def startup_event():
        logger.info(f"Starting {settings.APP_NAME}...")

    @app.on_event("shutdown")
    async def shutdown_event():
        logger.info(f"Shutting down {settings.APP_NAME}...")

    return app

app = create_app()

import uuid
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.portfolio import Portfolio, Holding

class PortfolioService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_or_create_portfolio(self, user_id: uuid.UUID) -> Portfolio:
        query = select(Portfolio).where(Portfolio.user_id == user_id)
        result = await self.session.execute(query)
        portfolio = result.scalar_one_or_none()
        
        if not portfolio:
            portfolio = Portfolio(user_id=user_id)
            self.session.add(portfolio)
            await self.session.commit()
            await self.session.refresh(portfolio)
            
        return portfolio

    async def get_portfolio_summary(self, user_id: uuid.UUID):
        query = select(Portfolio).where(Portfolio.user_id == user_id)
        # Note: In a real app we'd load holdings to calculate live PnL. For MVP we'll just return the base model.
        result = await self.session.execute(query)
        portfolio = result.scalar_one_or_none()
        
        if not portfolio:
            portfolio = await self.get_or_create_portfolio(user_id)
            
        # Stub live PnL
        unrealized_pnl = float(portfolio.current_value) - float(portfolio.total_invested)
        pnl_perc = (unrealized_pnl / float(portfolio.total_invested) * 100) if portfolio.total_invested > 0 else 0.0
        
        return {
            "id": portfolio.id,
            "user_id": portfolio.user_id,
            "total_invested": portfolio.total_invested,
            "current_value": portfolio.current_value,
            "unrealized_pnl": unrealized_pnl,
            "unrealized_pnl_percentage": pnl_perc,
            "holdings": [] # Stub
        }

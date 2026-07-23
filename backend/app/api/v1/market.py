from fastapi import APIRouter, Depends, Query, Path
from typing import List, Dict, Any
from app.services.market_data_service import MarketDataService, get_market_data_service


router = APIRouter()

@router.get("/quote/{symbol}", response_model=Dict[str, Any])
async def get_quote(
    symbol: str = Path(..., title="The trading symbol of the stock, e.g., RELIANCE"),
    exchange: str = Query("NSE", title="The exchange, e.g., NSE or BSE"),
    market_service: MarketDataService = Depends(get_market_data_service)
):
    """
    Get the live market quote (LTP, Open, High, Low, Close, Volume) for a specific symbol.
    """
    return await market_service.get_live_quote(symbol=symbol.upper(), exchange=exchange.upper())


@router.get("/quotes", response_model=Dict[str, Any])
async def get_bulk_quotes(
    symbols: List[str] = Query(..., title="List of trading symbols"),
    exchange: str = Query("NSE", title="The exchange"),
    market_service: MarketDataService = Depends(get_market_data_service)
):
    """
    Get live market quotes for multiple symbols at once.
    Example: /quotes?symbols=RELIANCE&symbols=TCS&symbols=HDFC
    """
    upper_symbols = [sym.upper() for sym in symbols]
    return await market_service.get_bulk_quotes(symbols=upper_symbols, exchange=exchange.upper())

@router.get("/search", response_model=List[Dict[str, Any]])
async def search_stocks(
    query: str = Query(..., title="Search query, e.g. Tata"),
    market_service: MarketDataService = Depends(get_market_data_service)
):
    """
    Search for stocks and ETFs available on the platform.
    """
    return await market_service.search_stocks(query=query)

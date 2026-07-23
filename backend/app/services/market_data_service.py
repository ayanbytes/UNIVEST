import httpx
from typing import Optional, Dict, Any, List
from app.core.config import settings
from app.core.logger import logger
from fastapi import HTTPException

class MarketDataService:
    def __init__(self):
        # We use the key provided in the .env file.
        self.api_key = settings.GROW_API_KEY
        self.base_url = "https://groww.in/v1/api"
        # Optional: Initialize a persistent client for connection pooling if needed
        # self.client = httpx.AsyncClient(base_url=self.base_url)

    def _get_headers(self) -> Dict[str, str]:
        if not self.api_key:
            raise HTTPException(status_code=500, detail="Groww API Key not configured")
        
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        }

    async def get_live_quote(self, symbol: str, exchange: str = "NSE", segment: str = "CASH", client: httpx.AsyncClient = None) -> Dict[str, Any]:
        """
        Fetches the live quote for a specific trading symbol.
        """
        endpoint = f"{self.base_url}/stocks_data/v1/tr_live_prices/exchange/{exchange}/segment/{segment}/{symbol}/latest"
        
        try:
            # Use provided client or create a temporary one
            if client:
                response = await client.get(endpoint, headers=self._get_headers())
            else:
                async with httpx.AsyncClient() as temp_client:
                    response = await temp_client.get(endpoint, headers=self._get_headers())
                    
            response.raise_for_status()
            data = response.json()
            
            # Removed the logger.info here to prevent terminal spam when polling
            
            return {
                "symbol": symbol,
                "exchange": exchange,
                "ltp": data.get("ltp", 0.0),
                "open": data.get("open", 0.0),
                "high": data.get("high", 0.0),
                "low": data.get("low", 0.0),
                "close": data.get("close", 0.0), # Previous Close
                "volume": data.get("volume", 0),
                "raw_data": data
            }
        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP Error fetching quote for {symbol}: {e.response.text}")
            raise HTTPException(status_code=e.response.status_code, detail="Failed to fetch market data from broker")
        except Exception as e:
            logger.error(f"Error fetching quote for {symbol}: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal error fetching market data")

    async def get_bulk_quotes(self, symbols: List[str], exchange: str = "NSE") -> Dict[str, Any]:
        """
        Fetches live quotes for multiple symbols concurrently using a shared client.
        """
        import asyncio

        async with httpx.AsyncClient() as shared_client:
            async def fetch_safely(symbol: str):
                try:
                    return symbol, await self.get_live_quote(symbol, exchange=exchange, client=shared_client)
                except Exception as e:
                    return symbol, {"error": str(e)}

            tasks = [fetch_safely(symbol) for symbol in symbols]
            responses = await asyncio.gather(*tasks)
            return {symbol: result for symbol, result in responses}

    async def search_stocks(self, query: str) -> List[Dict[str, Any]]:
        """
        Searches the Groww platform for stocks matching the query.
        """
        endpoint = f"{self.base_url}/search/v3/query/global/st_p_query"
        params = {
            "page": 0,
            "query": query,
            "size": 10,
            "web": "true"
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(endpoint, params=params, headers=self._get_headers())
                response.raise_for_status()
                
                data = response.json()
                results = []
                
                # The Groww search API returns items in data.data.content
                if "data" in data and "content" in data["data"]:
                    for item in data["data"]["content"]:
                        if item.get("entity_type") in ["Stocks", "ETF"]:
                            results.append({
                                "symbol": item.get("nse_scrip_code") or item.get("bse_scrip_code"),
                                "companyName": item.get("title") or item.get("company_short_name"),
                                "exchange": "NSE" if item.get("nse_scrip_code") else "BSE",
                                "isin": item.get("isin"),
                                "entity_type": item.get("entity_type")
                            })
                return results
                
        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP Error searching for {query}: {e.response.text}")
            raise HTTPException(status_code=e.response.status_code, detail="Failed to search market data")
        except Exception as e:
            logger.error(f"Error searching for {query}: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal error searching market data")

# Dependency injection for FastAPI
def get_market_data_service() -> MarketDataService:
    return MarketDataService()

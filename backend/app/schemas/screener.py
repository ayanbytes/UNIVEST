from typing import List, Optional
from pydantic import BaseModel

class ScreenerFilter(BaseModel):
    indicator: str # e.g. PE, ROE, RSI, MACD
    operator: str # e.g. >, <, ==
    value: float

class ScreenerRequest(BaseModel):
    filters: List[ScreenerFilter]

class ScreenerResult(BaseModel):
    symbol: str
    company_name: str
    current_price: float
    indicator_values: dict # Map of indicator -> value for this stock

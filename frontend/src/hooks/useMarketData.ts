import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export interface LiveQuote {
  symbol: string;
  exchange: string;
  ltp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  raw_data?: any;
}

export const useMarketData = (symbols: string[], pollIntervalMs = 15000) => {
  const [quotes, setQuotes] = useState<Record<string, LiveQuote>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = useCallback(async () => {
    if (!symbols || symbols.length === 0) {
        setLoading(false);
        return;
    }
    
    try {
      // Build query string like ?symbols=RELIANCE&symbols=TCS
      const queryParams = symbols.map(s => `symbols=${encodeURIComponent(s)}`).join('&');
      const response = await api.get(`/market/quotes?${queryParams}`);
      
      setQuotes(prev => ({ ...prev, ...response.data }));
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch live market data:", err);
      // We don't overwrite old quotes on error, just set error state
      setError(err?.response?.data?.detail || err.message || "Failed to fetch quotes");
    } finally {
      setLoading(false);
    }
  }, [symbols.join(',')]);

  useEffect(() => {
    fetchQuotes();

    if (pollIntervalMs > 0) {
      const intervalId = setInterval(fetchQuotes, pollIntervalMs);
      return () => clearInterval(intervalId);
    }
  }, [fetchQuotes, pollIntervalMs]);

  return { quotes, loading, error, refresh: fetchQuotes };
};

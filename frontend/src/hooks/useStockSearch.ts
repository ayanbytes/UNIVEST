import { useState, useCallback } from 'react';
import api from '../services/api';

export interface SearchResult {
  symbol: string;
  companyName: string;
  exchange: string;
  isin?: string;
  entity_type?: string;
}

export function useStockSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchStocks = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await api.get<SearchResult[]>(`/market/search?query=${encodeURIComponent(query)}`);
      setResults(response.data);
    } catch (err: any) {
      console.error('Error searching stocks:', err);
      setError(err.message || 'Failed to search stocks');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    isSearching,
    error,
    searchStocks,
    clearSearch
  };
}

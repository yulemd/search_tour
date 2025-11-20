import { useEffect, useState } from 'react';
import { getSearchPrices, type PriceOffer } from '../../api';

export type SearchResultsState = {
  results: PriceOffer[] | null;
  isFinished: boolean;
};

const searchPricesCache: Record<string, SearchResultsState> = {};

interface UseSearchPricesProps {
  token?: string;
  waitUntil?: string | number;
  enabled?: boolean;
}

export function useSearchPrices({
  token = '',
  waitUntil = '',
  enabled = true,
}: UseSearchPricesProps) {
  const hasToken = !!token;
  const shouldFetch = enabled && hasToken;
  const cachedData = shouldFetch ? (searchPricesCache[token] ?? null) : null;

  const [state, setState] = useState<{
    data: SearchResultsState | null;
    fetchedToken: string | null;
    error: string | null;
  }>({
    data: cachedData,
    fetchedToken: cachedData ? token : null,
    error: null,
  });

  useEffect(() => {
    const tokenMismatch = token && state.fetchedToken !== token;

    if (shouldFetch && tokenMismatch && !cachedData) {
      setState((prev) => ({
        ...prev,
        data: null,
        error: null,
      }));
    }

    if (shouldFetch && cachedData && state.fetchedToken !== token) {
      setState({
        data: cachedData,
        fetchedToken: token,
        error: null,
      });
    }
  }, [token, shouldFetch, cachedData, state.fetchedToken]);

  const isDataStale = state.fetchedToken !== token;

  const loading = shouldFetch && isDataStale;

  const displayedData = cachedData || state.data || null;
  const displayedError = loading ? null : state.error;

  useEffect(() => {
    if (!shouldFetch || cachedData) {
      return;
    }

    let isActive = true;
    const waitUntilTime = Number(waitUntil);
    const retryCount = { current: 0 };

    const poll = async () => {
      if (!isActive) return;

      const now = Date.now();
      const waitTime = waitUntilTime - now;

      if (waitTime > 0) {
        await new Promise((res) => setTimeout(res, waitTime));
      }

      if (!isActive) return;

      try {
        const response = await getSearchPrices(token);
        const json = await response.json();

        if (!isActive) return;

        const hasResults = json.prices && Object.keys(json.prices).length > 0;

        let isFinished = json.isFinished || hasResults;

        const hasWaitInstruction =
          json.waitUntil && Number(json.waitUntil) > Date.now();

        if (!isFinished && hasWaitInstruction) {
          const nextDelay = json.waitUntil || 1000;
          await new Promise((res) => setTimeout(res, nextDelay));
          return poll();
        }

        if (!isFinished && !hasWaitInstruction) {
          isFinished = true;
        }

        if (isFinished) {
          const final: SearchResultsState = {
            results: Object.values(json.prices || {}),
            isFinished: true,
          };

          setState({
            data: final,
            fetchedToken: token,
            error: null,
          });
        }
      } catch (err) {
        if (!isActive) return;

        if (err instanceof DOMException && err.name === 'AbortError') return;

        if (retryCount.current < 2) {
          retryCount.current++;
          await new Promise((res) =>
            setTimeout(res, 1000 * retryCount.current),
          );
          return poll();
        }

        setState((prev) => ({
          ...prev,
          fetchedToken: token,
          error: err instanceof Error ? err.message : 'Unknown error',
        }));
      }
    };

    poll();

    return () => {
      isActive = false;
    };
  }, [token, shouldFetch, waitUntil, cachedData]);

  return {
    data: displayedData,
    loading,
    error: displayedError,
  };
}

import { useEffect, useRef, useState } from 'react';
import { getSearchPrices, type PriceOffer } from '../../api';

type SearchResultsState = {
  results: PriceOffer[] | null;
  isFinished: boolean;
};

const searchPricesCache: Record<string, SearchResultsState> = {};

export function useSearchPrices({
  token = '',
  waitUntil = '',
  enabled = true,
}) {
  const cached = enabled && token ? (searchPricesCache[token] ?? null) : null;

  const [data, setData] = useState<SearchResultsState | null>(cached);
  const [loading, setLoading] = useState(!cached && !!token);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setData(null);
      setLoading(false);
      setError(null);
    }
  }, [enabled]);

  const retryCount = useRef(0);

  const waitUntilRef = useRef(Number(waitUntil));

  useEffect(() => {
    if (!enabled || !token || !waitUntil) return;

    waitUntilRef.current = Number(waitUntil);

    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    let isActive = true;

    async function poll() {
      const now = Date.now();
      const waitTime = waitUntilRef.current - now;

      if (waitTime > 0) {
        await new Promise((res) => setTimeout(res, waitTime));
      }

      if (!isActive) return;

      try {
        setLoading(true);
        setError(null);

        const response = await getSearchPrices(token);

        const json = await response.json();

        const success = !!Object.values(json).length;

        if (!success) {
          const nextTime = Date.now() + (json.waitUntil ?? 1000);
          waitUntilRef.current = nextTime;
          return poll();
        }

        if (success) {
          const final: SearchResultsState = {
            results: Object.values(json.prices) ?? [],
            isFinished: true,
          };

          searchPricesCache[token] = final;

          setData(final);
          setLoading(false);
          return;
        }
        throw new Error(json.message ?? 'Server returned error');
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;

        if (retryCount.current < 2) {
          retryCount.current++;
          return poll();
        }

        setError(`Failed to fetch results: ${err}`);
        setLoading(false);
      }
    }

    poll();

    return () => {
      isActive = false;
    };
  }, [cached, enabled, token, waitUntil]);

  return { data, loading, error };
}

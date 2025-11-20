import { useEffect, useState } from 'react';
import { startSearchPrices, type StartSearchResponse } from '../../api';

export function useStartSearchPrices(countryId: string) {
  const [data, setData] = useState<StartSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!countryId) {
      setData(null);
      return;
    }

    let isActive = true;
    setLoading(true);
    setError(null);
    setData(null);

    (async () => {
      try {
        const response = await startSearchPrices(countryId);
        const json = await response.json();

        const waitUntilTimestamp = json.waitUntil
          ? Date.parse(json.waitUntil)
          : Date.now() + 1000;

        if (isActive) {
          setData({
            token: json.token,
            waitUntil: `${waitUntilTimestamp}`,
          });
        }
      } catch (err) {
        if (isActive) {
          const msg = err instanceof Error ? err.message : String(err);
          setError(`Failed to start search: ${msg}`);
        }
      } finally {
        if (isActive) setLoading(false);
      }
    })();

    return () => {
      isActive = false;
    };
  }, [countryId]);

  return {
    startSearchData: data,
    isStarting: loading,
    startError: error,
  };
}

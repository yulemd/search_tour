import { useEffect, useState } from 'react';
import { startSearchPrices, type StartSearchResponse } from '../../api';

export function useStartSearchPrices(
  countryId: string,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const [data, setData] = useState<StartSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!countryId) {
      setData(null);
      return;
    }

    setData(null);
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const response = await startSearchPrices(countryId);

        const json = await response.json();

        const waitUntil = Date.parse(json.waitUntil ?? 0);

        setData({
          token: json.token,
          waitUntil: `${waitUntil}`,
        });
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(`Failed to start search: ${err}`);
      } finally {
        setLoading(false);
        setEnabled(true);
      }
    })();
  }, [countryId, setEnabled]);

  return {
    startSearch: data,
    loading,
    error,
  };
}

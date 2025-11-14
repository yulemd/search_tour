import { useEffect, useState } from 'react';
import { type GeoResponse, searchGeo } from '../../api';

const searchGeoCache: Record<string, GeoResponse> = {};

export function useSearchGeo(search: string) {
  const cached = searchGeoCache[search] ?? null;

  const [data, setData] = useState<GeoResponse | null>(cached);
  const [loading, setLoading] = useState(!cached && search.length > 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!search) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    if (searchGeoCache[search]) {
      setData(searchGeoCache[search]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const response = await searchGeo(search);
        const json = await response.json();

        searchGeoCache[search] = json;
        setData(json);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(`Failed to load geo results: ${err}`);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [search]);

  return {
    searchGeoResults: data,
    loading,
    error,
  };
}

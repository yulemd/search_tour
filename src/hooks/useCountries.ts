import { useEffect, useState } from 'react';
import { type Country, getCountries } from '../../api';

type CountriesMap = Record<string, Country>;
let countriesCache: CountriesMap | null = null;

export function useCountries() {
  const [data, setData] = useState(countriesCache);
  const [loading, setLoading] = useState(!countriesCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (countriesCache) return;

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const res = await getCountries();
        const json = await res.json();

        countriesCache = json;
        setData(json);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(`Failed to load countries: ${err}`);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return { countries: data, loading, error };
}

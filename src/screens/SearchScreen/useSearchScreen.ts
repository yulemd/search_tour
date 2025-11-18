import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getOptionType } from '@/helpers/getOptionType';
import { useCountries } from '@/hooks/useCountries';
import { useSearchGeo } from '@/hooks/useSearchGeo';
import { useSearchPrices } from '@/hooks/useSearchPrices';
import { useStartSearchPrices } from '@/hooks/useStartSearchPrices';

import type { GeoEntity } from 'api';
import type { OnChangeType, SearchPricesStatusType } from './types';

export const useSearchScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [enabled, setEnabled] = useState(false);

  const { countries } = useCountries();

  const countriesList = Object.values(countries ?? {}).reduce(
    (acc, country) => {
      if (country.id) acc.push({ ...country, type: 'country' as const });
      return acc;
    },
    [] as GeoEntity[],
  );

  const { searchGeoResults } = useSearchGeo(value);
  const searchGeoResultsList = Object.values(searchGeoResults ?? {}).map(
    (item) => ({ ...item, type: getOptionType(item) }),
  ) as GeoEntity[];

  const filtered = searchGeoResultsList.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase()),
  );

  const optionsList =
    value && !countriesList.some((c) => c.name === value)
      ? filtered
      : countriesList;

  const { startSearch, loading } = useStartSearchPrices(
    selectedCountryId,
    setEnabled,
  );

  const {
    data: searchData,
    loading: searchPricesLoading,
    error: searchPricesError,
  } = useSearchPrices({
    token: loading ? '' : startSearch?.token,
    waitUntil: startSearch?.waitUntil,
    enabled,
  });

  const searchPricesStatuses: SearchPricesStatusType = useMemo(() => {
    if (!value) {
      return {
        loading: false,
        error: false,
        emptyState: false,
      };
    }

    const error = !!searchPricesError;
    const loading =
      (searchPricesLoading || Boolean(selectedCountryId)) &&
      !error &&
      !searchData?.isFinished;

    const sameValue =
      countriesList.find(({ id }) => id === selectedCountryId)?.name === value;

    const emptyState =
      enabled &&
      sameValue &&
      searchData?.isFinished &&
      !searchData?.results?.length;

    return { loading, error, emptyState };
  }, [
    countriesList,
    enabled,
    value,
    searchPricesLoading,
    searchPricesError,
    searchData,
    selectedCountryId,
  ]);

  const onChangeInput: OnChangeType = ({ target: { value: changedValue } }) => {
    setValue(changedValue);
  };

  const onSelect = (label: string) => setValue(label);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const openDropdown = () => setOpen(true);
  const closeDropdown = () => {
    setOpen(false);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        !inputRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) setOpen(true);
    if (['Enter', 'Escape'].includes(e.key)) e.preventDefault();

    if (e.key === 'Escape') closeDropdown();
  };

  const onOptionClick = (label: string) => {
    onSelect(label);
    closeDropdown();
  };

  const onSubmit = useCallback(() => {
    if (!value) return;
    const { id: countryId } = countriesList.find((c) => c.name === value) || {
      id: '',
    };
    console.info('SUBMITTED!');
    setEnabled(false);
    setSelectedCountryId(`${countryId}`);
  }, [countriesList, value]);

  return {
    closeDropdown,
    onChangeInput,
    onKeyDown,
    onOptionClick,
    onSubmit,
    open,
    openDropdown,
    optionsList,
    refs: { inputRef, dropdownRef },
    searchPricesStatuses,
    setValue,
    value,
  };
};

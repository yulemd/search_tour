import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getSearchPricesStatuses, getToursToRender } from '@/helpers';
import { useSearchPrices } from '@/hooks/useSearchPrices';
import { useStartSearchPrices } from '@/hooks/useStartSearchPrices';
import { useStore } from '@/models';

import type { GeoEntity } from 'api';
import type { OnChangeType } from './types';

export const useSearchScreen = () => {
  const root = useStore();
  const { countries, hotels, geoEntities, tours } = root;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState('');

  const countriesListExists = root.countriesListExists();
  const geoEntitiesListExists = root.geoEntitiesListExists();

  const retrieveData = useCallback(() => {
    root.retrieveData();
  }, [root]);

  const countriesList = countries.getList() as GeoEntity[];

  useEffect(() => {
    if (countriesListExists) {
      return;
    }
    retrieveData();
  }, [countriesListExists, retrieveData]);

  const retrieveGeoEntities = useCallback(() => {
    geoEntities.retrieveList(value);
  }, [geoEntities, value]);

  const searchGeoResultsList = geoEntities.getList() as GeoEntity[];

  useEffect(() => {
    if (value && geoEntitiesListExists) {
      return;
    }
    retrieveGeoEntities();
  }, [geoEntitiesListExists, value, retrieveGeoEntities]);

  const filtered = searchGeoResultsList.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase()),
  );

  const optionsList =
    value && !countriesList.some((c) => c.name === value)
      ? filtered
      : countriesList;

  const { startSearchData, isStarting, startError } =
    useStartSearchPrices(selectedCountryId);

  const pollingEnabled = !!startSearchData?.token && !isStarting;

  const {
    data: searchData,
    loading: searchPricesLoading,
    error: searchPricesError,
  } = useSearchPrices({
    token: startSearchData?.token,
    waitUntil: startSearchData?.waitUntil,
    enabled: pollingEnabled,
  });

  useEffect(() => {
    if (searchData) {
      tours.addList(searchData.results);
    }
  }, [searchData, tours]);

  const retrieveHotels = useCallback(() => {
    hotels.retrieveList(selectedCountryId);
  }, [hotels, selectedCountryId]);

  const hotelsList = hotels.getList();
  const toursList = tours.getList();

  useEffect(() => {
    if (!selectedCountryId) {
      return;
    }
    retrieveHotels();
  }, [selectedCountryId, retrieveHotels]);

  const toursToRender = useMemo(
    () => getToursToRender(toursList, hotelsList, countries),
    [toursList, hotelsList, countries],
  );

  const searchPricesStatuses = useMemo(
    () =>
      getSearchPricesStatuses({
        value,
        searchPricesError: searchPricesError || startError,
        searchPricesLoading: searchPricesLoading || isStarting,
        selectedCountryId,
        searchData,
        countriesList,
        enabled: pollingEnabled,
      }),
    [
      countriesList,
      isStarting,
      pollingEnabled,
      searchPricesLoading,
      searchPricesError,
      searchData,
      selectedCountryId,
      startError,
      value,
    ],
  );

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
    toursToRender,
    value,
  };
};

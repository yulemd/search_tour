import { useEffect, useRef, useState } from 'react';

import { getOptionType } from '@/helpers/getOptionType';
import { useCountries } from '@/hooks/useCountries';
import { useSearchGeo } from '@/hooks/useSearchGeo';

import type { GeoEntity } from 'api';
import type { OnChangeType } from './types';

export const useSearchScreen = () => {
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [value, setValue] = useState('');

  const { countries } = useCountries();
  const countriesList = Object.values(countries ?? {}).reduce(
    (acc, country) => {
      if (country.id) {
        acc.push({ ...country, type: 'country' as const });
      }
      return acc;
    },
    [] as GeoEntity[],
  );

  const { searchGeoResults } = useSearchGeo(value);
  const searchGeoResultsList = Object.values(searchGeoResults ?? {}).map(
    (item) => ({
      ...item,
      type: getOptionType(item),
    }),
  ) as GeoEntity[];

  const filtered = searchGeoResultsList.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase()),
  );

  const optionsList =
    value && !countriesList.some((country) => country.name === value)
      ? filtered
      : countriesList;

  const onChangeInput: OnChangeType = ({ target: { value: changedValue } }) => {
    setValue(changedValue);
  };

  const onSelect = (label: string) => setValue(label);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const openDropdown = () => setOpen(true);
  const closeDropdown = () => {
    setOpen(false);
    setHighlightIndex(-1);
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

    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
      e.preventDefault();
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((p) => (p + 1) % optionsList.length);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((p) => (p <= 0 ? optionsList.length - 1 : p - 1));
    }

    if (e.key === 'Enter' && highlightIndex >= 0) {
      onSelect(optionsList[highlightIndex].name);
      closeDropdown();
    }

    if (e.key === 'Escape') closeDropdown();
  };

  const onOptionHover = (index: number) => {
    setHighlightIndex(index);
  };

  const onOptionClick = (label: string) => {
    onSelect(label);
    closeDropdown();
  };

  return {
    closeDropdown,
    optionsList,
    highlightIndex,
    onChangeInput,
    onKeyDown,
    onOptionClick,
    onOptionHover,
    open,
    openDropdown,
    refs: {
      inputRef,
      dropdownRef,
    },
    setValue,
    value,
  };
};

import type { ChangeEventHandler } from 'react';

import type { GeoEntity } from 'api';

export type SearchPricesStatusType = {
  loading: boolean | undefined;
  error: boolean;
  emptyState: boolean | undefined;
};

export interface SearchScreenProps {
  closeDropdown: () => void;
  searchPricesStatuses?: SearchPricesStatusType;
  onChangeInput: OnChangeType;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onOptionClick: (label: string) => void;
  onSubmit: () => void;
  open: boolean;
  openDropdown: () => void;
  optionsList: GeoEntity[];
  placeholder?: string;
  refs: {
    inputRef: React.RefObject<HTMLInputElement | null>;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
  };
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

export type OnChangeType = ChangeEventHandler<HTMLInputElement>;

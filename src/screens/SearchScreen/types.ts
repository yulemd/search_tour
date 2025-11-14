import type { ChangeEventHandler } from 'react';

import type { GeoEntity } from 'api';

export interface SearchScreenProps {
  closeDropdown: () => void;
  optionsList: GeoEntity[];
  highlightIndex: number;
  onChangeInput: OnChangeType;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onOptionClick: (label: string) => void;
  onOptionHover: (index: number) => void;
  open: boolean;
  openDropdown: () => void;
  placeholder?: string;
  refs: {
    inputRef: React.RefObject<HTMLInputElement | null>;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
  };
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

export type OnChangeType = ChangeEventHandler<HTMLInputElement>;

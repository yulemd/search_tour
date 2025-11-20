import type { GeoEntity } from 'api';
import type { ChangeEventHandler } from 'react';

export type SearchPricesStatusType = {
  loading: boolean | undefined;
  error: boolean;
  emptyState: boolean | undefined;
};

export type TourToRender = {
  city: string;
  country: string;
  endDate: string;
  hotelId: string;
  hotelImage: string;
  hotelName: string;
  flag: string;
  openPriceLink: string;
  priceFormatted: string;
  startDate: string;
  tourId: string;
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
  toursToRender?: TourToRender[];
  value: string;
}

export type OnChangeType = ChangeEventHandler<HTMLInputElement>;

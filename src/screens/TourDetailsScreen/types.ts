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

export interface TourDetailsProps {
  title: string;
  country: string;
  city: string;
  hotelImage: string;
  description?: string;
  services?: Record<string, string>;
  startDate: string;
  endDate: string;
  priceFormatted: string;
}

export type OnChangeType = ChangeEventHandler<HTMLInputElement>;

export {};
declare module './api' {
  export type Country = {
    id: string;
    name: string;
    flag: string;
    type?: 'country' | 'city' | 'hotel';
  };

  export type City = {
    id: number;
    name: string;
    type?: 'country' | 'city' | 'hotel';
  };

  export type Hotel = {
    id: number;
    name: string;
    img: string;
    cityId: number;
    cityName: string;
    countryId: string;
    countryName: string;
    description?: string;
    services?: Record<string, string>;
    type?: 'country' | 'city' | 'hotel';
  };

  export type CountriesMap = Record<string, Country>;
  export type CitiesMap = Record<string, City>;
  export type HotelsMap = Record<string, Hotel>;

  export interface PriceOffer {
    id: string;
    amount: number;
    currency: 'usd';
    startDate: string;
    endDate: string;
    hotelID: string;
  }

  export type PricesMap = Record<string, PriceOffer>;

  export type GeoEntity = Country | City | Hotel;

  export type GeoResponse = Record<string, GeoEntity>;

  export type ErrorResponse = {
    code: number;
    error: true;
    message: string;
    waitUntil?: string;
  };

  export type StartSearchResponse = {
    token: string;
    waitUntil: string;
  };

  export type GetSearchPricesResponse = {
    prices: PricesMap;
  };

  export type StopSearchResponse = {
    status: 'cancelled';
    message: string;
  };

  export function getCountries(): Promise<Response>;

  export function searchGeo(query: string): Promise<Response>;

  export function startSearchPrices(countryID: string): Promise<Response>;

  export function getSearchPrices(token: string): Promise<Response>;

  export function stopSearchPrices(token: string): Promise<Response>;

  export function getHotels(countryID: string): Promise<Response>;

  export function getHotel(hotelId: number): Promise<Response>;

  export function getPrice(priceId: string): Promise<Response>;
}

import * as rawApi from '../../api.js';

async function unwrap<T>(responsePromise: Promise<Response>): Promise<T> {
  const response = await responsePromise;

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw err;
  }
  return response.json() as Promise<T>;
}

export const searchGeo = (query: string) =>
  unwrap<Record<string, rawApi.Country | rawApi.City | rawApi.Hotel>>(
    rawApi.searchGeo(query),
  );

export const getCountries = () =>
  unwrap<Record<string, rawApi.Country>>(rawApi.getCountries());

export const getHotels = (countryId: string) =>
  unwrap<Record<string, rawApi.Hotel>>(rawApi.getHotels(countryId));

export const getHotel = (hotelId: number | string) =>
  unwrap<rawApi.Hotel>(rawApi.getHotel(Number(hotelId)));

export const startSearchPrices = (countryId: string) =>
  unwrap<{ token: string; waitUntil: string }>(
    rawApi.startSearchPrices(countryId),
  );

export const getSearchPrices = (token: string) =>
  unwrap<rawApi.PriceOffer>(rawApi.getSearchPrices(token));

export const stopSearchPrices = (token: string) =>
  unwrap<{ message: string }>(rawApi.stopSearchPrices(token));

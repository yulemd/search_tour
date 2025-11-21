import { getCountries } from '@/api';
import { transformDataToCountries } from './tools';

import type { CountriesDataType } from './types';

type GetRequestType = () => Promise<object>;

export const getCountriesRequest: GetRequestType = async () => {
  const requestData = await getCountries();
  const data = transformDataToCountries(
    requestData as unknown as CountriesDataType,
  );
  return data;
};

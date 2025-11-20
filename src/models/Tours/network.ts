import { getSearchPrices } from '@/api';
import { transformDataToTours } from './tools';
import type { ToursDataType } from './types';

type GetRequestType = (token: string) => Promise<object>;

export const getToursRequest: GetRequestType = async (token) => {
  const requestData = await getSearchPrices(token);
  const data = transformDataToTours(requestData as unknown as ToursDataType);

  return data;
};

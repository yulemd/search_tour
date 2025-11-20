import { getHotels } from '@/api';
import { transformDataToHotels } from './tools';
import type { HotelsDataType } from './types';

type GetRequestType = (countryId: string) => Promise<object>;

export const getHotelsRequest: GetRequestType = async (countryId: string) => {
  const requestData = await getHotels(countryId);
  const data = transformDataToHotels(requestData as unknown as HotelsDataType);

  return data;
};

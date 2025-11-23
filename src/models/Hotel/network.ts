import { getHotel } from '@/api';
import { transformDataToHotel } from './tools';

import type { Hotel } from 'api';

type GetRequestType = (id: number) => Promise<object>;

export const getHotelRequest: GetRequestType = async (id: number) => {
  const requestData = await getHotel(id);
  const data = transformDataToHotel(requestData as Hotel);
  return data;
};

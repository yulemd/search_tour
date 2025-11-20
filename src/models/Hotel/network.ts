import { getHotel } from '@/api';
import { transformDataToHotel } from './tools';

import type { HotelDataType } from './types';

type GetRequestType = (id: number) => Promise<object>;

export const getHotelRequest: GetRequestType = async (id: number) => {
  const requestData = await getHotel(id);
  const data = transformDataToHotel(requestData as unknown as HotelDataType);

  return data;
};

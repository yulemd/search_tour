import { getSearchPrices } from '@/api';
import { transformDataToTours } from './tools';
import type { ToursDataType } from './types';

export type getToursRequestProps = {
  token: string;
  waitUntil: string;
  enabled: boolean;
};
type GetRequestType = (props: getToursRequestProps) => Promise<object>;

export const getToursRequest: GetRequestType = async ({
  token,
  waitUntil,
  enabled,
}) => {
  console.info({ waitUntil, enabled });
  const requestData = await getSearchPrices(token);
  const data = transformDataToTours(requestData as unknown as ToursDataType);

  return data;
};

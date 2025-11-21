import { searchGeo } from '@/api';

import { transformDataToGeoEntities } from './tools';

import type { GeoEntitiesDataType } from './types';

type GetRequestType = (query: string) => Promise<object>;

export const getGeoEntitiesRequest: GetRequestType = async (query) => {
  const requestData = await searchGeo(query);
  const data = transformDataToGeoEntities(
    requestData as unknown as GeoEntitiesDataType,
  );
  return data;
};

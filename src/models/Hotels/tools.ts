import type { GeoEntity } from 'api';
import type { HotelsDataType } from './types';

type TransformDataToModelType = (
  data: HotelsDataType,
) => Promise<Partial<GeoEntity[]>>;

export const transformDataToHotels: TransformDataToModelType = async (
  hotelsMap,
) => {
  const hotelsList = Object.values(hotelsMap ?? {}).reduce((acc, hotel) => {
    if (hotel.id) acc.push({ ...hotel, type: 'country' as const });
    return acc;
  }, [] as GeoEntity[]);
  return hotelsList;
};

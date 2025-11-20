import { transformDataToHotel } from '../Hotel/tools';

import type { GeoSnapshotIn } from '../GeoEntities/types';
import type { HotelsDataType } from './types';

type TransformDataToModelType = (
  data: HotelsDataType,
) => Promise<Partial<GeoSnapshotIn[]>>;

export const transformDataToHotels: TransformDataToModelType = async (
  hotelsMap,
) => {
  const hotelsList = Object.values(hotelsMap ?? {}).reduce((acc, hotel) => {
    if (hotel.id) acc.push(transformDataToHotel(hotel));
    return acc;
  }, [] as GeoSnapshotIn[]);
  return hotelsList;
};

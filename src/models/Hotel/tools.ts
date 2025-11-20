import type { HotelDataType, HotelSnapshotInType } from './types';

type TransformDataToModelType = (data: HotelDataType) => HotelSnapshotInType;

export const transformDataToHotel: TransformDataToModelType = ({
  id,
  name,
  flag,
}) => ({
  id,
  name,
  flag,
  type: 'hotel',
});

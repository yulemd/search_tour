import type { Hotel } from 'api';
import type { HotelSnapshotInType } from './types';

type TransformDataToModelType = (data: Hotel) => HotelSnapshotInType;

export const transformDataToHotel: TransformDataToModelType = ({
  id,
  services,
  ...data
}) => ({
  id: String(id),
  ...data,
  services: services ?? {},
  type: 'hotel',
});

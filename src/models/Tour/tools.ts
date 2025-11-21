import type { TourDataType, TourSnapshotInType } from './types';

type TransformDataToModelType = (data: TourDataType) => TourSnapshotInType;

export const transformDataToTour: TransformDataToModelType = ({
  id,
  name,
}) => ({
  id: String(id),
  name,
});

import type { CityDataType, CitySnapshotInType } from './types';

type TransformDataToModelType = (data: CityDataType) => CitySnapshotInType;

export const transformDataToCity: TransformDataToModelType = ({
  id,
  name,
}) => ({
  id: String(id),
  name,
  type: 'city',
});

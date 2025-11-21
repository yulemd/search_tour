import type { CityDataType, CitySnapshotInType } from './types';

type TransformDataToModelType = (data: CityDataType) => CitySnapshotInType;

export const transformDataToCity: TransformDataToModelType = ({
  id,
  name,
}) => ({
  id,
  name,
  type: 'city',
});

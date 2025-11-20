import type { CountryDataType, CountrySnapshotInType } from './types';

type TransformDataToModelType = (
  data: CountryDataType,
) => CountrySnapshotInType;

export const transformDataToCountry: TransformDataToModelType = ({
  id,
  name,
  flag,
}) => ({
  id,
  name,
  flag,
  type: 'country',
});

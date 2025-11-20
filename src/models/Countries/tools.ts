import type { CountriesDataType, CountriesSnapshotInType } from './types';

import { transformDataToCountry } from '../Country/tools';

type TransformDataToModelType = (
  data: CountriesDataType,
) => Promise<Partial<CountriesSnapshotInType>>;

export const transformDataToCountries: TransformDataToModelType = async ({
  records = [],
}) => {
  const transformedRecords = await Promise.all(
    records.map(async (record) => {
      const transformedRecordsItem = await transformDataToCountry(record);
      return { [record.id]: transformedRecordsItem };
    }),
  );
  return {
    data: transformedRecords.reduce(
      (acc, record) => ({ ...acc, ...record }),
      {},
    ),
  };
};

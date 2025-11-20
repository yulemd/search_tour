import type { HotelsDataType, HotelsSnapshotInType } from './types';

import { transformDataToCountry } from '../Country/tools';

type TransformDataToModelType = (
  data: HotelsDataType,
) => Promise<Partial<HotelsSnapshotInType>>;

export const transformDataToHotels: TransformDataToModelType = async ({
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

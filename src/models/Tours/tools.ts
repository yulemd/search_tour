import type { ToursDataType, ToursSnapshotInType } from './types';

type TransformDataToModelType = (
  data: ToursDataType,
) => Promise<ToursSnapshotInType>;

export const transformDataToTours: TransformDataToModelType = async (
  pricesMap,
) => {
  const pricesList = Object.values(pricesMap ?? {}).reduce((acc, price) => {
    if (price.id) acc.push({ ...price });
    return acc;
  }, [] as ToursSnapshotInType[]);
  return { id: 'tours', data: pricesList };
};

import type { GeoEntity } from 'api';
import type { CountriesDataType } from './types';

type TransformDataToModelType = (
  data: CountriesDataType,
) => Promise<Partial<GeoEntity[]>>;

export const transformDataToCountries: TransformDataToModelType = async (
  countriesMap,
) => {
  const countriesList = Object.values(countriesMap ?? {}).reduce(
    (acc, country) => {
      if (country.id) acc.push({ ...country, type: 'country' as const });
      return acc;
    },
    [] as GeoEntity[],
  );
  return countriesList;
};

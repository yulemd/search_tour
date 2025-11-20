import { getOptionType } from '@/helpers/getOptionType';
import type { GeoResponse, Hotel } from 'api';
import { transformDataToCity } from '../City/tools';
import type { CityDataType } from '../City/types';
import { transformDataToCountry } from '../Country/tools';
import type { CountryDataType } from '../Country/types';
import { transformDataToHotel } from '../Hotel/tools';
import type { GeoSnapshotIn } from './types';

type TransformDataToModelType = (data: GeoResponse) => Promise<GeoSnapshotIn[]>;

export const transformDataToGeoEntities: TransformDataToModelType = async (
  geoEntities,
) => {
  const countriesList = Object.values(geoEntities ?? {}).reduce(
    (acc, entity) => {
      if (entity.id) {
        const type = getOptionType(entity);
        acc.push(
          type === 'country'
            ? transformDataToCountry(entity as CountryDataType)
            : type === 'city'
              ? transformDataToCity(entity as CityDataType)
              : transformDataToHotel(entity as Hotel),
        );
      }
      return acc;
    },
    [] as GeoSnapshotIn[],
  );
  return countriesList;
};

import type { GeoEntity } from 'api';

type OptionType = 'country' | 'city' | 'hotel';

export const getOptionType = (item: GeoEntity): OptionType => {
  if ('flag' in item) return 'country';
  if ('cityId' in item) return 'hotel';
  return 'city';
};

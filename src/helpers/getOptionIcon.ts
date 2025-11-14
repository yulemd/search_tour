import type { GeoEntity } from 'api';

export const getOptionIcon = ({ type }: GeoEntity): string => {
  if (type === 'country') return '🌍';
  if (type === 'city') return '🏙️';
  return '🏨';
};

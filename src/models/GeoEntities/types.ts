import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { GeoEntities } from '.';

import type { GeoResponse } from 'api';
import type { City } from '../City';
import type { Country } from '../Country';
import type { Hotel } from '../Hotel';

export type GeoEntitiesDataType = GeoResponse;

export type GeoEntitiesType = Instance<typeof GeoEntities>;
export type GeoEntitiesSnapshotInType = SnapshotIn<typeof GeoEntities>;
export type GeoEntitiesSnapshotOutType = SnapshotOut<typeof GeoEntities>;

export type CountrySnapshotIn = SnapshotIn<typeof Country>;
export type CitySnapshotIn = SnapshotIn<typeof City>;
export type HotelSnapshotIn = SnapshotIn<typeof Hotel>;

export type GeoSnapshotIn =
  | CountrySnapshotIn
  | CitySnapshotIn
  | HotelSnapshotIn;

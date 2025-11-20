import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { Country } from '.';
import type { GeoEntityTypeType } from '../Root/types';

export type CountryDataType = {
  id: string;
  name: string;
  flag: string;
  type: GeoEntityTypeType;
};

export type CountryType = Instance<typeof Country>;
export type CountrySnapshotInType = SnapshotIn<typeof Country>;
export type CountrySnapshotOutType = SnapshotOut<typeof Country>;

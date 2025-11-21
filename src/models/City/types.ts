import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { City } from '.';
import type { OptionType } from '../Root/types';

export type CityDataType = {
  id: string;
  name: string;
  type: OptionType;
};

export type CityType = Instance<typeof City>;
export type CitySnapshotInType = SnapshotIn<typeof City>;
export type CitySnapshotOutType = SnapshotOut<typeof City>;

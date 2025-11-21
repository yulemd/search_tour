import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { Country } from '.';
import type { OptionType } from '../Root/types';

export type CountryDataType = {
  id: string;
  name: string;
  flag: string;
  type: OptionType;
};

export type CountryType = Instance<typeof Country>;
export type CountrySnapshotInType = SnapshotIn<typeof Country>;
export type CountrySnapshotOutType = SnapshotOut<typeof Country>;

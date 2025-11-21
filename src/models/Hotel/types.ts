import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { Hotel } from '.';
import type { OptionType } from '../Root/types';

export type HotelDataType = {
  id: string;
  name: string;
  flag: string;
  type: OptionType;
};

export type HotelType = Instance<typeof Hotel>;
export type HotelSnapshotInType = SnapshotIn<typeof Hotel>;
export type HotelSnapshotOutType = SnapshotOut<typeof Hotel>;

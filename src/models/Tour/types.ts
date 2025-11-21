import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { Tour } from '.';
import type { OptionType } from '../Root/types';

export type TourDataType = {
  id: string;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
  type: OptionType;
};

export type TourType = Instance<typeof Tour>;
export type TourSnapshotInType = SnapshotIn<typeof Tour>;
export type TourSnapshotOutType = SnapshotOut<typeof Tour>;

import {
  type Instance,
  type SnapshotIn,
  type SnapshotOut,
  types,
} from 'mobx-state-tree';

import { Root } from '.';

export type RootType = Instance<typeof Root>;
export type RootSnapshotInType = SnapshotIn<typeof Root>;
export type RootSnapshotOutType = SnapshotOut<typeof Root>;

export const GeoSearchOptionType = types.union(
  types.literal('country'),
  types.literal('city'),
  types.literal('hotel'),
);

export type OptionType = 'country' | 'city' | 'hotel';

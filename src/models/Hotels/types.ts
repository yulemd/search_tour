import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { Hotels } from '.';

import type { CountryDataType } from '../Country/types';

export type HotelsDataType = {
  records: CountryDataType[];
};

export type HotelsType = Instance<typeof Hotels>;
export type HotelsSnapshotInType = SnapshotIn<typeof Hotels>;
export type HotelsSnapshotOutType = SnapshotOut<typeof Hotels>;

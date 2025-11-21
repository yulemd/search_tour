import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { Tours } from '.';

import type { PricesMap } from 'api';

export type ToursDataType = PricesMap;

export type ToursType = Instance<typeof Tours>;
export type ToursSnapshotInType = SnapshotIn<typeof Tours>;
export type ToursSnapshotOutType = SnapshotOut<typeof Tours>;

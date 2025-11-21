import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { Hotel } from '.';

export type HotelType = Instance<typeof Hotel>;
export type HotelSnapshotInType = SnapshotIn<typeof Hotel>;
export type HotelSnapshotOutType = SnapshotOut<typeof Hotel>;

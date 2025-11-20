import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { Root } from '.';

export type RootType = Instance<typeof Root>;
export type RootSnapshotInType = SnapshotIn<typeof Root>;
export type RootSnapshotOutType = SnapshotOut<typeof Root>;

export type GeoEntityTypeType = 'country' | 'city' | 'hotel';

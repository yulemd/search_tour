import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { Hotels } from '.';

import type { HotelsMap } from 'api';

export type HotelsDataType = HotelsMap;

export type HotelsType = Instance<typeof Hotels>;
export type HotelsSnapshotInType = SnapshotIn<typeof Hotels>;
export type HotelsSnapshotOutType = SnapshotOut<typeof Hotels>;

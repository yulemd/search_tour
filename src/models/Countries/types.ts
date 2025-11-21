import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { Countries } from '.';

import type { CountriesMap } from 'api';

export type CountriesDataType = CountriesMap;

export type CountriesType = Instance<typeof Countries>;
export type CountriesSnapshotInType = SnapshotIn<typeof Countries>;
export type CountriesSnapshotOutType = SnapshotOut<typeof Countries>;

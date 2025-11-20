import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { Countries } from '.';

import type { CountryDataType } from '../Country/types';

export type CountriesDataType = {
  records: CountryDataType[];
};

export type CountriesType = Instance<typeof Countries>;
export type CountriesSnapshotInType = SnapshotIn<typeof Countries>;
export type CountriesSnapshotOutType = SnapshotOut<typeof Countries>;

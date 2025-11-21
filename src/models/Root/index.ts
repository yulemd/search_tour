import { createContext, useContext } from 'react';

import {
  applySnapshot,
  flow,
  getSnapshot,
  onSnapshot,
  types,
} from 'mobx-state-tree';

import { City } from '../City';
import { Countries } from '../Countries';
import { Country } from '../Country';
import { Hotel } from '../Hotel';
import { Hotels } from '../Hotels';
import { getRootState, saveRootState } from '../storage';
import { type RootSnapshotOutType, type RootType } from './types';

export const GeoSearchModels = types.array(types.union(Country, City, Hotel));

export const Root = types
  .model({
    countries: types.optional(Countries, { id: 'countries' }),
    hotels: types.optional(Hotels, { id: 'hotels' }),
    geoSearch: types.optional(GeoSearchModels, []),
    storeLoaded: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    loadStore: () => {
      const rootState = getRootState();
      self.storeLoaded = false;

      if (!Root.is(rootState)) {
        return;
      }
      const snapshot = getSnapshot(Root.create(rootState));
      applySnapshot(self, snapshot);

      self.storeLoaded = true;
    },
    retrieveData: flow(function* () {
      yield self.countries.retrieveList();
    }),
  }))
  .views((self) => {
    const countriesListExists = () => !!self.countries.data.length;
    return {
      countriesListExists,
    };
  });

export const rootStore = Root.create();

export const RootStoreContext = createContext<RootType>(rootStore);

export const useStore = () => useContext(RootStoreContext);

onSnapshot(rootStore, async (snapshot: RootSnapshotOutType) => {
  if (!Root.is(snapshot)) {
    console.error('Current snapshot is not compatible with the root model');
    return;
  }
  await saveRootState(snapshot);
});

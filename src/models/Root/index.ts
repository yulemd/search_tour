import { createContext, useContext } from 'react';

import { flow, onSnapshot, types } from 'mobx-state-tree';

import { Countries } from '../Countries';
import { GeoEntities } from '../GeoEntities';
import { Hotels } from '../Hotels';
import { Tours } from '../Tours';

import { saveRootState } from '../storage';
import { type RootSnapshotOutType, type RootType } from './types';

export const Root = types
  .model({
    countries: types.optional(Countries, { id: 'countries' }),
    geoEntities: types.optional(GeoEntities, { id: 'geoEntities' }),
    hotels: types.optional(Hotels, { id: 'hotels' }),
    tours: types.optional(Tours, { id: 'tours' }),
  })
  .actions((self) => ({
    retrieveData: flow(function* () {
      yield self.countries.retrieveList();
    }),
  }))
  .views((self) => {
    const countriesListExists = () => !!self.countries.data.length;
    const geoEntitiesListExists = () => !!self.geoEntities.data.length;
    const hotelsListExists = () => !!self.hotels.data.length;
    return {
      countriesListExists,
      hotelsListExists,
      geoEntitiesListExists,
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

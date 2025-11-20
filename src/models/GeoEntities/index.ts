import { applySnapshot, flow, types } from 'mobx-state-tree';

import { getGeoEntitiesRequest } from './network';

import { City } from '../City';
import { Country } from '../Country';
import { Hotel } from '../Hotel';

export const GeoSearchModels = types.union(Country, City, Hotel);

export const GeoEntities = types
  .model('GeoEntities', {
    id: types.identifier,
    data: types.array(GeoSearchModels),
  })
  .actions((self) => ({
    retrieveList: flow(function* retrieveGeoEntities(query: string) {
      const requestData = yield getGeoEntitiesRequest(query);
      applySnapshot(self.data, requestData);
    }),
  }))
  .views((self) => {
    const getList = () => [...self.data.values()];

    return { getList };
  });

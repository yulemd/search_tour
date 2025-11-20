import { applySnapshot, flow, types } from 'mobx-state-tree';

import { getCountriesRequest } from './network';

import { Country } from '../Country';

export const Countries = types
  .model('Countries', {
    id: types.identifier,
    data: types.array(Country),
  })
  .actions((self) => ({
    retrieveList: flow(function* retrieveCountries() {
      const requestData = yield getCountriesRequest();
      applySnapshot(self.data, requestData);
    }),
  }))
  .views((self) => {
    const getItem = (id: string) =>
      self.data.find(({ id: itemId }) => id === itemId);

    const getList = () => [...self.data.values()];

    return { getItem, getList };
  });

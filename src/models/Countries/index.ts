import { applySnapshot, flow, getSnapshot, types } from 'mobx-state-tree';

import { getCountriesRequest } from './network';

import { Country } from '../Country';

export const Countries = types
  .model('Countries', {
    id: types.identifier,
    data: types.map(Country),
  })
  .actions((self) => ({
    retrieveList: flow(function* retrieveCountries() {
      const requestData = yield getCountriesRequest();

      const snapshot = getSnapshot(
        Countries.create({ ...self, ...requestData }),
      );

      if (snapshot.id) {
        applySnapshot(self, snapshot);
      }
    }),
  }))
  .views((self) => {
    const getItem = (id: string) =>
      self.data.get(id) || Country.create({ id: '-1' });

    // const getItemByName = (name: string) =>
    //   getList().find((country) => country.name === name) ||
    //   Country.create({ id: '-1' })

    const getList = () => [...self.data.values()];

    return { getItem, getList };
    // return { getItem, getItemByName, getList }
  });

import { applySnapshot, flow, types } from 'mobx-state-tree';

import { getHotelsRequest } from './network';

import { Hotel } from '../Hotel';

export const Hotels = types
  .model('Hotels', {
    id: types.identifier,
    data: types.array(Hotel),
  })
  .actions((self) => ({
    retrieveList: flow(function* retrieveHotels(countryId: string) {
      const requestData = yield getHotelsRequest(countryId);
      applySnapshot(self.data, requestData);
    }),
    retrieveItem: (id: string) => {
      const item = Hotel.create({ id });
      self.data.push(item);
      item.retrieveItem();
    },
  }))
  .views((self) => {
    const getItem = (id: string) =>
      self.data.find(({ id: itemId }) => id === itemId);

    const getList = () => [...self.data.values()];

    return { getItem, getList };
  });

import { applySnapshot, flow, types } from 'mobx-state-tree';

import { getToursRequest } from './network';

import type { PriceOffer } from 'api';
import { Tour } from '../Tour';

export const Tours = types
  .model('Tours', {
    id: types.identifier,
    data: types.array(Tour),
  })
  .actions((self) => ({
    addList: (searchData: PriceOffer[] | null) => {
      applySnapshot(self.data, searchData);
    },
    retrieveList: flow(function* retrieveTours(token: string) {
      const requestData = yield getToursRequest(token);
      applySnapshot(self.data, requestData);
    }),
  }))
  .views((self) => {
    const getItem = (id: string) =>
      self.data.find(({ id: itemId }) => id === itemId);

    const getList = () => [...self.data.values()];

    return { getItem, getList };
  });

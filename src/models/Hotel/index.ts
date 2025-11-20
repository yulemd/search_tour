import { applySnapshot, flow, getSnapshot, types } from 'mobx-state-tree';

import { getHotelRequest } from './network';

export const Hotel = types
  .model({
    id: types.identifier,
    name: types.optional(types.string, ''),
    flag: types.optional(types.string, ''),
  })
  .actions((self) => ({
    retrieveItem: flow(function* retrieveItem() {
      const requestData = yield getHotelRequest(Number(self.id));

      const snapshot = getSnapshot(
        Hotel.create({
          ...self,
          ...requestData,
        }),
      );

      if (snapshot.id) {
        applySnapshot(self, snapshot);
      }
    }),
  }));

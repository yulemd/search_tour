import { applySnapshot, flow, getSnapshot, types } from 'mobx-state-tree';

import { getHotelRequest } from './network';

import { GeoSearchOptionType } from '../Root/types';

export const Hotel = types
  .model({
    id: types.identifier,
    name: types.optional(types.string, ''),
    img: types.optional(types.string, ''),
    cityId: types.optional(types.number, -1),
    cityName: types.optional(types.string, ''),
    countryId: types.optional(types.string, ''),
    countryName: types.optional(types.string, ''),
    type: types.optional(GeoSearchOptionType, 'hotel'),
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

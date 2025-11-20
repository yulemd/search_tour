import { flow, types } from 'mobx-state-tree';

import { getHotelsRequest } from './network';

import type { HotelSnapshotIn } from '../GeoEntities/types';
import { Hotel } from '../Hotel';

export const Hotels = types
  .model('Hotels', {
    id: types.identifier,
    data: types.array(Hotel),
  })
  .actions((self) => ({
    retrieveList: flow(function* retrieveHotels(countryId: string) {
      const requestData = yield getHotelsRequest(countryId);
      const existingIds = new Set(self.data.map((item) => item.id));
      const newItems = requestData.filter(
        (item: { id: string }) => !existingIds.has(item.id),
      ) as HotelSnapshotIn[];

      self.data.push(...newItems);
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

import { applySnapshot, flow, getSnapshot, types } from 'mobx-state-tree';

import { getHotelsRequest } from './network';

import { Hotel } from '../Hotel';

export const Hotels = types
  .model('Hotels', {
    id: types.identifier,
    data: types.map(Hotel),
  })
  .actions((self) => ({
    retrieveList: flow(function* retrieveHotels(timeStamp: string) {
      const requestData = yield getHotelsRequest(timeStamp);

      const snapshot = getSnapshot(Hotels.create({ ...self, ...requestData }));

      if (snapshot.id) {
        applySnapshot(self, snapshot);
      }
    }),
    retrieveItem: (id: string) => {
      const item = Hotel.create({ id });
      self.data.put(item);
      item.retrieveItem();
    },
  }))
  .views((self) => {
    const getItem = (id: string) =>
      self.data.get(id) || Hotel.create({ id: '-1' });

    // const getItemByName = (name: string) =>
    //   getList().find((hotel) => hotel.name === name) ||
    //   Hotel.create({ id: '-1' })

    const getList = () => [...self.data.values()];

    return { getItem, getList };
    // return { getItem, getItemByName, getList }
  });

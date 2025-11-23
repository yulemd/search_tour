import { flow, types } from 'mobx-state-tree';

import { getHotelsRequest } from './network';

import type { HotelSnapshotIn } from '../GeoEntities/types';
import { Hotel } from '../Hotel';

export const Hotels = types
  .model('Hotels', {
    id: types.identifier,
    data: types.array(Hotel),
  })
  .actions((self) => {
    function updateItem(hotelData: typeof Hotel.Type) {
      const idx = self.data.findIndex((item) => item.id === hotelData.id);
      if (idx !== -1) {
        self.data[idx].description = hotelData.description ?? '';
        self.data[idx].services = hotelData.services ?? {};
        self.data[idx].name = hotelData.name ?? self.data[idx].name;
        self.data[idx].img = hotelData.img ?? self.data[idx].img;
        self.data[idx].cityId = hotelData.cityId ?? self.data[idx].cityId;
        self.data[idx].cityName = hotelData.cityName ?? self.data[idx].cityName;
        self.data[idx].countryId =
          hotelData.countryId ?? self.data[idx].countryId;
        self.data[idx].countryName =
          hotelData.countryName ?? self.data[idx].countryName;
        self.data[idx].type = hotelData.type ?? self.data[idx].type;
      }
    }
    return {
      retrieveList: flow(function* retrieveHotels(countryId: string) {
        const requestData = yield getHotelsRequest(countryId);
        const existingIds = new Set(self.data.map((item) => item.id));
        const newItems = requestData.filter(
          (item: { id: string }) => !existingIds.has(item.id),
        ) as HotelSnapshotIn[];

        self.data.push(...newItems);
      }),
      updateItem,
      retrieveItem: flow(function* (id: string) {
        let item = self.data.find((h) => h.id === id);
        if (!item) {
          item = Hotel.create({ id });
          self.data.push(item);
        }
        yield item.retrieveItem();
        updateItem(item);
      }),
    };
  })
  .views((self) => {
    const getItem = (id: string) =>
      self.data.find(({ id: itemId }) => id === itemId);

    const getList = () => [...self.data.values()];

    return { getItem, getList };
  });

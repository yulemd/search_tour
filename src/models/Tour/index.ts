import { types } from 'mobx-state-tree';

export const Tour = types.model({
  id: types.identifier,
  amount: types.optional(types.number, -1),
  currency: types.optional(types.string, ''),
  endDate: types.optional(types.string, ''),
  hotelID: types.optional(types.string, ''),
  startDate: types.optional(types.string, ''),
});

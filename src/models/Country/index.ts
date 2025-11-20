import { types } from 'mobx-state-tree';

export const GeoEntityType = types.union(
  types.literal('country'),
  types.literal('city'),
  types.literal('hotel'),
);
export const Country = types.model({
  id: types.identifier,
  name: types.optional(types.string, ''),
  flag: types.optional(types.string, ''),
  type: types.optional(GeoEntityType, 'country'),
});

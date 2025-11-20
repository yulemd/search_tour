import { types } from 'mobx-state-tree';
import { GeoSearchOptionType } from '../Root/types';

export const Country = types.model({
  id: types.identifier,
  name: types.optional(types.string, ''),
  flag: types.optional(types.string, ''),
  type: types.optional(GeoSearchOptionType, 'country'),
});

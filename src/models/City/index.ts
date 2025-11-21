import { types } from 'mobx-state-tree';

import { GeoSearchOptionType } from '../Root/types';

export const City = types.model({
  id: types.identifier,
  name: types.optional(types.string, ''),
  type: types.optional(GeoSearchOptionType, 'city'),
});

import { types } from 'mobx-state-tree';

export const Image = types.model({
  id: types.identifier,
  name: types.optional(types.string, ''),
  url: types.optional(types.string, ''),
});

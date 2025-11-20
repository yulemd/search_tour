import { types } from 'mobx-state-tree'

import { Photo } from '../Photo'

export const Image = types.model({
  id: types.identifier,
  photo: types.maybe(Photo),
  name: types.optional(types.string, ''),
})

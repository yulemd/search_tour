import { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree'

import { Image } from '.'

export type ImageDataType = {
  id: string
  fields: {
    photos: [
      {
        id: string
        type: string
        url: string
      },
    ]
    name: string
  }
}

export interface ImageType extends Instance<typeof Image> {}
export interface ImageSnapshotInType extends SnapshotIn<typeof Image> {}
export interface ImageSnapshotOutType extends SnapshotOut<typeof Image> {}

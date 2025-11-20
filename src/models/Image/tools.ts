import { transformDataToPhoto } from '../Photo/tools'
import { ImageDataType, ImageSnapshotInType } from './types'

type TransformDataToModelType = (
  data: ImageDataType,
  timeStamp: string,
) => ImageSnapshotInType

export const transformDataToImage: TransformDataToModelType = (
  { id, fields: { photos: [photo] = [], ...fields } },
  timeStamp,
) => ({
  id,
  photo: transformDataToPhoto(photo, timeStamp),
  ...fields,
})

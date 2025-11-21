import type { ImageDataType, ImageSnapshotInType } from './types';

type TransformDataToModelType = (data: ImageDataType) => ImageSnapshotInType;

export const transformDataToImage: TransformDataToModelType = ({
  id,
  name,
  url,
}) => ({
  id,
  name,
  url,
});

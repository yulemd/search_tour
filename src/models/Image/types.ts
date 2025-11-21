import type { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

import { Image } from '.';

export type ImageDataType = {
  id: string;
  url: string;
  name: string;
};

export type ImageType = Instance<typeof Image>;
export type ImageSnapshotInType = SnapshotIn<typeof Image>;
export type ImageSnapshotOutType = SnapshotOut<typeof Image>;

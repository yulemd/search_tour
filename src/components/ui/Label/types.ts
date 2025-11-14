import type { PropsWithChildren } from 'react';

export interface LabelPropsType extends PropsWithChildren {
  variant?: LabelVariantType;
}

export type LabelVariantType = 'default' | 'heading' | 'input';

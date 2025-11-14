import type { PropsWithChildren } from 'react';

export interface LayoutPropsType extends PropsWithChildren {
  variant?: LayoutVariantType;
}

export type LayoutVariantType = 'default' | 'heading' | 'input' | 'main';

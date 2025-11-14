import type { PropsWithChildren } from 'react';

export type ButtonVariantType = 'default' | 'primary' | 'secondary';

export interface ButtonPropsType extends PropsWithChildren {
  icon?: string;
  id: string;
  onClick: OnClickType;
  title?: string;
  type?: 'submit' | 'reset' | 'button';
  variant?: ButtonVariantType;
}

export type OnClickType = (id: string) => void;

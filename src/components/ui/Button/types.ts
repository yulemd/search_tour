import type { PropsWithChildren } from 'react';

export type ButtonVariantType = 'default' | 'primary' | 'secondary';

export interface ButtonPropsType extends PropsWithChildren {
  icon?: string;
  id: string;
  onClick: (id: string) => void;
  title?: string;
  type?: 'submit' | 'reset' | 'button';
  variant?: ButtonVariantType;
}

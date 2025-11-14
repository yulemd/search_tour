import type { ChangeEventHandler } from 'react';

import type { SearchScreenProps } from '@/screens/SearchScreen/types';

export type InputVariantType = 'default' | 'dropdown';

export interface InputPropsType extends SearchScreenProps {
  disabled?: boolean;
  variant?: InputVariantType;
  onFocus?: () => Promise<void>;
}

export type OnChangeType = ChangeEventHandler<HTMLInputElement>;

import type { FC } from 'react';

import { DefaultLabel } from './DefaultLabel';
import { HeadingLabel } from './HeadingLabel';
import { InputLabel } from './InputLabel';

import type { LabelPropsType } from './types';
import { ErrorLabel } from './ErrorLabel';

export const Label: FC<LabelPropsType> = ({ children, variant = 'input' }) => {
  const LabelComponent = LabelComponents[variant];

  return <LabelComponent>{children}</LabelComponent>;
};
const LabelComponents = {
  default: DefaultLabel,
  error: ErrorLabel,
  heading: HeadingLabel,
  input: InputLabel,
};

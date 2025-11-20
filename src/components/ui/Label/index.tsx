import type { FC } from 'react';

import { DefaultLabel } from './DefaultLabel';
import { HeadingLabel } from './HeadingLabel';
import { SubheadingLabel } from './SubheadingLabel';
import { InputLabel } from './InputLabel';
import { ErrorLabel } from './ErrorLabel';
import { RegularLabel } from './RegularLabel ';

import type { LabelPropsType } from './types';

export const Label: FC<LabelPropsType> = ({ children, variant = 'input' }) => {
  const LabelComponent = LabelComponents[variant];

  return <LabelComponent>{children}</LabelComponent>;
};
const LabelComponents = {
  default: DefaultLabel,
  error: ErrorLabel,
  heading: HeadingLabel,
  regular: RegularLabel,
  subheading: SubheadingLabel,
  input: InputLabel,
};

import type { FC } from 'react';

import { DefaultInput } from './DefaultInput';
import { DropdownInput } from './DropdownInput';

import type { InputPropsType } from './types';

export const Input: FC<InputPropsType> = ({
  value = '',
  variant = 'default',
  onChangeInput,
  ...props
}) => {
  const InputComponent = InputComponents[variant];

  return (
    <InputComponent onChangeInput={onChangeInput} value={value} {...props} />
  );
};

const InputComponents = {
  default: DefaultInput,
  dropdown: DropdownInput,
};

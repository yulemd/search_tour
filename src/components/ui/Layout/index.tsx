import type { FC } from 'react';

import { DefaultLayout } from './DefaultLayout';
import { HeadingLayout } from './HeadingLayout';
import { InputLayout } from './InputLayout';
import { MainLayout } from './MainLayout';

import type { LayoutPropsType } from './types';

export const Layout: FC<LayoutPropsType> = ({
  children,
  variant = 'default',
  ...props
}) => {
  const LayoutComponent = LayoutComponents[variant];

  return <LayoutComponent {...props}>{children}</LayoutComponent>;
};

const LayoutComponents = {
  input: InputLayout,
  default: DefaultLayout,
  heading: HeadingLayout,
  main: MainLayout,
};

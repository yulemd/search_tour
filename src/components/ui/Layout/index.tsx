import type { FC } from 'react';

import { CardLayout } from './CardLayout';
import { DefaultLayout } from './DefaultLayout';
import { HeadingLayout } from './HeadingLayout';
import { InputLayout } from './InputLayout';
import { MainLayout } from './MainLayout';
import { RowLayout } from './RowLayout';

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
  card: CardLayout,
  default: DefaultLayout,
  heading: HeadingLayout,
  input: InputLayout,
  main: MainLayout,
  row: RowLayout,
};

import type { FC } from 'react';

import styles from './index.module.scss';

import type { LayoutPropsType } from '../types';

export const HeadingLayout: FC<LayoutPropsType> = ({ children }) => (
  <div className={styles.headingLayout}>{children}</div>
);

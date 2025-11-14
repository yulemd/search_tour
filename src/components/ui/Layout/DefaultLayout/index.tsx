import type { FC } from 'react';

import styles from './index.module.scss';

import type { LayoutPropsType } from '../types';

export const DefaultLayout: FC<LayoutPropsType> = ({ children }) => (
  <div className={styles.defaultLayout}>{children}</div>
);

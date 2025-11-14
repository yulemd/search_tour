import type { FC } from 'react';

import styles from './index.module.scss';

import type { LayoutPropsType } from '../types';

export const MainLayout: FC<LayoutPropsType> = ({ children }) => (
  <div className={styles.mainLayout}>{children}</div>
);

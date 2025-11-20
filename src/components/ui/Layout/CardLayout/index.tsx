import type { FC } from 'react';

import styles from './index.module.scss';

import type { LayoutPropsType } from '../types';

export const CardLayout: FC<LayoutPropsType> = ({ children }) => (
  <div className={styles.cardLayout}>{children}</div>
);

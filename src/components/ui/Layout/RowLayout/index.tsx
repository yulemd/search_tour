import type { FC } from 'react';

import styles from './index.module.scss';

import type { LayoutPropsType } from '../types';

export const RowLayout: FC<LayoutPropsType> = ({ children }) => (
  <div className={styles.rowLayout}>{children}</div>
);

import type { FC } from 'react';

import styles from './index.module.scss';

import type { LayoutPropsType } from '../types';

export const InputLayout: FC<LayoutPropsType> = ({ children }) => (
  <div className={styles.inputLayout}>{children}</div>
);

import type { FC } from 'react';

import styles from './index.module.scss';

import type { LabelPropsType } from '../types';

export const InputLabel: FC<LabelPropsType> = ({ children }) => (
  <p className={styles.inputLabel}>{children}</p>
);

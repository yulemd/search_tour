import type { FC } from 'react';

import styles from './index.module.scss';

import type { LabelPropsType } from '../types';

export const DefaultLabel: FC<LabelPropsType> = ({ children }) => (
  <p className={styles.defaultLabel}>{children}</p>
);

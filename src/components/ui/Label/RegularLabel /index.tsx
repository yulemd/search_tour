import type { FC } from 'react';

import styles from './index.module.scss';

import type { LabelPropsType } from '../types';

export const RegularLabel: FC<LabelPropsType> = ({ children }) => (
  <p className={styles.regularLabel}>{children}</p>
);

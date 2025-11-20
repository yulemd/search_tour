import type { FC } from 'react';

import styles from './index.module.scss';

import type { LabelPropsType } from '../types';

export const SubheadingLabel: FC<LabelPropsType> = ({ children }) => (
  <p className={styles.subheadingLabel}>{children}</p>
);

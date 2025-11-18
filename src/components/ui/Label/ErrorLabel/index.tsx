import type { FC } from 'react';

import styles from './index.module.scss';

import type { LabelPropsType } from '../types';

export const ErrorLabel: FC<LabelPropsType> = ({ children }) => (
  <p className={styles.headingLabel}>{children}</p>
);

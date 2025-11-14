import type { FC } from 'react';

import styles from './index.module.scss';

import type { LabelPropsType } from '../types';

export const HeadingLabel: FC<LabelPropsType> = ({ children }) => (
  <p className={styles.headingLabel}>{children}</p>
);

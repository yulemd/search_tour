import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.scss';

export const ToursContainer: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.toursContainer}>{children}</div>
);

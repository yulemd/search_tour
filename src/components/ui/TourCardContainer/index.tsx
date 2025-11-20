import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.scss';

export const TourCardContainer: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.tourCardContainer}>{children}</div>
);

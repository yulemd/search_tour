import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.scss';

export const FormContainer: FC<PropsWithChildren> = ({ children }) => (
  <form action={'/tours'} className={styles.formContainer}>
    {children}
  </form>
);

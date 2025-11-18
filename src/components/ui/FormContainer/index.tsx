import type { FC, PropsWithChildren } from 'react';

import styles from './index.module.scss';

interface FormContainerProps extends PropsWithChildren {
  onSubmit: () => void;
}

export const FormContainer: FC<FormContainerProps> = ({
  children,
  onSubmit,
}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
    className={styles.formContainer}
  >
    {children}
  </form>
);

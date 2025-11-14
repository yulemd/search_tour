import type { FC } from 'react';

import styles from './index.module.scss';

import type { InputPropsType } from '../types';

export const DefaultInput: FC<InputPropsType> = (props) => (
  <input type="text" className={styles.defaultInput} {...props} />
);

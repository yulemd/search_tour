import { SearchForm } from '@/components/feature/SearchForm';
import type { FC } from 'react';
import styles from './template.module.scss';
import type { SearchScreenProps } from './types';

export const SearchScreenTemplate: FC<SearchScreenProps> = (props) => (
  <main className={styles.container}>
    <h1 className={styles.title}>Search Tour</h1>
    <SearchForm {...props} />
  </main>
);

SearchScreenTemplate.displayName = 'SearchScreenTemplate';

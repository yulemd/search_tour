import { SearchForm } from '@/components/feature/SearchForm';
import { TourCard } from '@/components/feature/TourCard';
import { Label } from '@/components/ui/Label';
import { Layout } from '@/components/ui/Layout';
import { ToursContainer } from '@/components/ui/ToursContainer';
import { getSearchPricesStatus } from '@/helpers/getSearchPricesStatus';
import type { FC } from 'react';
import styles from './template.module.scss';
import type { SearchScreenProps } from './types';

export const SearchScreenTemplate: FC<SearchScreenProps> = ({
  searchPricesStatuses,
  toursToRender = [],
  handleTourClick,
  ...props
}) => {
  const status = getSearchPricesStatus(searchPricesStatuses);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Search Tour</h1>

      <SearchForm {...props} />

      <Layout>{status && <Label variant="error">{status}</Label>}</Layout>
      {!!toursToRender.length && (
        <Layout variant="main">
          <ToursContainer>
            {toursToRender.map((hotel) => (
              <TourCard
                key={hotel.hotelId}
                props={hotel}
                handleTourClick={handleTourClick}
              />
            ))}
          </ToursContainer>
        </Layout>
      )}
    </main>
  );
};

SearchScreenTemplate.displayName = 'SearchScreenTemplate';

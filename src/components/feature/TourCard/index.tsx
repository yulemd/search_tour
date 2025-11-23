import type { FC } from 'react';

import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Layout } from '@/components/ui/Layout';
import { TourCardContainer } from '@/components/ui/TourCardContainer';

import styles from './index.module.scss';

import type { TourToRender } from '@/screens/SearchScreen/types';

interface TourCardProps {
  props: TourToRender;
  handleTourClick?: (priceId: string, hotelId: string) => void;
}

export const TourCard: FC<TourCardProps> = ({
  props: {
    city,
    country,
    hotelId,
    hotelImage,
    hotelName,
    flag,
    priceFormatted,
    startDate,
    tourId,
  },
  handleTourClick = () => {},
}) => (
  <TourCardContainer>
    <Layout variant="card">
      <img src={hotelImage} className={styles.image} />
      <Label variant="subheading">{hotelName}</Label>
      <Label variant="regular">
        <img src={flag} className={styles.flag} />
        {`${country}, ${city}`}
      </Label>
      <Layout>
        <Label variant="default">{'Старт туру'}</Label>
        <Label variant="regular">{startDate}</Label>
      </Layout>
      <Label variant="subheading">{priceFormatted}</Label>
    </Layout>
    <Button
      id="search_button"
      onClick={() => handleTourClick(tourId, hotelId)}
      variant="link"
      title={'Відкрити ціну'}
    />
  </TourCardContainer>
);

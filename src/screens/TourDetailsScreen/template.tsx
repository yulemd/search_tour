import type { FC } from 'react';

import { Label } from '@/components/ui/Label';
import { Layout } from '@/components/ui/Layout';

import styles from './template.module.scss';

import type { TourDetailsProps } from './types';

export const TourDetailsTemplate: FC<TourDetailsProps> = ({
  title = 'Tour Details',
  country,
  city,
  hotelImage,
  description,
  services = {},
  startDate,
  endDate,
  priceFormatted,
}) => {
  const servicesMap = {
    wifi: 'Wi-Fi',
    parking: 'Парковка',
    pool: 'Басейн',
    aquapark: 'Аквапарк',
    tennis_court: 'Тенісний корт',
    laundry: 'Пральня',
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <Layout variant="card">
        <img
          src={hotelImage}
          alt={title}
          style={{ width: '100%', maxWidth: 600 }}
        />
        <Label variant="subheading">{title}</Label>
        <Label variant="regular">
          🌍 {country}, 🏙️ {city}
        </Label>
        {description && <Label variant="default">{description}</Label>}
        {!!Object.keys(services).length && (
          <Layout>
            <Label variant="default">Сервіси:</Label>
            <Layout variant="row">
              {Object.entries(services)
                .filter(([, value]) => value === 'yes')
                .map(([key]) => (
                  <Label key={key} variant="regular">
                    {servicesMap[key as keyof typeof servicesMap]}
                  </Label>
                ))}
            </Layout>
          </Layout>
        )}
        <Layout>
          <Label variant="default">Початок туру:</Label>
          <Label variant="regular">{startDate}</Label>
          <Label variant="default">Кінець туру:</Label>
          <Label variant="regular">{endDate}</Label>
        </Layout>
        <Label variant="subheading">{priceFormatted}</Label>
      </Layout>
    </main>
  );
};

TourDetailsTemplate.displayName = 'TourDetailsScreenTemplate';

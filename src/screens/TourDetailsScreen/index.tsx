import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TourDetailsTemplate } from './template';
import { formatCurrency } from '@/helpers/formatCurrency';
import { formatDate } from '@/helpers/formatDate';
import { useStore } from '@/models';

import type { HotelType } from '@/models/Hotel/types';
import type { TourType } from '@/models/Tour/types';

export const TourDetailsScreen = observer(() => {
  const { tourId, hotelId } = useParams();
  const root = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tour, setTour] = useState<TourType | null>(null);
  const [hotel, setHotel] = useState<HotelType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Tour (Price)
        let tourModel = root.tours.getItem(tourId ?? '');
        if (!tourModel && tourId) {
          await root.tours.retrieveList(tourId);
          tourModel = root.tours.getItem(tourId);
        }
        setTour(tourModel ?? null);
        // Hotel
        let hotelModel = root.hotels.getItem(hotelId ?? '');

        if (hotelId) {
          root.hotels.retrieveItem(hotelId);
          hotelModel = root.hotels.getItem(hotelId);
        }
        setHotel(hotelModel ?? null);
      } catch {
        setError('Не вдалося завантажити дані');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tourId, hotelId, root]);

  if (loading) return <div>Завантаження...</div>;
  if (error || !tour || !hotel) return <div>{error || 'Дані не знайдено'}</div>;

  const hotelData = hotel.getItem();

  return (
    <TourDetailsTemplate
      title={hotelData.name}
      country={hotelData.countryName}
      city={hotelData.cityName}
      hotelImage={hotelData.img}
      description={hotelData.description}
      services={hotelData.services}
      startDate={formatDate(tour.startDate)}
      endDate={formatDate(tour.endDate)}
      priceFormatted={formatCurrency(tour.amount, tour.currency)}
    />
  );
});

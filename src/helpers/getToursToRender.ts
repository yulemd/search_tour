import { formatCurrency, formatDate } from '@/helpers';
import type { CountriesType } from '@/models/Countries/types';
import type { HotelSnapshotInType } from '@/models/Hotel/types';
import type { TourSnapshotInType } from '@/models/Tour/types';

export const getToursToRender = (
  toursList: TourSnapshotInType[],
  hotelsList: HotelSnapshotInType[],
  countries: CountriesType,
) => {
  if (toursList.length === 0 || hotelsList.length === 0) {
    return [];
  }

  const hotelsMap = new Map(hotelsList.map((hotel) => [hotel.id, hotel]));

  return toursList
    .map((tour) => {
      const hotel = hotelsMap.get(tour.hotelID || '-1');

      if (!hotel) {
        return null;
      }

      const flag = countries.getItem(hotel.countryId || '-1')?.flag || '';

      return {
        hotelName: hotel.name || '',
        country: hotel.countryName || '',
        flag,
        city: hotel.cityName || '',

        startDate: formatDate(tour.startDate || ''),
        endDate: formatDate(tour.endDate || ''),
        priceFormatted: formatCurrency(tour.amount || 0, tour.currency || ''),

        hotelImage: hotel.img || '',
        openPriceLink: `/tours/${tour.id}`,

        tourId: tour.id,
        hotelId: hotel.id,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
};

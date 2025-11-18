import type { SearchScreenProps } from '@/screens/SearchScreen/types';

export const getSearchPricesStatus = (
  errors?: SearchScreenProps['searchPricesStatuses'],
) => {
  if (!errors) return '';

  const { loading, error, emptyState } = errors;

  if (loading) return 'Завантаження...';
  if (error) return 'Помилка: вичерпано ліміт спроб отримання даних';
  if (emptyState) return 'За вашим запитом турів не знайдено';

  return '';
};

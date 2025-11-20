import type { SearchResultsState } from '@/hooks/useSearchPrices';
import type { SearchPricesStatusType } from '@/screens/SearchScreen/types';
import type { GeoEntity } from 'api';

interface GetStatusesParams {
  value: string;
  searchPricesError: string | null;
  searchPricesLoading: boolean;
  selectedCountryId: string;
  searchData: SearchResultsState | null;
  countriesList: GeoEntity[];
  enabled: boolean;
}

export const getSearchPricesStatuses = ({
  value,
  searchPricesError,
  searchPricesLoading,
  selectedCountryId,
  searchData,
  countriesList,
  enabled,
}: GetStatusesParams): SearchPricesStatusType => {
  if (!value) {
    return {
      loading: false,
      error: false,
      emptyState: false,
    };
  }

  const hasError = !!searchPricesError;
  const isFinished = Boolean(searchData?.isFinished);
  const hasResults = Boolean(
    searchData?.results && searchData.results.length > 0,
  );

  const sameValue =
    countriesList.find(({ id }) => id === selectedCountryId)?.name === value;

  const loading =
    (searchPricesLoading || (!!selectedCountryId && enabled)) &&
    !hasError &&
    !isFinished;

  const emptyState = enabled && sameValue && isFinished && !hasResults;

  return {
    loading,
    error: hasError,
    emptyState,
  };
};

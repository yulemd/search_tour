import { SearchScreenTemplate } from './template';
import { useSearchScreen } from './useSearchScreen';

export const SearchScreen = () => {
  const props = useSearchScreen();

  return <SearchScreenTemplate {...props} />;
};

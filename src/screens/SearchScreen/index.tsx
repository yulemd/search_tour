import { SearchScreenTemplate } from './template';

import { observer } from 'mobx-react-lite';

import { useSearchScreen } from './useSearchScreen';

export const SearchScreen = observer(() => {
  const props = useSearchScreen();

  return <SearchScreenTemplate {...props} />;
});

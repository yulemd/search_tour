import { SearchScreenTemplate } from './template';

import { observer } from 'mobx-react-lite';

import { useNavigate } from 'react-router-dom';
import { useSearchScreen } from './useSearchScreen';

export const SearchScreen = observer(() => {
  const navigate = useNavigate();
  const searchProps = useSearchScreen();

  const handleTourClick = (tourId: string, hotelId: string) => {
    const path = `/tour/${tourId}/${hotelId}`;

    navigate(path);
  };

  const props = { handleTourClick, ...searchProps };

  return <SearchScreenTemplate {...props} />;
});

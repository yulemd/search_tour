import { observer } from 'mobx-react-lite';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { SearchScreen } from './screens';

import { rootStore, RootStoreContext } from './models';
import { TourDetailsScreen } from './screens/TourDetailsScreen';

const App = observer(() => (
  <RootStoreContext.Provider value={rootStore}>
    <Router>
      <Routes>
        <Route path="/search_tour" element={<SearchScreen />} />
        <Route path="/tour/:tourId/:hotelId" element={<TourDetailsScreen />} />
      </Routes>
    </Router>
  </RootStoreContext.Provider>
));

export default App;

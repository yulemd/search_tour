import { SearchScreen } from './screens';

import { observer } from 'mobx-react-lite';

import { rootStore, RootStoreContext } from './models';

const App = observer(() => (
  <RootStoreContext.Provider value={rootStore}>
    <SearchScreen />
  </RootStoreContext.Provider>
));

export default App;

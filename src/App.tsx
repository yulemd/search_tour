import { SearchScreen } from './screens';

import { observer } from 'mobx-react-lite';

import { rootStore, RootStoreContext, useStore } from './models';

const App = observer(() => {
  const root = useStore();
  const { storeLoaded } = root;
  console.info(storeLoaded);
  return (
    <RootStoreContext.Provider value={rootStore}>
      <SearchScreen />
    </RootStoreContext.Provider>
  );
});

export default App;

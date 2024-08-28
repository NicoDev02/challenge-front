import React from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import HomeStack from './src/navigation/stacks/HomeStack';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HomeStack />
      </PersistGate>
    </Provider>
  );
}

export default App;

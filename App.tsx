import React from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigator from './src/tabs';

function App(): React.JSX.Element {
  // const nativeLogin = async (email: string, password: string) => {
  //   try {
  //     const user = await auth0.auth.createUser({
  //       connection: 'Username-Password-Authentication',
  //       email,
  //       password,
  //     });

  //     if (!user) {
  //       throw new Error('User not found');
  //     }

  //     const credentials = await auth0.auth.passwordRealm({
  //       username: email,
  //       password,
  //       realm: 'Username-Password-Authentication',
  //       audience: `https://${auth0Config.domain}/userinfo`,
  //     });
  //     setAccessToken(credentials.accessToken);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;

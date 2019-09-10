import React from 'react';
import { Provider } from 'react-redux';
import { Asset } from 'expo-asset';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
import Store, { persistor } from './lib/Redux';
import Navigator from './src/screens';
import { setLoading } from './lib/Redux/actions';

import {
  Icon,
} from './assets';

StatusBar.setBarStyle('dark-content', true);

class App extends React.PureComponent {
  componentDidMount() {
    this.cacheResources(); // Start Caching Resources
  }

  async cacheResources() {
    const loadImages = Asset.loadAsync([ // Assets
      Icon,
    ]);

    await Promise.all([loadImages]);
    Store.dispatch(setLoading(false)); // Mark loading as completed
  }

  render() {
    return (
      <Provider store={Store as any}>
        <PersistGate persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

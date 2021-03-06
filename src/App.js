import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import WebFont from 'webfontloader';

import AppRoutes from './navigation';

import store, { persistor } from './store';

WebFont.load({
  google: {
    families: [
      'Source+Sans+Pro:300,400,600,700',
      'Montserrat:300,400,500,600,700'
    ]
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppRoutes />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

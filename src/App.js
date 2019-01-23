import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import WebFont from 'webfontloader';

import AppRoutes from './navigation';

import store, { persistor } from './store';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

WebFont.load({
  google: {
    families: [
      'Source+Sans+Pro:400,600,700,900',
      'Montserrat:400,500,600,700',
      'Open+Sans:300i,400',
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

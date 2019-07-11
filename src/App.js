import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import WebFont from 'webfontloader';
import ReduxToastr from 'react-redux-toastr';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTimes, faUserCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import AppRoutes from './routes';
import store, { persistor } from './store';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

library.add(faPlus, faTimes, faUserCircle, faMapMarkerAlt);

WebFont.load({
  google: {
    families: [
      'Source+Sans+Pro:400,500,600,700,900',
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
          <div>
            <AppRoutes />
            <ReduxToastr
              timeOut={3000}
            />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

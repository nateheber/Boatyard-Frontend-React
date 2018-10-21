import React, { Component } from 'react';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';

import Route from './navigation/routes';

import store from './store';

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
        <Route />
      </Provider>
    );
  }
}

export default App;

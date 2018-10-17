import React, { Component } from 'react';
import WebFont from 'webfontloader';

import PageTemplate from './components/template/PageTemplate';
import Dashboard from './components/template/Dashboard';

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
      <PageTemplate>
        <Dashboard />
      </PageTemplate>
    );
  }
}

export default App;

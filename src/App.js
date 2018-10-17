import React, { Component } from 'react';
import WebFont from 'webfontloader';

import Header from './components/compound/Header';
import logo from './logo.svg';
import './App.css';

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
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;

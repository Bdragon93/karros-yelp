import React from 'react';
import Home from './home'
require('../assets/styles/vendor/font-awesome/scss/font-awesome.scss');
require('../assets/styles/base/_base.scss');

class App extends React.Component {
  render() {
    return (
      <div>
        <Home/>
      </div>
    );
  }
}

export default App;

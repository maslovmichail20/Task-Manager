import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './app/App';


const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
);

export default Root;
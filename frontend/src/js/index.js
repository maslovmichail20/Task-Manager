import React from 'react'
import { render } from 'react-dom';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';


import Root from './components/Root';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  devToolsEnhancer()
);

render(
  <Root store={store}/>,
  document.getElementById('root')
);
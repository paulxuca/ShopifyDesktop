import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Immutable from 'immutable';

import routes from './routes';
import configureStore from './store';
import './app.global.css';


const store = configureStore(Immutable.Map());
const history = syncHistoryWithStore(hashHistory, store, {
    selectLocationState (state) {
        return state.get('routing').toJS();
    } 
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);

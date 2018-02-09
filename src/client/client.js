/* #### Start up point for client side application #### */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import reducers from './reducers';

/*
 * APP 
 * ROUTES
 */

import Routes from './Routes';

/*
  CUSTOM AXIOS CONFIG
*/
const axoisInstance = axios.create({
  baseURL: '/api'
});

/*
 * APP (BROWSER) 
 * STORE CREATION
 */

const store = createStore(
  reducers,
  window.initial_state,
  applyMiddleware(thunk.withExtraArgument(axoisInstance)) // need for proxy config
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        {renderRoutes(
          Routes
        ) /* <Routes /> - This would be in a normal React Application */}
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);

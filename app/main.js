import React from 'react';
import Router from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import routes from './routes';
import { createRedux } from 'redux';
import * as stores from "stores"
import { Provider } from 'redux/react';
import Root from "root"
import Axios from "axios"

Axios.interceptors.request.use(function(config) {
	config.url = "http://api.ironbay.digital/" + config.url;
	return config
})

const history = new BrowserHistory();
const redux = createRedux(stores)
const element = (
  <Provider redux={redux}>
    {() => <Router history={history} routes={routes} /> }
  </Provider>
);
React.render(element, document.body);

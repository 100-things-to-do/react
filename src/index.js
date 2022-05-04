import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter } from "react-router-dom";
import MainRouter from './Router'
import ErrorBoundary from "./others/ErrorBoundary"

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);



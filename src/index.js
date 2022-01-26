import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter } from "react-router-dom";
import Auctions from './components/Auctions'
import MainApp from './components/MainApp'
import ErrorBoundary from "./components/ErrorBoundary"

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);



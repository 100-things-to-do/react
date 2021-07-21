import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {Provider} from 'react-redux'
import store from './redux/store'
import Demo from './components/Demo'
import { BrowserRouter } from "react-router-dom";
import MainApp from './components/MainApp'


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);



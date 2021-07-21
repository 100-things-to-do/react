import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {Provider} from 'react-redux'
import store from './redux/store'
import Demo from './components/Demo'


ReactDOM.render(
  <Provider store={store}>
    <Demo />
  </Provider>,
  document.getElementById('root')
);



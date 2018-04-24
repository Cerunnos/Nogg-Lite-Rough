import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router} from 'react-router-dom'

import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './Redux/rootReducer'
import {Provider} from 'react-redux'

const store=createStore(rootReducer, applyMiddleware(thunk))
export default store

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();

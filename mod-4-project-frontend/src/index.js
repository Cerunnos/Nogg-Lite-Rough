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

import {addLog} from './Redux/actions'
const store=createStore(rootReducer, applyMiddleware(thunk))
// const store=createStore(rootReducer)
// console.log(store)
// store.dispatch(addLog("Persist?"))
// store.dispatch(addLog("Additionally..."))
// store.dispatch(addLog("Cumulative"))
// console.log(store.getState())
export default store

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();

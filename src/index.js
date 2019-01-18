import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import authenticateReducer, { loginFlow as loginSaga } from 'services/authenticate/reducer';

const rootReducer = combineReducers({
  authenticate: authenticateReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(sagaMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f)
);

window.store = store;

sagaMiddleware.run(loginSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

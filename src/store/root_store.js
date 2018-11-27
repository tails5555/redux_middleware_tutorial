import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import loggerMiddleware from '../library/loggerMiddleware';
import customSaga from '../saga';
import rootReducer from '../reducer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(loggerMiddleware, ReduxThunk, sagaMiddleware));

sagaMiddleware.run(customSaga);

export default store;
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import loggerMiddleware from '../library/loggerMiddleware';
import rootReducer from '../reducer';

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware, ReduxThunk));

export default store;
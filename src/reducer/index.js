import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import typeReducer from './reducer_type';
import postReducer from './reducer_post';
import memoReducer from './reducer_memo';

export default combineReducers({
    form : formReducer,
    type : typeReducer,
    post : postReducer,
    memo : memoReducer
});
import { combineReducers } from 'redux';
import typeReducer from './reducer_type';
import postReducer from './reducer_post';

export default combineReducers({
    type : typeReducer,
    post : postReducer
});
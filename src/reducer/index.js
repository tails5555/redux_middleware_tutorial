import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import typeReducer from './reducer_type';
import postReducer from './reducer_post';

export default combineReducers({
    form : formReducer,
    type : typeReducer,
    post : postReducer
});
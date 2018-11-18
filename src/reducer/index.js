import { combineReducers } from 'redux';
import typeReducer from '../reducer/reducer_type';

export default combineReducers({
    type : typeReducer
})
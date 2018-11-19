import {
    FETCH_ALL_BBS_TYPES, FETCH_ALL_BBS_TYPES_SUCCESS, FETCH_ALL_BBS_TYPES_FAILURE
} from '../action/action_type';

const INITIAL_STATE = {
    typeList : { loading : false, types : [], error : null }
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case FETCH_ALL_BBS_TYPES :
            return { ...state, typeList : { ...state.typeList, loading : true }};
        case FETCH_ALL_BBS_TYPES_SUCCESS :
            return { ...state, typeList : { loading : false, error : null, types : action.payload }};
        case FETCH_ALL_BBS_TYPES_FAILURE :
            return { ...state, typeList : { ...state.typeList, loading : false, error : action.payload }};

        default :
            return state;
    }
}
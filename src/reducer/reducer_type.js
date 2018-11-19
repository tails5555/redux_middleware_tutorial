import {
    FETCH_ALL_BBS_TYPES, FETCH_ALL_BBS_TYPES_SUCCESS, FETCH_ALL_BBS_TYPES_FAILURE,
    FETCH_BBS_TYPE_ELEMENT_BY_ID, FETCH_BBS_TYPE_ELEMENT_BY_ID_SUCCESS, FETCH_BBS_TYPE_ELEMENT_BY_ID_FAILURE
} from '../action/action_type';

const INITIAL_STATE = {
    typeList : { loading : false, types : [], error : null },
    typeElement : { loading : false, type : null, error : null }
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case FETCH_ALL_BBS_TYPES :
            return { ...state, typeList : { loading : true, error : null, types : [] }};
        case FETCH_ALL_BBS_TYPES_SUCCESS :
            return { ...state, typeList : { loading : false, error : null, types : action.payload }};
        case FETCH_ALL_BBS_TYPES_FAILURE :
            return { ...state, typeList : { ...state.typeList, loading : false, error : action.payload }};

        case FETCH_BBS_TYPE_ELEMENT_BY_ID :
            return { ...state, typeElement : { loading : true, error : null, type : null }};
        case FETCH_BBS_TYPE_ELEMENT_BY_ID_SUCCESS :
            return { ...state, typeElement : { loading : false, error : null, type : action.payload }};
        case FETCH_BBS_TYPE_ELEMENT_BY_ID_FAILURE :
            return { ...state, typeElement : { ...state.typeElement, loading : false, error : action.payload }};
        
        default :
            return state;
    }
}
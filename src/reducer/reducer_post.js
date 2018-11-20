import {
    FETCH_POST_LIST_BY_QUERY, FETCH_POST_LIST_BY_QUERY_SUCCESS, FETCH_POST_LIST_BY_QUERY_FAILURE,
    FETCH_POST_ELEMENT_BY_ID, FETCH_POST_ELEMENT_BY_ID_SUCCESS, FETCH_POST_ELEMENT_BY_ID_FAILURE,
    CREATE_POST_CONTEXT, CREATE_POST_CONTEXT_SUCCESS, CREATE_POST_CONTEXT_FAILURE, RESET_CREATE_POST_CONTEXT
} from '../action/action_post';

const INITIAL_STATE = {
    postList : { loading : false, posts : [], error : null, count : 0 },
    postElement : { loading : false, post : null, error : null },
    postSave : { loading : false, post : null, error : null }
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case FETCH_POST_LIST_BY_QUERY :
            return { ...state, postList : { loading : true, error : null, posts : [], count : 0 }};
        case FETCH_POST_LIST_BY_QUERY_SUCCESS :
            const { results, count } = action.payload;
            return { ...state, postList : { loading : false, error : null, posts : results, count }};
        case FETCH_POST_LIST_BY_QUERY_FAILURE :
            return { ...state, postList : { ...state.postList, loading : false, error : action.payload }};
        
        case FETCH_POST_ELEMENT_BY_ID : 
            return { ...state, postElement : { loading : true, post : null, error : null }};
        case FETCH_POST_ELEMENT_BY_ID_SUCCESS : 
            return { ...state, postElement : { loading : false, error : null, post : action.payload }};
        case FETCH_POST_ELEMENT_BY_ID_FAILURE :
            return { ...state, postElement : { ...state.postElement, loading : false, error : action.payload }};
            
        case CREATE_POST_CONTEXT :
            return { ...state, postSave : { loading : true, error : null, post : null }};
        case CREATE_POST_CONTEXT_SUCCESS :
            return { ...state, postSave : { loading : false, post : action.payload, error : null }};
        case CREATE_POST_CONTEXT_FAILURE :
            return { ...state, postSave : { ...state.postSave, loading : false, error : action.payload }};
        case RESET_CREATE_POST_CONTEXT :
            return { ...state, postSave : { loading : false, error : null, post : null }};

        default :
            return state;
    }
}
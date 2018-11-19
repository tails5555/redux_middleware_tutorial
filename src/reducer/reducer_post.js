import {
    FETCH_POST_LIST_BY_QUERY, FETCH_POST_LIST_BY_QUERY_SUCCESS, FETCH_POST_LIST_BY_QUERY_FAILURE
} from '../action/action_post';

const INITIAL_STATE = {
    postList : { loading : false, posts : [], error : null, count : 0 }
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

        default :
            return state;
    }
}
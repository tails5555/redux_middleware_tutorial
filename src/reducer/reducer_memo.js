import {
    FETCH_MEMO_LIST, FETCH_MEMO_LIST_SUCCESS, FETCH_MEMO_LIST_FAILURE
} from '../action/action_memo';

const INITIAL_STATE = {
    memoList : { loading : false, memos : [], error : null, count : 0 },
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case FETCH_MEMO_LIST :
            return { ...state, memoList : { loading : true, error : null, memos : [], count : 0 }};
        case FETCH_MEMO_LIST_SUCCESS :
            const { results, count } = action.payload;
            return { ...state, memoList : { loading : false, error : null, memos : results, count }};
        case FETCH_MEMO_LIST_FAILURE :
            return { ...state, memoList : { ...state.memoList, loading : false, error : action.payload }};

        default :
            return state;
    }
}
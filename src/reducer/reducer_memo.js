import {
    FETCH_MEMO_LIST, FETCH_MEMO_LIST_SUCCESS, FETCH_MEMO_LIST_FAILURE,
    FETCH_MEMO_ELEMENT_BY_ID, FETCH_MEMO_ELEMENT_BY_ID_SUCCESS, FETCH_MEMO_ELEMENT_BY_ID_FAILURE, RESET_FETCH_MEMO_ELEMENT_BY_ID,
    CREATE_MEMO_CONTEXT, CREATE_MEMO_CONTEXT_SUCCESS, CREATE_MEMO_CONTEXT_FAILURE
} from '../action/action_memo';

const INITIAL_STATE = {
    memoList : { loading : false, memos : [], error : null, count : 0 },
    memoElement : { loading : false, memo : null, error : null },
    memoSave : { loading : false, memo : null, error : null },
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

        case FETCH_MEMO_ELEMENT_BY_ID :
            return { ...state, memoElement : { loading : true, error : null, memo : null }};
        case FETCH_MEMO_ELEMENT_BY_ID_SUCCESS :
            return { ...state, memoElement : { loading : false, error : null, memo : action.payload }};
        case FETCH_MEMO_ELEMENT_BY_ID_FAILURE :
            return { ...state, memoElement : { ...state.memoElement, loading : false, error : action.payload }};
        case RESET_FETCH_MEMO_ELEMENT_BY_ID :
            return { ...state, memoElement : { loading : false, error : null, memo : null }};
        
        case CREATE_MEMO_CONTEXT : 
            return { ...state, memoSave : { loading : true, error : null, memo : null }};
        case CREATE_MEMO_CONTEXT_SUCCESS :
            return { ...state, memoSave : { loading : false, error : null, memo : action.payload }};
        case CREATE_MEMO_CONTEXT_FAILURE :
            return { ...state, memoSave : { ...state.memoSave, loading : false, error : action.payload }};

        default :
            return state;
    }
}
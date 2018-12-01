// Memo 데이터베이스의 CRUD는 Redux-Saga 를 이용하겠습니다.

export const FETCH_MEMO_LIST = 'FETCH_MEMO_LIST';
export const FETCH_MEMO_LIST_SUCCESS = 'FETCH_MEMO_LIST_SUCCESS';
export const FETCH_MEMO_LIST_FAILURE = 'FETCH_MEMO_LIST_FAILURE';

export const fetch_memo_list = (queryModel) => ({
    type : FETCH_MEMO_LIST,
    queryModel
});

export const fetch_memo_list_success = (response) => ({
    type : FETCH_MEMO_LIST_SUCCESS,
    payload : response.data
});

export const fetch_memo_list_failure = (error) => ({
    type : FETCH_MEMO_LIST_FAILURE,
    payload : error
});

/* 
 * 참고로 단일 메모장을 조회한 이후의 Data Flow 의 Reset 을 진행하는 등의 단일 함수는 굳이 Redux-Saga 를 사용하지 않는 것이 좋다.
 * Redux-Saga 에서는 Promise, 비동기 프로그래밍, Saga 등 Callback Function 이 있으면 Call Helper Function 을 사용하여 불러온다.
 * 그 다음에 콜백 함수의 결과에 따라서 Action 을 Put, Take 등의 Helper Function 을 사용하여 정리한다. 
 */
export const FETCH_MEMO_ELEMENT_BY_ID = 'FETCH_MEMO_ELEMENT_BY_ID';
export const FETCH_MEMO_ELEMENT_BY_ID_SUCCESS = 'FETCH_MEMO_ELEMENT_BY_ID_SUCCESS';
export const FETCH_MEMO_ELEMENT_BY_ID_FAILURE = 'FETCH_MEMO_ELEMENT_BY_ID_FAILURE';
export const RESET_FETCH_MEMO_ELEMENT_BY_ID = 'RESET_FETCH_MEMO_ELEMENT_BY_ID';

export const fetch_memo_element_by_id = (id) => ({
    type : FETCH_MEMO_ELEMENT_BY_ID,
    id
});

export const fetch_memo_element_by_id_success = (response) => ({
    type : FETCH_MEMO_ELEMENT_BY_ID_SUCCESS,
    payload : response.data
});

export const fetch_memo_element_by_id_failure = (error) => ({
    type : FETCH_MEMO_ELEMENT_BY_ID_FAILURE,
    payload : error
});

export const reset_fetch_memo_element_by_id = () => ({
    type : RESET_FETCH_MEMO_ELEMENT_BY_ID
});

export const CREATE_MEMO_CONTEXT = 'CREATE_MEMO_CONTEXT';
export const CREATE_MEMO_CONTEXT_SUCCESS = 'CREATE_MEMO_CONTEXT_SUCCESS';
export const CREATE_MEMO_CONTEXT_FAILURE = 'CREATE_MEMO_CONTEXT_FAILURE';

export const create_memo_context = (memoModel) => ({
    type : CREATE_MEMO_CONTEXT,
    memoModel
});

export const create_memo_context_success = (response) => ({
    type : CREATE_MEMO_CONTEXT_SUCCESS,
    payload : response.data
});

export const create_memo_context_failure = (error) => ({
    type : CREATE_MEMO_CONTEXT_FAILURE,
    payload : error
});

export const UPDATE_MEMO_CONTEXT = 'UPDATE_MEMO_CONTEXT';
export const UPDATE_MEMO_CONTEXT_SUCCESS = 'UPDATE_MEMO_CONTEXT_SUCCESS';
export const UPDATE_MEMO_CONTEXT_FAILURE = 'UPDATE_MEMO_CONTEXT_FAILURE';

export const update_memo_context = (memoId, memoModel) => ({
    type : UPDATE_MEMO_CONTEXT,
    memoId,
    memoModel
});

export const update_memo_context_success = (response) => ({
    type : UPDATE_MEMO_CONTEXT_SUCCESS,
    payload : response.data
});

export const update_memo_context_failure = (error) => ({
    type : UPDATE_MEMO_CONTEXT_FAILURE,
    payload : error
});